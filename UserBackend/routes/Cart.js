import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../modals/User.js';
import Cart from '../modals/Cart.js';
import dotenv from 'dotenv';
import Order from '../modals/Order.js';
dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallbacksecret';

// Middleware to authenticate user
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};

// Get Cart Items
router.get('/cart', authenticateToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(200).json({ success: true, cartItems: [] });
    }
    res.status(200).json({ success: true, cartItems: cart.items });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Add Item to Cart
router.post('/cart', authenticateToken, async (req, res) => {
  const { itemId, name, price, image } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user.id });

    // If no cart, create a new one
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    // Check if item already exists in the cart
    const existingItem = cart.items.find((item) => item.itemId === itemId);
    if (existingItem) {
      existingItem.quantity += 1; // Increase quantity if item exists
    } else {
      cart.items.push({ itemId, name, price, image, quantity: 1 }); // Add new item
    }

    await cart.save(); // Save the cart with updated items
    res.status(200).json({ success: true, message: 'Item added to cart.', cartItems: cart.items });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Update Item Quantity in Cart
router.put('/cart/:itemId', authenticateToken, async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found.' });
    }

    const item = cart.items.find((item) => item.itemId === itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found in cart.' });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter((item) => item.itemId !== itemId);
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    res.status(200).json({ success: true, message: 'Cart updated.', cartItems: cart.items });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Remove Item from Cart
router.delete('/cart/:itemId', authenticateToken, async (req, res) => {
  const { itemId } = req.params;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found.' });
    }

    // Remove the item from the cart
    cart.items = cart.items.filter((item) => item.itemId !== itemId);

    await cart.save(); // Save the updated cart
    res.status(200).json({ success: true, message: 'Item removed from cart.', cartItems: cart.items });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Process Delivery Information and Payment (Checkout)
router.post('/checkout', authenticateToken, async (req, res) => {
  const { deliveryInfo, cartItems, deliveryFee = 50 } = req.body;

  // Validate delivery information
  if (
    !deliveryInfo ||
    !deliveryInfo.Name ||
    !deliveryInfo.street ||
    !deliveryInfo.city ||
    !deliveryInfo.state ||
    !deliveryInfo.pinCode ||
    !deliveryInfo.country ||
    !deliveryInfo.email ||
    !deliveryInfo.phone
  ) {
    return res.status(400).json({
      success: false,
      message: 'All delivery information fields are required.',
    });
  }

  // Validate email and phone formats
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  if (!emailRegex.test(deliveryInfo.email) || !phoneRegex.test(deliveryInfo.phone)) {
    return res.status(400).json({ success: false, message: 'Invalid email or phone format.' });
  }

  try {
    // Calculate subtotal and total
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + deliveryFee;

    // Create order
    const order = new Order({
      userId: req.user.id,
      deliveryInfo,
      cartItems,
      subtotal,
      deliveryFee,
      total,
    });

    await order.save();

    // Clear the cart after successful order (optional)
    await Cart.updateOne({ userId: req.user.id }, { $set: { items: [] } });

    res.status(200).json({ success: true, message: 'Order placed successfully!', order });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

export default router;

import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Get all orders (No authentication required)
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();  // Fetch all orders from the database
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update order status
router.put('/update-status/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  // Trim any extra whitespace or newline characters
  const trimmedOrderId = orderId.trim();

  // Validate the status input
  if (!['Food Processing', 'Out for Delivery', 'Delivered'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status value' });
  }

  try {
    const order = await Order.findById(trimmedOrderId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Update the order status
    order.status = status;
    await order.save();

    res.status(200).json({ success: true, message: 'Order status updated successfully', order });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


export default router;

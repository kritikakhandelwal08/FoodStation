import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('token');

  // Fetch Cart Items
  useEffect(() => {
    if (token) {
      fetchCartItems();
    }
  }, [token]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/cart/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data.cartItems || []);
    } catch (error) {
      console.error('Error fetching cart:', error.response?.data || error.message);
    }
  };

  // Add Item to Cart
  const addToCart = async (item) => {
    const payload = {
      itemId: item._id || item.itemId,
      name: item.name,
      price: item.price,
      image: item.image,
    };
    console.log("Payload being sent to /cart:", payload)
    try {
      const response = await axios.post('http://localhost:8000/api/cart/cart', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data.cartItems || []); // Update cart
    } catch (error) {
      console.error('Error adding to cart:', error.response?.data || error.message);
    }
  };

  // Increase Item Quantity
  const increaseQuantity = async (itemId) => {
    const item = cartItems.find((cartItem) => cartItem.itemId === itemId);
    if (item) {
      await updateQuantity(itemId, item.quantity + 1);
    }
  };

  // Decrease Item Quantity
  const decreaseQuantity = async (itemId) => {
    const item = cartItems.find((cartItem) => cartItem.itemId === itemId);
    if (item && item.quantity > 1) {
      await updateQuantity(itemId, item.quantity - 1);
    } else if (item && item.quantity === 1) {
      await removeItem(itemId);
    }
  };

  // Update Item Quantity
  const updateQuantity = async (itemId, quantity) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/cart/cart/${itemId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartItems(response.data.cartItems || []);
    } catch (error) {
      console.error('Error updating quantity:', error.response?.data || error.message);
    }
  };
  const clearCart = () => {
    setCartItems([]);
  };
  // Remove Item from Cart
  const removeItem = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/cart/cart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data.cartItems || []);
    } catch (error) {
      console.error('Error removing item:', error.response?.data || error.message);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

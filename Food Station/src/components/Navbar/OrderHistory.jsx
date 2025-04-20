import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setError('User not logged in.');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:8000/api/auth/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(response.data.orders || []);
        console.log(orders)
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('No orders found or authentication failed.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-history">
      <h2>Order History</h2>

      {loading && <p>Loading your orders...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && orders.length === 0 && <p>You haven't placed any orders yet.</p>}

      {!loading && !error && orders.length > 0 && (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order._id}>
              <div><strong>Order ID:</strong> {order._id}</div>
              <div><strong>Name:</strong> {order.cartItems[0]?.name}</div>
              <div><strong>Total:</strong> Rs.{order.total.toFixed(2)}</div>
              <div><strong>Status:</strong> {order.status}</div>
              <div><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;

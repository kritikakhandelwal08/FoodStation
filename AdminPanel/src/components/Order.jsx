import React, { useState, useEffect } from 'react';
import './Order.css';
import orderImage from '../assets/orderimage.png'; // default image
import axios from 'axios';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/orders');
        setOrders(response.data.orders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await axios.put(`http://localhost:4000/api/update-status/${orderId}`, { status });
      const response = await axios.get('http://localhost:4000/api/orders');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='orderpage'>
      <h2>Order Page</h2>
      {orders.map((order) => {
        const firstItem = order.cartItems?.[0];

        return (
          <div className='order-box' key={order._id}>
            <div className='image'>
              <img src={firstItem?.image || orderImage} alt="food" />
            </div>

            <div className="name">
              <h3>
                {firstItem ? `${firstItem.name} (${firstItem.quantity} pcs)` : 'No items'}
              </h3>
              <div className='delivery-info'>
                <p>{order.deliveryInfo?.Name}</p>
                <p>{order.deliveryInfo?.street}, {order.deliveryInfo?.city}, {order.deliveryInfo?.state}</p>
                <p>{order.deliveryInfo?.phone}</p>
              </div>
            </div>

            <div className="quantity">
              <h3>Items: {order.cartItems?.length || 0}</h3>
            </div>

            <div className="price">
              <h3>₹ {order.total}</h3>
            </div>

            <div className='status'>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Order;

import React, { useEffect, useState } from 'react';
import './ListItems.css';
import axios from 'axios';

function ListItems() {
  const [foodItems, setFoodItems] = useState([]);

  // Fetch all food items from the database
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/food/list");
        if (response.data.success) {
          setFoodItems(response.data.data);
        } else {
          alert('Failed to fetch food items');
        }
      } catch (error) {
        console.error(error);
        alert("Error fetching food items");
      }
    };
    fetchFoodItems();
  }, []);

  // Delete a food item
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete('http://localhost:4000/api/food/remove', {
        data: { id },
      });
      if (response.data.success) {
        alert(response.data.message);
        setFoodItems(foodItems.filter((item) => item._id !== id));
      } else {
        alert('Failed to remove food item');
      }
    } catch (error) {
      console.error(error);
      alert("Error removing food item");
    }
  };

  return (
    <div className="listitems">
      <h2>All Food List</h2>
      <div className="box">
        {foodItems.length === 0 ? (
          <div className="no-data">
            <h3>No items available.</h3>
            <p>Add some delicious food items to see them listed here!</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {foodItems.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={`http://localhost:4000/uploads/${item.image}`} // Full image URL
                      alt={item.name}
                      className="product-image"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>₹ {item.price}</td>
                  <td>{item.category}</td>
                  <td>
                    <span className="remove" onClick={() => handleDelete(item._id)}>
                      X
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ListItems;

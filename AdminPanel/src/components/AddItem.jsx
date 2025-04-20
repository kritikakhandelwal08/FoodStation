import React, { useState } from 'react';
import './AddItem.css';
import axios from 'axios';

const AddItem = () => {
  const [image, setImage] = useState(null); // To store the uploaded image
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Save the selected image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send both text and file data
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('category', data.category);
    if (image) {
      formData.append('image', image); // Append image file
    }

    try {
      const response = await axios.post('http://localhost:4000/api/food/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);

      // Reset form fields
      setData({
        name: '',
        description: '',
        price: '',
        category: '',
      });
      setImage(null);
    } catch (error) {
      console.error(error);
      alert('Error adding food item');
    }
  };

  return (
    <div className="upload-image">
      <form onSubmit={handleSubmit}>
        <div className="heading">
          <h2>Upload Image</h2>
          <div className="image">
            <input type="file" onChange={handleImageChange} />
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Product Preview"
                className="product-preview"
              />
            )}
          </div>
        </div>
        <div className="product">
          <h2>Product Name</h2>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Enter Product Name"
            required
          />
        </div>
        <div className="description">
          <h2>Product Description</h2>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            placeholder="Enter Food Description"
            required
          ></textarea>
        </div>
        <div className="categoryprice">
          <div className="category">
            <h2>Product Category</h2>
            <input
              type="text"
              name="category"
              value={data.category}
              onChange={handleChange}
              placeholder="Enter Category"
              required
            />
          </div>
          <div className="price">
            <h2>Product Price</h2>
            <input
              type="text"
              name="price"
              value={data.price}
              onChange={handleChange}
              placeholder="₹ Price"
              required
            />
          </div>
        </div>
        <button type="submit">ADD</button>
      </form>
    </div>
  );
};

export default AddItem;

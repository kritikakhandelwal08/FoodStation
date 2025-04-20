import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "./KitchenItems.css";
import { CartContext } from "../Cart/cartContext";

const KitchenItems = () => {
    const { addToCart } = useContext(CartContext);
    const [menuItems, setMenuItems] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);
    const { category } = useParams();
    console.log("Category from URL params:", category);


    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/category/category/${category}`);
                console.log("Response status:", response.status); // Debug the response status
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const json = await response.json();
                console.log("Fetched Data:", json); // Log the response data
    
                // if (json.success) {
                //     setMenuItems(json);
                // } else {
                //     setError("Failed to fetch menu items.");
                // }
                // setMenuItems(json.data)
                if (Array.isArray(json)) {
                    setMenuItems(json); // Correctly set the menu items
                  } else {
                    console.error("Expected 'data' to be an array, but received:", json);
                    setMenuItems([]); // Set to an empty array to prevent further errors
                  }
            } catch (err) {
                console.error("Error fetching menu items:", err);
                setError("An error occurred while fetching data.");
            }
        };
    
        fetchMenuItems();
    }, [category]);
    
    const handleAddToCart = (item) => {
        addToCart(item);
        setMessage(`${item.name} added to cart!`);
        setTimeout(() => setMessage(""), 3000);
    };

    return (
        <div className="kitchen-items-container">
            {message && <div className="popup-message">{message}</div>}
            <h1>{category} Items</h1>
            {error && <p>{error}</p>}
            <div className="kitchen-item-grid">
                {menuItems.map((item) => (
                    <div key={item._id} className="kitchen-card">
                        <img src={`http://localhost:4000/uploads/${item.image}`} alt={item.name} />
                        <div className="kitchen-card-details">
                            <h3>{item.name}</h3>
                            <p>₹ {item.price}</p>
                            <p>{item.description}</p>
                        </div>
                        <button className="add-to-cart" onClick={() => handleAddToCart(item)}>+</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KitchenItems;

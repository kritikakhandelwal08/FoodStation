import React, { useContext, useState } from "react";
import "./KitchenItem.css";
import { CartContext } from "../Cart/cartContext";

const KitchenItem = ({ item }) => {
  const { _id,name, description, location, price, rating, image } = item;
  const { addToCart } = useContext(CartContext);
  const [message, setMessage] = useState("");

  const handleAddToCart = () => {
    console.log("Adding to cart:", item); // Debugging
    addToCart(item);
    setMessage(`${item.name} has been added to your cart!`);
    setTimeout(() => {
      setMessage(""); // Clear message after 3 seconds
    }, 3000);
  };

  return (
    <div className="kitchen-item">
      {message && <div className="popup-message">{message}</div>}
      <img src={image} alt={name} className="item-image" />
      <div className="item-details">
        <h3 className="item-name">{name}</h3>
        <p className="item-description">{description}</p>
        <p className="item-location">{location}</p>
        <div className="item-meta">
          <span className="item-price">₹{price}</span>
          <span className="item-rating">⭐ {rating}</span>
        </div>
      </div>
      <button className="add-to-cart" onClick={handleAddToCart}>
        +
      </button>
    </div>
  );
};

export default KitchenItem;

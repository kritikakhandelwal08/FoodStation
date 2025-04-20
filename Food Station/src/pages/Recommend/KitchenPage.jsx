import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./KitchenPage.css";
import KitchenItem from "./KitchenItem";

const KitchenPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const meal = location.state?.meal;
  // const userId = "3"; // Replace with actual dynamic user ID
  const userId = localStorage.getItem("user_id");


  const [recommendedItems, setRecommendedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!meal) {
      navigate("/");
      return;
    }

    // 
    const fetchRecommendations = async () => {
      try {
        // const userId = localStorage.getItem("user_id"); // Fetch stored user_id
    
        if (!userId) {
          console.error("User ID not found in localStorage.");
          setError("User not authenticated.");
          setLoading(false);
          return;
        }
    
        const response = await axios.post("http://localhost:8000/api/recommend", {
          user_id: userId,
        });
    
        if (response.data.meals && response.data.meals.length) {
          setRecommendedItems(response.data.meals);
        } else {
          console.warn("No recommendations found.");
        }
      } catch (err) {
        console.error("Error fetching recommendations:", err.response?.data || err);
        setError(err.response?.data?.message || "Error fetching recommendations");
      } finally {
        setLoading(false);
      }
    };
    

    fetchRecommendations();
  }, [meal, navigate, userId]); // Add userId as dependency to avoid warning
  const handleAddToCart = () => {
    console.log("Adding to cart:", item); // Debugging
    addToCart(item);
    setMessage(`${item.name} has been added to your cart!`);
    setTimeout(() => {
      setMessage(""); // Clear message after 3 seconds
    }, 3000);
  };

  return (
    <div className="kitchen-page">
      <div className="main-content">
        {meal ? (
          <>
            <h1 className="title">{meal.name}</h1>
            <KitchenItem key={meal._id} item={meal} />
          </>
        ) : (
          <p>Meal details are not available.</p>
        )}

        <h2 className="subtitle">Recommended ({recommendedItems.length})</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : recommendedItems.length ? (
          <div className="recommended-list">
            {recommendedItems.map((item) => (
              <div key={item.meal_id} className="recommended-item">
                <img
                  src={`http://localhost:4000/uploads/${item.image}`}
                  alt={item.name} // Ensure that this path is correct in the MongoDB schema
                  // alt={item.name}
                  className="recommended-image"
                  onClick={() =>
                    navigate("/recommend", { state: { meal: item } })
                  }
                />
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price.toFixed(2)}</p>
                <p>Rating: {item.rating} ⭐</p>
                <button className="add-to-cart" onClick={handleAddToCart}>
        +
      </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No recommendations found.</p>
        )}
      </div>
    </div>
  );
};

export default KitchenPage;

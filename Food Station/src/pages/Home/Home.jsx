import React, { useEffect, useState, useContext } from "react";
import "./Home.css";
import image from "/public/hero.png";
import { GoSearch } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import { CartContext } from "../Cart/cartContext";
import { useNavigate } from "react-router-dom";
import featureData from "../../api/featureData.json";


const Home = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [kitchenMeals, setKitchenMeals] = useState([]);
  const [message, setMessage] = useState("");
  const [items, setTiffineZone] = useState([]);
  const [features, setFeatures] = useState([]);
  const { addToCart } = useContext(CartContext);
  
  const navigate = useNavigate();

  // Fetch menu data
  // const fetchMenuData = async () => {
  //   try {
  //     const res = await fetch("http://localhost:8000/api/menu");
  //     if (!res.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const json = await res.json();
  //     setMenuItems(json);
  //   } catch (error) {
  //     console.error("Error fetching the menu:", error);
  //   }
  // };
  const fetchMenuData = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/menu");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await res.json();
  
      // Access the 'data' field, which contains the array of menu items
      if (Array.isArray(json.data)) {
        setMenuItems(json.data); // Correctly set the menu items
      } else {
        console.error("Expected 'data' to be an array, but received:", json.data);
        setMenuItems([]); // Set to an empty array to prevent further errors
      }
    } catch (error) {
      console.error("Error fetching the menu:", error);
      setMenuItems([]); // Fallback to an empty array in case of error
    }
  };
  

  // Fetch kitchen meal data
  const fetchKitchenMealData = async () => {
    try {
      const res = await fetch("http://localhost:8000/meals/homemade");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await res.json();
      setKitchenMeals(json);
    } catch (error) {
      console.error("Error fetching kitchen meals:", error);
    }
  };

  // Fetch tiffin zone data
  const fetchtiffinzoneData = async () => {
    try {
      const res = await fetch("http://localhost:8000/tiffinzones/tiffinzone");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await res.json();
      setTiffineZone(json);
    } catch (error) {
      console.error("Error fetching tiffin zone data:", error);
    }
  };

  // Fetch features data (if applicable)
  const fetchFeatureData = async () => {
    try {
      const res = await fetch("http://localhost:8000/features");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await res.json();
      setFeatures(json);
    } catch (error) {
      console.error("Error fetching feature data:", error);
    }
  };

  // // Fetch additional Tiffin zone data
  // const fetchAdditionalTiffinData = async () => {
  //   try {
  //     const res = await fetch("http://localhost:8000/tiffinzzones/tiffinzone"); // Update with your API endpoint
  //     if (!res.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const json = await res.json();
  //     setTiffineZone((prevItems) => [...prevItems, ...json]); // Append new data to existing state
  //   } catch (error) {
  //     console.error("Error fetching additional tiffin data:", error);
  //   }
  // };

  useEffect(() => {
    fetchMenuData();
    fetchKitchenMealData();
    fetchtiffinzoneData();
    fetchFeatureData();
  }, []);

  // const handleMenuItemClick = (id) => {
  //   navigate(`/kitchen-items/${id}`);
  // };
  const handleMenuItemClick = (Name) => {
    navigate(`/kitchen-items/${encodeURIComponent(Name)}`);
};

const handleMealClick = (meal) => {
  navigate("/recommend", { state: { meal } });
};
  const handleAddToCart = (item) => {
    addToCart(item);
    setMessage(`${item.name} has been added to your cart!`);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <>
      {message && <div className="popup-message">{message}</div>}

      <div className="hero">
        <div className="left-hero">
          <div className="left-hero-start">Super fast delivery</div>
          <h1>Welcome to Food Station</h1>
          <div className="text">
            <p>Online For You</p>
            <div className="line"></div>
          </div>
          <div className="search">
            <input type="text" placeholder="Search..." className="search-bar" />
            <GoSearch className="search-icon" />
          </div>
        </div>
        <div className="right-hero">
          <img className="hero-img" src={image} alt="hero-image" />
        </div>
      </div>

      <div className="menu">
        <h1>
          Explore Our <span>Menu</span>
        </h1>
        <p>Explore our delicious menu and find your next favorite meal!</p>
        <div className="menu-item">
          {/* {menuItems.map((item) => (
            <div
              key={item.id}
              className="menu-card"
              onClick={() => handleMenuItemClick(item.id)}
            >
              <img src={item.imageURL} alt={item.Name} className="menu-image" />
              <p className="menu-name">{item.Name}</p>
            </div>
          ))} */}
          {menuItems.length > 0 ? (
    menuItems.map((item) => (
      <div
        key={item._id} // Use `_id` as the unique key
        className="menu-card"
        onClick={() => handleMenuItemClick(item.category)}
      >
              <img src={item.imageURL} alt={item.Name} className="menu-image" />
        
        <p className="menu-name">{item.Name}</p>
      </div>
    ))
  ) : (
    <p>No menu items available.</p>
  )}
       <div >

  
</div>



        </div>
      </div>
      <div className="line-hr">
        <hr />
      </div>

      <div className="meals">
        <h1>
          Homemade Meals From Best <span>Kitchens</span>
        </h1>
        <div className="meals-container">
          {kitchenMeals.map((meal) => (
            <div key={meal.id} className="meal-card" onClick={() => handleMealClick(meal)}>
              <img src={meal.image} alt={meal.name} className="meal-image" />
              <h2>{meal.name}</h2>
              <p>Price: ₹{meal.price.toFixed(2)}</p>
              <p>Rating: {meal.rating} ⭐</p>
              <button
                className="add-cart-btn"
                onClick={() => handleAddToCart(meal)}
              >
                +
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="tiffine">
        <h1>
          The Tiffin <span>Zone</span>
        </h1>
        <p>
          Taste the love of home in every Tiffin <span>Order Now!</span>
        </p>
        <div className="tiffine-container">
          <ul>
            {items.map((item) => (
              <li key={item.id} className="tiffine-card">
                <div className="tiffine-info">
                  <h2>
                    <MdVerified className="verified-icon" /> Must Try
                  </h2>
                  <h3>{item.name}</h3>
                  <p>Ingredients: {item.ingredients.join(", ")}</p>
                  <h4> ₹{item.price}</h4>
                  <p>Calories: {item.calories}</p>
                  <button
                    className="add-cart-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    +
                  </button>
                </div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="tiffine-image"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="features-container">
        {features.map((feature) => (
          <div key={feature.id} className="feature-item">
            <div className="feature-item-image">
              <img
                src={feature.image}
                alt={feature.title}
                className="feature-icon"
              />
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;

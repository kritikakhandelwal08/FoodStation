import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "/public/logo white.png";
import { PiShoppingCartFill } from "react-icons/pi";
import { ImLocation } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import LogInPopUp from "@/pages/Login/LogInPopUp.jsx"; // Import the Login Popup

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [selectedLocation, setSelectedLocation] = useState("Your Location");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showLogin, setShowLogin] = useState(false); // State for displaying the login popup
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  // Check if user is logged in on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setUserName(localStorage.getItem('userName'));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
  };

  // Handle location selection
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  // Profile click handler to navigate to profile page
  const handleProfileClick = () => {
    navigate("/profile"); // Navigate to the profile page
  };

  return (
    <div>
      {/* Show login popup if showLogin is true */}
      {showLogin && (
        <LogInPopUp
          setShowLogin={setShowLogin}
          setIsLoggedIn={setIsLoggedIn}
          setUserName={setUserName}
        />
      )}

      <nav className="navbar">
        <div className="left-nav">
          <Link to="/" onClick={() => setMenu("home")} className={menu === "/" ? "active" : ""}>
            <img className="logo" src={logo} alt="Logo" />
          </Link>
        </div>

        <div className="center-nav">
          <ul>
            <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>
              <Link to="/">Home</Link>
            </li>
            <li onClick={() => setMenu("contact us")} className={menu === "contact us" ? "active" : ""}>
              <Link to="/partner">Partner with Us</Link>
            </li>
          </ul>
        </div>

        <div className="right-nav">
          <div className="location">
            <ImLocation className="location-icon" />
            <select name="location" id="location" value={selectedLocation} onChange={(e) => handleLocationSelect(e.target.value)}>
              <option value="" disabled>Your Location</option>
              <option value="alwar">Alwar</option>
              <option value="jaipur">Jaipur</option>
              <option value="delhi">Delhi</option>
            </select>
          </div>

          <div onClick={() => setMenu("cart")} className={menu === "cart" ? "active" : ""}>
            <Link to="/cart">
              <PiShoppingCartFill className="cart" />
            </Link>
          </div>

          {/* Conditional rendering for login/logout */}
          {!isLoggedIn ? (
            <button onClick={() => setShowLogin(true)} className="sign-in-btn">Sign In</button>
          ) : (
            <div className="log">
              <span onClick={handleProfileClick} className="sign-in-btn"> Profile</span> {/* Display user profile */}
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

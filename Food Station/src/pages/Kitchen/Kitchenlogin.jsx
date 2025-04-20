import React, { useState } from "react";
import "./KitchenLogin.css";

const KitchenLogin = () => {
  const [formData, setFormData] = useState({
    kitchenName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., API call)
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>Log In</h2>
        {/* <button className="close-btn">X</button> */}
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="kitchenName"
          placeholder="Kitchen Name"
          value={formData.kitchenName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="kitchen-login-btn">
          Log In
        </button>
        <div className="terms">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
          />
          <label>
            By Continuing, I Agree to the terms of use & Privacy Policy.
          </label>
        </div>
      </form>
    </div>
  );
};

export default KitchenLogin;
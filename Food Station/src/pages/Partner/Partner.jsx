import React, { useState } from "react";
import "./Partner.css";
import axios from "axios"; // Import Axios for API requests
import Login from "./Login"; // Import Login Component

const PartnerWithUs = () => {
    const [formData, setFormData] = useState({
        kitchenName: "",
        ownerName: "",
        ownerEmail: "", // Added ownerEmail
        contactNumber: "",
        kitchenAddress: "",
        city: "",
        state: "",
        password: "",
    });

    const [showLogin, setShowLogin] = useState(false); // State to toggle between login and registration forms

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8000/api/kitchen/register",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.data.token) {
                localStorage.setItem("token", response.data.token); // Store JWT token if needed
                alert("Registration successful!");
                setShowLogin(true); // Show the login form after successful registration
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="partner-container">
            {showLogin ? (
                <Login setShowLogin={setShowLogin} /> // Show Login form
            ) : (
                <div>
                    <div className="partner-header">
                        <img
                            className="image1"
                            src="/partner-icon1.png"
                            alt="Partner Icon 1"
                        />
                        <img
                            className="image2"
                            src="/partner-icon2.png"
                            alt="Partner Icon 2"
                        />
                        <h2>Bring Your Family Recipes to Life</h2>
                        <p>Partner with Us & Get Started Today!</p>
                        <div className="partner-buttons">
                            <button
                                className="register-btn"
                                onClick={() => setShowLogin(false)}
                            >
                                Register Your Kitchen
                            </button>
                            <button
                                className="login-btn"
                                onClick={() => setShowLogin(true)}
                            >
                                Login to View Your Kitchen
                            </button>
                        </div>
                    </div>

                    <form className="partner-form" onSubmit={handleSubmit}>
                        <h3>Partner With Us</h3>
                        <div className="form-group">
                            <div className="input-field">
                                <label htmlFor="kitchenName">Kitchen Name</label>
                                <input
                                    type="text"
                                    id="kitchenName"
                                    name="kitchenName"
                                    placeholder="Kitchen Name"
                                    value={formData.kitchenName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-field">
                                <label htmlFor="ownerName">Owner Name</label>
                                <input
                                    type="text"
                                    id="ownerName"
                                    name="ownerName"
                                    placeholder="Owner Name"
                                    value={formData.ownerName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-field">
                                <label htmlFor="ownerEmail">Owner's Email ID</label>
                                <input
                                    type="email"
                                    id="ownerEmail"
                                    name="ownerEmail"
                                    placeholder="Owner's Email"
                                    value={formData.ownerEmail}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-field">
                                <label htmlFor="contactNumber">
                                    Contact Number
                                </label>
                                <input
                                    type="tel"
                                    id="contactNumber"
                                    name="contactNumber"
                                    placeholder="+91 XXXXXXXXXX"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-field">
                                <label htmlFor="kitchenAddress">
                                    Kitchen Address
                                </label>
                                <input
                                    type="text"
                                    id="kitchenAddress"
                                    name="kitchenAddress"
                                    placeholder="Kitchen Address"
                                    value={formData.kitchenAddress}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-field">
                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-field">
                                <label htmlFor="state">State</label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    placeholder="State"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-field">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="register-btn-form">
                            Register Kitchen
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PartnerWithUs;

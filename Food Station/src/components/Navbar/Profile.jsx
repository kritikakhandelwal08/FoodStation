import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import OrderHistory from "./OrderHistory";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    password: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      pinCode: "",
      country: "",
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8000/api/auth/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Safely set the response data and ensure `address` exists
        setUserData({
          ...response.data.user,
          address: response.data.user.address || {
            street: "",
            city: "",
            state: "",
            pinCode: "",
            country: "",
          },
          currentPassword: "",
          password: "",
        });
      } catch (error) {
        console.error(
          "Error fetching user data:",
          error.response?.data?.message || error.message
        );
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("address.")) {
      const addressField = name.split(".")[1]; // Get the address field name
      setUserData((prevData) => ({
        ...prevData,
        address: { ...prevData.address, [addressField]: value },
      }));
    } else {
      setUserData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      const { name, email, currentPassword, password, phone, address } =
        userData;

      const payload = { name, email, phone, address }; // Include phone and address
      if (currentPassword && password) {
        payload.currentPassword = currentPassword;
        payload.password = password;
      }

      const response = await axios.put(
        "http://localhost:8000/api/auth/profile",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Profile updated successfully!");
      setUserData({ ...response.data.user, currentPassword: "", password: "" });
      setIsEditing(false);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error updating profile!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="profile-page">
        <div className="profile-left">
          <div className="profile-container">
            <h2>Your Profile</h2>

            {message && (
              <p
                className={`profile-message ${
                  message.includes("Error") ? "error" : "success"
                }`}
              >
                {message}
              </p>
            )}

            <div className="profile-fields">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </label>

              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </label>

              <label>
                Current Password:
                <input
                  type="password"
                  name="currentPassword"
                  value={userData.currentPassword}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Enter current password to change it"
                />
              </label>

              <label>
                New Password:
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Enter new password"
                />
              </label>

              <label>
                Phone:
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </label>

              <div className="address-container">
                <label>
                  Street:
                  <input
                    type="text"
                    name="address.street"
                    value={userData.address?.street || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </label>

                <label>
                  City:
                  <input
                    type="text"
                    name="address.city"
                    value={userData.address?.city || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </label>

                <label>
                  State:
                  <input
                    type="text"
                    name="address.state"
                    value={userData.address?.state || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </label>

                <label>
                  Pin Code:
                  <input
                    type="text"
                    name="address.pinCode"
                    value={userData.address?.pinCode || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </label>

                <label>
                  Country:
                  <input
                    type="text"
                    name="address.country"
                    value={userData.address?.country || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </label>
              </div>
            </div>

            <div className="profile-actions">
              {isEditing ? (
                <>
                  <button onClick={handleSaveChanges} disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                  <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)}>Edit Profile</button>
              )}
            </div>
          </div>
        </div>

        <div className="profile-right">
          <OrderHistory />
        </div>

      </div>
    </>
  );
};

export default Profile;
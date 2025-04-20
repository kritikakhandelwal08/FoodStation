import React, { useContext, useState } from "react";
import { CartContext } from "./cartContext"; // Import CartContext
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import LoginAlert from "../LoginAlertpopup/LoginAlert"; // Import LoginAlert component

const CartPage = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeItem, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // State for login alert and delivery info
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState(() => {
    return JSON.parse(localStorage.getItem("deliveryInfo")) || {
      Name: "",
      email: "",
      street: "",
      city: "",
      state: "",
      pinCode: "",
      country: "",
      phone: "",
    };
  });

  // Check login status
  const isLoggedIn = !!localStorage.getItem("token");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedInfo = { ...deliveryInfo, [name]: value };
    setDeliveryInfo(updatedInfo);
    localStorage.setItem("deliveryInfo", JSON.stringify(updatedInfo));
  };

  const validateDeliveryInfo = () => {
    const { Name, email, phone, street, city, state, pinCode, country } = deliveryInfo;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!Name.trim()) return "Please enter your name.";
    if (!emailRegex.test(email)) return "Please enter a valid email address.";
    if (!phoneRegex.test(phone)) return "Please enter a valid 10-digit phone number.";
    if (!street || !city || !state || !pinCode || !country) return "All fields are required.";

    return null; // No errors
  };

  const handleProceedToPayment = () => {
    // Validate delivery info
    const errorMessage = validateDeliveryInfo();
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    // Check login status
    if (!isLoggedIn) {
      setShowLoginAlert(true);
      return;
    }

    // Navigate to payment
    navigate("/payment", {
      state: { cartItems, deliveryInfo },
    });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = 50; // Fixed delivery fee
  const total = subtotal + deliveryFee;

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.itemId}>
                <td>{item.name}</td>
                <td>₹{item.price}</td>
                <td>
                  <button onClick={() => decreaseQuantity(item.itemId)} aria-label="Decrease Quantity">
                    -
                  </button>
                  <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.itemId)} aria-label="Increase Quantity">
                    +
                  </button>
                </td>
                <td>₹{item.price * item.quantity}</td>
                <td>
                  <button onClick={() => removeItem(item.itemId)} aria-label="Remove Item">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Delivery Info */}
      <div className="delivery-info">
        <h3>Delivery Information</h3>
        <form>
          {["Name", "email", "street", "city", "state", "pinCode", "country", "phone"].map((field) => (
            <input
              key={field}
              required
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={field}
              value={deliveryInfo[field]}
              onChange={handleInputChange}
            />
          ))}
        </form>
      </div>

      {/* Cart Totals */}
      <div className="cart-totals">
        <h3>Cart Totals</h3>
        <div className="totals-row">
          <p>Subtotal:</p>
          <p>₹{subtotal}</p>
        </div>
        <hr />
        <div className="totals-row">
          <p>Delivery Fee:</p>
          <p>₹{deliveryFee}</p>
        </div>
        <hr />
        <div className="totals-row">
          <p>Total:</p>
          <p>₹{total}</p>
        </div>
        <button onClick={handleProceedToPayment}>Proceed to Payment</button>
      </div>

      {/* Login Alert */}
      {showLoginAlert && (
        <LoginAlert
          onClose={() => setShowLoginAlert(false)}
          onLogin={() => navigate("/login")}
        />
      )}
    </div>
  );
};

export default CartPage;

import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../Cart/cartContext"; // Adjust the path as necessary
import "./Payment.css";

const Payment = () => {
  const location = useLocation();
  const { cartItems, clearCart } = useContext(CartContext); // Access cart items and clearCart
  const navigate = useNavigate();

  const { deliveryInfo } = location.state; // Retrieve delivery info from the state passed via navigate

  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedUPI, setSelectedUPI] = useState("");

  // Calculate subtotal from cart items
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = 50; // Example static delivery fee
  const total = subtotal + deliveryFee;

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
    if (event.target.value !== "UPI") {
      setSelectedUPI(""); // Reset UPI method if a different payment method is selected
    }
  };

  const handleUPIChange = (event) => {
    setSelectedUPI(event.target.value);
  };

  const handleContinue = async () => {
    // Validate payment method
    if (!selectedPayment) {
      alert("Please select a payment method.");
      return;
    }

    // If UPI is selected, ensure UPI method is chosen
    if (selectedPayment === "UPI" && !selectedUPI) {
      alert("Please select a UPI method.");
      return;
    }

    const paymentMethod = selectedPayment === "UPI" ? `UPI (${selectedUPI})` : selectedPayment;

    const orderData = {
      deliveryInfo,
      cartItems,
      subtotal,
      deliveryFee,
      total,
      paymentMethod, // Include selected payment method
    };

    try {
      const response = await fetch("http://localhost:8000/api/cart/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if required
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        clearCart(); // Clear the cart after successful order
        navigate("/"); // Redirect to the home page
      } else {
        alert(result.message || "Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment</h2>
      <p>How would you like to pay?</p>
      <form>
        {/* UPI Option */}
        <div className="payment-option">
          <input
            type="radio"
            id="upi"
            name="paymentMethod"
            value="UPI"
            onChange={handlePaymentChange}
          />
          <label htmlFor="upi">UPI</label>
          {selectedPayment === "UPI" && (
            <div className="upi-options">
              <p>Select UPI Method:</p>
              <div>
                <input
                  type="radio"
                  id="googlePay"
                  name="upiMethod"
                  value="Google Pay"
                  onChange={handleUPIChange}
                />
                <label htmlFor="googlePay">Google Pay</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="phonePe"
                  name="upiMethod"
                  value="PhonePe"
                  onChange={handleUPIChange}
                />
                <label htmlFor="phonePe">PhonePe</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="paytm"
                  name="upiMethod"
                  value="Paytm"
                  onChange={handleUPIChange}
                />
                <label htmlFor="paytm">Paytm</label>
              </div>
            </div>
          )}
        </div>

        {/* Cash on Delivery Option */}
        <div className="payment-option">
          <input
            type="radio"
            id="cod"
            name="paymentMethod"
            value="Cash on Delivery"
            onChange={handlePaymentChange}
          />
          <label htmlFor="cod">Cash on Delivery</label>
        </div>

        <button type="button" onClick={handleContinue} className="continue-button">
          Confirm Payment
        </button>
      </form>
    </div>
  );
};

export default Payment;

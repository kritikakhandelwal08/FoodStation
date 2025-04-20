import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginAlert.css';

const LoginAlert = ({ onClose }) => {
    const navigate = useNavigate();
    const handleSignIn = () => {
        navigate('/login');
        onClose(); // Close the login alert after signing in
    };
  return (
    <div className="login-alert-overlay">
      <div className="login-alert">
        <h2>Not Logged In</h2>
        <p>You need to log in to proceed with the payment.</p>
        <div className="alert-buttons">
          <button onClick={onClose}>Close</button>
          <button onClick={handleSignIn}>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default LoginAlert;

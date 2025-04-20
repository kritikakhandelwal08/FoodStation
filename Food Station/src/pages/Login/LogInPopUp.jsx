import React, { useState } from 'react';
import './LogInPopUp.css';
import axios from 'axios';
import { RxCross2 } from "react-icons/rx";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const LogInPopUp = ({ setShowLogin, setIsLoggedIn, setUserName }) => {
  const [currentState, setCurrentState] = useState("Log In");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    const url = currentState === "Log In"
      ? "http://localhost:8000/api/users/login"
      : "http://localhost:8000/api/users/register";

    const data = currentState === "Log In"
      ? { email, password }
      : { name, email, password };

    try {
      const response = await axios.post(url, data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        if (response.data.user) {
          localStorage.setItem('user_id', response.data.user.user_id)
          localStorage.setItem('userName', response.data.user.name); // Save user info
          setUserName(response.data.user.name);
        }
        console.log(response.data.user.user_id)
        setIsLoggedIn(true); // Update login state in parent component
        setMessage('Success! You are logged in.');
        setTimeout(() => {
          setShowLogin(false);
        }, 1000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <RxCross2 onClick={() => setShowLogin(false)} style={{ cursor: "pointer", width: '20px' }} />
        </div>

        <div className="login-popup-inputs">
          {currentState === "Sign Up" && (
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-input">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="eye-icon"
              onClick={() => setPasswordVisible(!passwordVisible)}
              aria-label={passwordVisible ? "Hide password" : "Show password"}
            >
              {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : currentState === "Sign Up" ? "Create Account" : "Log In"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <h5>By continuing, I agree to the terms of use & privacy policy.</h5>
        </div>

        {message && <p>{message}</p>}

        {currentState === "Log In" ? (
          <p>
            Don't have an account? <span onClick={() => setCurrentState("Sign Up")}>Sign Up</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={() => setCurrentState("Log In")}>Log In</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LogInPopUp;

import React from "react";
import "./Footer.css";
import logo from "/public/logo white.png";
import { BsInstagram } from "react-icons/bs";
import { LuTwitter } from "react-icons/lu";
import { AiOutlineYoutube } from "react-icons/ai";
import { RiFacebookCircleLine } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-desc">
        <img src={logo} alt="logo" className="logo" />
        <p>
          From daily tiffins to restaurant favorites, order fresh, delicious
          meals anytime!
        </p>
      </div>

      <div className="footer-page-links">
        <p>Information</p>
        <ul>
          <li>About Us</li>
          <li>Career</li>
          <li>Team</li>
          <li>Events</li>
        </ul>
      </div>

      <div className="footer-terms">
      <p>Legal</p>
        <ul>
          <li>Terms and Conditions</li>
          <li>Cookies Policy</li>
          <li>Privacy Policy</li>
        </ul>
      </div>

      <div className="footer-social-links">
        <p>Connect</p>
        <ul>
          <li><RiFacebookCircleLine /> Facebook</li>
          <li><BsInstagram /> Instagram</li>
          <li><LuTwitter /> Twitter</li>
          <li><AiOutlineYoutube /> Youtube</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;

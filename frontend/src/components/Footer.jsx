import React from "react";
import { FaInstagram } from "react-icons/fa";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="copyright">&copy; {new Date().getFullYear()} ManageYself. All rights reserved.</p>
        
        <div className="social-media">
          <span className="follow-text">Follow Us:</span>
          <a 
            href="https://www.instagram.com/manageyself_agency/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="instagram-link"
            aria-label="Visit our Instagram"
          >
            <FaInstagram className="instagram-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
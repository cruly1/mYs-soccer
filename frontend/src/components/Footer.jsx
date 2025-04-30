import React from "react";
import { FaInstagram, FaTiktok, FaYoutube, FaFacebook,  } from "react-icons/fa";
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
          <a 
            href="https://www.tiktok.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="tiktok-link"
            aria-label="Visit our TikTok"
          >
            <FaTiktok className="tiktok-icon" />
            
          </a>
          <a 
            href="https://www.youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="youtube-link"
            aria-label="Visit our Youtube Channel"
          >
            <FaYoutube className="youtube-icon" />
            
          </a>
          <a 
            href="https://www.facebook.com/manageyself" 
            target="_blank" 
            rel="noopener noreferrer"
            className="facebook-link"
            aria-label="Visit our Facebook"
          >
            <FaFacebook className="facebook-icon" />
            
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
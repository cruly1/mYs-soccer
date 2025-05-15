import React from "react";
import "./ContactSection.scss";

const ContactSection = () => {
  return (
    <div className="contact-section">
      <h2>Contact Us</h2>
      <p>Email: <a href="mailto:info@manageyself.com">info@manageyself.com</a></p>
      <p>Marton Attila Phone: <a href="tel:+36306024676">+36 30 602 4676</a></p>
      <p>Futács Márkó Phone: <a href="tel:+36706297640">+36 70 629 7640</a></p>

    </div>
  );
};

export default ContactSection;

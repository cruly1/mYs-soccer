import React from "react";
import { useNavigate } from "react-router-dom";

const AboutUsSection = () => {
  const navigate = useNavigate();

  return (
    <div className="about-us-section">
      <h2>About Us</h2>
      <div className="owners">
        <img src="owner1.jpg" alt="Owner 1" />
        <img src="owner2.jpg" alt="Owner 2" />
      </div>
      <p>We are passionate about soccer...</p>
      <button onClick={() => navigate("/owners")}>Get to Know Us Better</button>
    </div>
  );
};

export default AboutUsSection;

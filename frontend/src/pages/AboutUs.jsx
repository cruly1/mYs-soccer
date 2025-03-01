import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="about-us-page"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <h1>About Us</h1>
      <p>We are passionate about soccer...</p>
      <button onClick={() => navigate("/owners")}>Get to Know Us Better</button>
    </motion.div>
  );
};

export default AboutUs;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./AboutUs.scss";

const owners = [
  {
    name: "Owner 1",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
    description:
      "Owner 1 started their career in football and later built this company. They bring expertise in talent management and player development.",
    bgColor: "#2ecc71", // Green
  },
  {
    name: "Owner 2",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
    description:
      "Owner 2 has been involved in football management for years. They specialize in career growth and sponsorship opportunities.",
    bgColor: "#3498db", // Blue
  },
];

const AboutUs = () => {
  const navigate = useNavigate();
  const [currentOwner, setCurrentOwner] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 300); // Fade-in effect on page load
  }, []);

  const switchOwner = () => {
    setFadeIn(false); // Prevent flickering during transition
    setTimeout(() => {
      setCurrentOwner((prev) => (prev === 0 ? 1 : 0));
      setFadeIn(true);
    }, 500);
  };

  return (
    <motion.div
      className="about-us-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: fadeIn ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`owner-section ${currentOwner === 0 ? "left" : "right"}`} style={{ backgroundColor: owners[currentOwner].bgColor }}>
        <motion.img
          key={`image-${currentOwner}`}
          src={owners[currentOwner].image}
          alt={owners[currentOwner].name}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className={`text-section ${currentOwner === 0 ? "right" : "left"}`}>
        <motion.div
  key={`text-${currentOwner}`}
  initial={{ opacity: 0, x: currentOwner === 0 ? 100 : -100 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: currentOwner === 0 ? -100 : 100 }}
  transition={{ duration: 0.5 }}
>
  <h2>{owners[currentOwner].name}</h2>
  <p>{owners[currentOwner].description}</p>
  
  {/* ✅ Grouping Buttons in a Flexbox */}
  <div className="button-group">
    <button className="home-btn" onClick={switchOwner}>Switch Owner</button>
    <button className="home-btn" onClick={() => navigate("/")}>Home</button>
  </div>
</motion.div>

        
      </div>
      
    </motion.div>
  );
};

export default AboutUs;

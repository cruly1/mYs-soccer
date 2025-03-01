import React from "react";
import { motion } from "framer-motion";

const Services = () => {
  return (
    <motion.div
      className="services-page"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <h1>Our Services</h1>
      <ul>
        <li>Mental Coach</li>
        <li>Marketing</li>
        <li>Nutrition</li>
        <li>Rehabilitation</li>
        <li>Language Education</li>
        <li>Functional Training</li>
        <li>Financial Advice</li>
        <li>Individual Training</li>
      </ul>
    </motion.div>
  );
};

export default Services;

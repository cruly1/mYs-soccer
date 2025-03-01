import React from "react";
import { motion } from "framer-motion";

const News = () => {
  return (
    <motion.div
      className="news-page"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
    >
      <h1>All News</h1>
      <p>List of all news articles here...</p>
    </motion.div>
  );
};

export default News;

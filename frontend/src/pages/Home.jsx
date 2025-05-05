import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import NewsSection from "../components/NewsSection";
import PlayersSection from "../components/PlayersSection";
import ServicesSection from "../components/ServicesSection";
import AboutUsSection from "../components/AboutUsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import "./Home.scss";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("NEWS");
  const contentRef = useRef(null);

  const smoothScrollTo = (targetY, duration = 2000) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeInOut = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

      window.scrollTo(0, startY + distance * easeInOut);

      if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
  };


  useEffect(() => {
    const timeout = setTimeout(() => {
      if (contentRef.current) {
        const targetY = contentRef.current.getBoundingClientRect().top + window.scrollY;
        smoothScrollTo(targetY, 2500);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);


  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  return (
    <div className="home">
     
      <div
        className="background-image"
        style={{
          filter: `blur(${Math.min(scrollY / 50, 8)}px) brightness(${
            1 - Math.min(scrollY / 800, 0.5)
          })`,
        }}
      ></div>

     
      <div className="welcome-text">
        <h1>Welcome to ManageYself</h1>
        <p>Take your destiny into your own hands!</p>
      </div>

      
      <div className="main-content" ref={contentRef}>
        <Navbar setActiveSection={setActiveSection} />

        <div className="content">
          <AnimatePresence mode="wait">
            {activeSection === "NEWS" && (
              <motion.div
                key="news"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <NewsSection />
              </motion.div>
            )}
            {activeSection === "PLAYERS" && (
              <motion.div
                key="players"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <PlayersSection />
              </motion.div>
            )}
            {activeSection === "SERVICES" && (
              <motion.div
                key="services"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <ServicesSection />
              </motion.div>
            )}
            {activeSection === "ABOUT US" && (
              <motion.div
                key="aboutus"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <AboutUsSection />
              </motion.div>
            )}
            {activeSection === "CONTACT" && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <ContactSection />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      
      <Footer />
    </div>
  );
};

export default Home;

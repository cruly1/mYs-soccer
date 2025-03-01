import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import NewsSection from "../components/NewsSection";
import PlayersSection from "../components/PlayersSection";
import ServicesSection from "../components/ServicesSection";
import AboutUsSection from "../components/AboutUsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer"; // Import Footer
import { motion, AnimatePresence } from "framer-motion";
import "./Home.scss";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("NEWS");
  const contentRef = useRef(null);

  // Automatically scroll to content on first load
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 1000); // Delay to ensure page loads smoothly

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, []);

  // Handle scroll for background blur effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home">
      {/* Background with blur effect */}
      <div
        className="background-image"
        style={{
          filter: `blur(${Math.min(scrollY / 50, 8)}px) brightness(${
            1 - Math.min(scrollY / 800, 0.5)
          })`,
        }}
      ></div>

      {/* Welcome Text */}
      <div className="welcome-text">
        <h1>Welcome to ManageYself</h1>
        <p>Your ultimate platform to manage players, teams, and events easily!</p>
      </div>

      {/* Main Content Section (scroll target) */}
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;

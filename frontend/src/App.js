import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import News from "./pages/News";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import Owners from "./pages/Owners";
import PlayersPage from "./pages/PlayersPage";
import FinancialAdvices from "./pages/servicePages/FinancialAdvices";
import MentalCoach from "./pages/servicePages/MentalCoach";
import Nutrition from "./pages/servicePages/Nutrition";
import Marketing from "./pages/servicePages/Marketing";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/owners" element={<Owners />} />
        <Route path="/players" element={<PlayersPage />} />
        <Route path="/services/financial-advices" element={<FinancialAdvices />} />
        <Route path="/services/mental-coach" element={<MentalCoach />} />
        <Route path="/services/nutrition" element={<Nutrition />} />
        <Route path="/services/marketing" element={<Marketing />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
};

export default App;

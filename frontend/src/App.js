import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import News from "./pages/News";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import Owners from "./pages/Owners";
import PlayersPage from "./pages/PlayersPage";
import ServicePage from "./pages/ServicePage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import NewsDetail from "./pages/NewsDetail";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:title" element={<NewsDetail />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:title" element={<ServicePage />} /> {/* ✅ Dynamic Service Route */}
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/owners" element={<Owners />} />
        <Route path="/players" element={<PlayersPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
    <ToastContainer 
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
    />
      <AnimatedRoutes />
    </Router>
  );
};

export default App;

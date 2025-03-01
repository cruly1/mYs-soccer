import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "./Services.scss";

const services = [
  { name: "Mental Coach", description: "Improve mental resilience and performance under pressure.", path: "/services/mental-coach"  },
  { name: "Marketing", description: "Boost your personal brand and sponsorship deals.", path: "/services/marketing"},
  { name: "Nutrition", description: "Personalized meal plans for peak athletic performance.", path: "/services/nutrition" },
  { name: "Financial Advice", path: "/services/financial-advices" },
];

const Services = () => {
   const navigate = useNavigate();
    return (
    <div className="services-page">
    <div
        className="background-image"
      ></div>
      <h2>Our Services</h2>
      <div className="services-list">
        {services.map((service, index) => (
          <div key={index} className="service-item">
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <button onClick={() => navigate(service.path)}>Learn More</button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Services;

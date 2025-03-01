import React from "react";
import { useNavigate } from "react-router-dom";
import "./ServicesSection.scss";

// Service Data
const services = [
  { name: "Mental Coach", image: "/mnt/data/mental coach.jpg" },
  { name: "Marketing", image: "/mnt/data/marketing.jpg" },
  { name: "Nutrition", image: "/mnt/data/nutrition.jpg" },
  { name: "Rehabilitation", image: "/mnt/data/rehabilitation.jpg" },
  { name: "Language Education", image: "/mnt/data/lang_edu.jpg" },
  { name: "Functional Training", image: "/mnt/data/func training.jpg" },
  { name: "Financial Advice", image: "/mnt/data/fin_adv.jpg" },
  { name: "Individual Training", image: "/mnt/data/indv_tra.jpg" },
];

const ServicesSection = () => {
  const navigate = useNavigate();

  return (
    <div className="services-section">
      <h2>Our Services</h2>
      <div className="services-container">
        {services.slice(0, 3).map((service, index) => (
          <div key={index} className="service-card">
            <img src={service.image} alt={service.name} />
            <p>{service.name}</p>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/services")}>View All Services</button>
    </div>
  );
};

export default ServicesSection;

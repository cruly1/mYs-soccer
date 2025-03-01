import React from "react";
import { useNavigate } from "react-router-dom";
import "./ServicesSection.scss";

// Service Data
const services = [
  { 
    name: "Mental Coach", 
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
    description: "Improve mental resilience and performance under pressure."
  },
  { 
    name: "Marketing", 
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
    description: "Boost your personal brand and sponsorship deals."
  },
  { 
    name: "Nutrition", 
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
    description: "Personalized meal plans for peak athletic performance."
  },
  { 
    name: "Rehabilitation", 
    image: "/mnt/data/rehabilitation.jpg",
    description: "Recover from injuries with expert-guided therapy."
  },
  { 
    name: "Language Education", 
    image: "/mnt/data/lang_edu.jpg",
    description: "Learn new languages to communicate globally."
  },
  { 
    name: "Functional Training", 
    image: "/mnt/data/func training.jpg",
    description: "Enhance movement efficiency and prevent injuries."
  },
  { 
    name: "Financial Advice", 
    image: "/mnt/data/fin_adv.jpg",
    description: "Smart investments and financial planning for athletes."
  },
  { 
    name: "Individual Training", 
    image: "/mnt/data/indv_tra.jpg",
    description: "Personalized training programs to maximize potential."
  },
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
            <h3>{service.name}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/services")}>View All Services</button>
    </div>
  );
};

export default ServicesSection;

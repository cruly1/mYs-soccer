import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllExpertise } from "../services/api";
import "./ServicesSection.scss";

const ServicesSection = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getAllExpertise();
      setServices(data);
    };
    fetchServices();
  }, []);

  return (
    <div className="services-section">
      <h2>Our Services</h2>
      <div className="services-container">
        {services.slice(0, 3).map((service, index) => (
          <div key={index} className="service-card">
            <h3>{service.title}</h3>
            <p>{service.briefContent}</p>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/services")}>View All Services</button>
    </div>
  );
};

export default ServicesSection;

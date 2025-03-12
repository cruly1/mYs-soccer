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
       {services.length > 0 ? (
        <>
          <div className="services-container">
            {services.slice(0, 3).map((service, index) => (
              <div key={index} className="service-card">
                <h3>{service.title}</h3>
                <p>{service.briefContent}</p>
              </div>
            ))}
          </div>
          <button
            className="service-section-button"
            onClick={() => navigate("/services")}
          >
            View All Services
          </button>
        </>
      ) : (
        <p>No services available at the moment.</p>
      )}
    </div>
  );
};

export default ServicesSection;

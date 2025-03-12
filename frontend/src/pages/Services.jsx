import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { getAllExpertise } from "../services/api";
import "./Services.scss";

const Services = () => {
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
    <div className="services-page">
      {/* Background Image */}
      <div className="background-image"></div>
    
      {/* Navigation Buttons */}<div className="service-nav">
        <button className="home-btn" onClick={() => navigate("/")}>Home</button>
        
      </div>
      <h2>Our Services</h2>

      {/* Services List */}
      <div className="services-list">
        {services.length > 0 ? (
          services.map((service, index) => (
            <div key={index} className="service-item">
              <h3>{service.title}</h3>
              <p>{service.briefContent || "Click below to learn more."}</p>
              <button onClick={() => navigate(`/services/${service.title.replace(/\s+/g, "%20")}`)}>
                Learn More
              </button>
            </div>
          ))
        ) : (
          <p>Loading services...</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Services;

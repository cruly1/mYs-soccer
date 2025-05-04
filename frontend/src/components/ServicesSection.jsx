import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllExpertise } from "../services/api";
import "./ServicesSection.scss";

const ServicesSection = () => {
  const API_BASE_URL = "https://api.manageyself.com/api";
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [imageStatus, setImageStatus] = useState({});

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllExpertise();
        
        setServices(data);
      } catch (error) {
        
      }
    };
    fetchServices();
  }, []);

  const handleImageLoad = (serviceId) => {
    setImageStatus(prev => ({
      ...prev,
      [serviceId]: { loaded: true, error: false }
    }));
  };

  const handleImageError = (serviceId) => {
    setImageStatus(prev => ({
      ...prev,
      [serviceId]: { loaded: false, error: true }
    }));
  };

  const getImageUrl = (service) => {
    return service.imageName 
      ? `${API_BASE_URL}/images/downloadImage?fileName=${service.imageName}`
      : "/default_pic.png";
  };

  return (
    <div className="services-section">
      {services.length > 0 ? (
        <>
          <div className="services-container">
            {services.slice(0, 3).map((service, index) => {
              const serviceId = service.title || index;
              const imageUrl = getImageUrl(service);
              const isLoaded = imageStatus[serviceId]?.loaded || false;
              const hasError = imageStatus[serviceId]?.error || false;
              
              return (
                <div key={serviceId} className="service-card">
                  <div className="player-card__image-container">
                    {!isLoaded && !hasError && (
                      <div className="image-placeholder">Loading...</div>
                    )}
                    <img
                      src={imageUrl}
                      alt={service.title || "Service"}
                      className={`player-card__image ${isLoaded ? 'loaded' : ''}`}
                      loading="lazy"
                      width={300}
                      height={300}
                      onLoad={() => handleImageLoad(serviceId)}
                      onError={() => handleImageError(serviceId)}
                    />
                  </div>
                  <h3>{service.title || "Unnamed Service"}</h3>
                  <p>{service.briefContent || "No description available."}</p>
                </div>
              );
            })}
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
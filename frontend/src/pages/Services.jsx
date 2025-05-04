import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { getAllExpertise } from "../services/api";
import "./Services.scss";

const API_BASE_URL = "https://api.manageyself.com/api"; 

const Services = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [imageStatus, setImageStatus] = useState({});

  useEffect(() => {
  const fetchServices = async () => {
    try {
      const data = await getAllExpertise();
      const sorted = data.sort((a, b) => a.title.localeCompare(b.title));
      setServices(sorted);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  };
  fetchServices();
}, []);


  const handleImageLoad = (serviceId) => {
    setImageStatus((prev) => ({
      ...prev,
      [serviceId]: { loaded: true, error: false },
    }));
  };

  const handleImageError = (serviceId) => {
    setImageStatus((prev) => ({
      ...prev,
      [serviceId]: { loaded: false, error: true },
    }));
  };

  const getImageUrl = (service) => {
    return service.imageName
      ? `${API_BASE_URL}/images/downloadImage?fileName=${service.imageName}`
      : "/default_pic.png";
  };

  return (
    <div className="page-wrapper services-page">
      
      <div className="background-image"></div>

      <div className="service-nav">
        <button className="home-btn" onClick={() => navigate("/")}>
          Home
        </button>
      </div>

      <h2>Our Services</h2>

      
      <div className="services-list">
        {services.length > 0 ? (
          
            services.map((service, index) => {
              const serviceId = service.title || index;
              const imageUrl = getImageUrl(service);
              const isLoaded = imageStatus[serviceId]?.loaded || false;
              const hasError = imageStatus[serviceId]?.error || false;

              return (
                <div key={index} className="service-item">
                  <div className="player-card__image-container">
                    {!isLoaded && !hasError && (
                      <div className="image-placeholder">Loading...</div>
                    )}
                    <img
                      src={imageUrl}
                      alt={service.title || "Service"}
                      className={`player-card__image ${
                        isLoaded ? "loaded" : ""
                      }`}
                      loading="lazy"
                      width={300}
                      height={300}
                      onLoad={() => handleImageLoad(serviceId)}
                      onError={() => handleImageError(serviceId)}
                    />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.briefContent || "Click below to learn more."}</p>
                  <button
                    onClick={() =>
                      navigate(
                        `/services/${service.title.replace(/\s+/g, "%20")}`
                      )
                    }
                  >
                    Learn More
                  </button>
                </div>
              );
            })
          
        ) : (
          <p>Loading services...</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Services;

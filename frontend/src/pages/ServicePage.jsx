import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExpertiseByTitle, downloadImage } from "../services/api";
import { API_BASE_URL } from "../services/config.js";
import "./ServicePage.scss";

const ServicePage = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [error, setError] = useState(false);
  const [trainerImages, setTrainerImages] = useState({});

  useEffect(() => {
    const fetchService = async () => {
      try {
        const apiService = await getExpertiseByTitle(title);
        if (apiService) {
          setService(apiService);
          
          
          if (apiService.trainers && apiService.trainers.length > 0) {
            const imagePromises = apiService.trainers.map(trainer => {
              if (trainer.imageName) {
                return downloadImage(trainer.imageName)
                  .then(url => ({ name: trainer.name, url }))
                  .catch(() => null);
              }
              return Promise.resolve(null);
            });

            Promise.all(imagePromises).then(results => {
              const loadedImages = {};
              results.forEach(result => {
                if (result) {
                  loadedImages[result.name] = result.url;
                }
              });
              setTrainerImages(loadedImages);
            });
          }
        } else {
          setError(true);
        }
      } catch (error) {
        
        setError(true);
      }
    };

    fetchService();
  }, [title]);

  if (error) {
    return (
      <div className="service-page">
        <h1>Service Not Found</h1>
        <p>The service "{title}" does not exist. Please check back later.</p>
        <button onClick={() => navigate("/services")}>Go to Services</button>
      </div>
    );
  }

  if (!service) return <div className="loading">Loading...</div>;

  return (
    <div className="service-page">
      <div className="background-image"></div>
      <div className="service-nav">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/services")}>Back to Services</button>
      </div>

      <h1>{service.title}</h1>

      <div className="service-introduction">
        <p>{service.content}</p>
      </div>

      {service.study && service.study.length > 0 && (
        <div className="topics-section">
          <h2>What You'll Learn</h2>
          <ul>
            {Array.isArray(service.study)
              ? service.study.map((topic, index) => <li key={index}>{topic}</li>)
              : service.study.split(",").map((topic, index) => <li key={index}>{topic.trim()}</li>)}
          </ul>
        </div>
      )}

     
      {service.trainers && service.trainers.length > 0 && (
        <div className="trainers-section">
          <h2>Meet Our Experts</h2>
          <div className="trainers-container">
            {service.trainers.map((trainer, index) => {
              const imageUrl = trainer.imageName 
                ? trainerImages[trainer.name] || `${API_BASE_URL}/images/downloadImage?fileName=${trainer.imageName}`
                : "/default_pic.png";

              return (
                <div key={index} className="trainer-card">
                  <div className="trainer-image-container">
                    <img
                      loading="lazy"
                      src={imageUrl}
                      alt={trainer.name}
                      className="trainer-image"
                      width={200}
                      height={200}
                      onError={(e) => {
                        e.target.src = "/default_pic.png";
                        e.target.onerror = null;
                      }}
                    />
                  </div>
                  <div className="trainer-info">
                    <h3>{trainer.name}</h3>
                    <p>{trainer.briefContent}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicePage;

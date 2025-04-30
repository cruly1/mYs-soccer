import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExpertiseByTitle, downloadImage } from "../services/api";
import "./ServicePage.scss";

const ServicePage = () => {
  // VPS CONFIG const API_BASE_URL = "http://128.140.102.156:8080/api";
  const API_BASE_URL = "http://localhost:8080/api";
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
          
          // Preload trainer images
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
        console.error("Error fetching service:", error);
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
      {/* Navigation Buttons */}
      <div className="background-image"></div>
      <div className="service-nav">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/services")}>Back to Services</button>
      </div>

      {/* Service Title */}
      <h1>{service.title}</h1>

      {/* Service Introduction */}
      <div className="service-introduction">
        <p>{service.content}</p>
      </div>

      {/* Topics Section */}
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

      {/* Trainers Section */}
      {service.trainers && service.trainers.length > 0 && (
        <div className="trainers-section">
          <h2>Meet Our Experts</h2>
          <div className="trainers-container">
            {service.trainers.map((trainer, index) => {
              const imageUrl = trainer.imageName 
                ? trainerImages[trainer.name] || `${API_BASE_URL}/images/downloadImage?fileName=${trainer.imageName}`
                : "/default-trainer.jpg";

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
                        e.target.src = "/default-trainer.jpg";
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

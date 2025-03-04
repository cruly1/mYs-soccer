import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExpertiseByTitle } from "../services/api";
import "./ServicePage.scss";

const ServicePage = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const apiService = await getExpertiseByTitle(title);
        if (apiService) {
          setService(apiService);
          console.log("Service fetched:", apiService);
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
        <button onClick={() => navigate("/")}>🏠 Home</button>
        <button onClick={() => navigate("/services")}>📜 Back to Services</button>
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
            {Array.isArray(service.study) // Ensure it's an array
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
            {service.trainers.map((trainer, index) => (
              <div key={index} className="trainer-card">
                <img src={trainer.image || `${process.env.PUBLIC_URL}/default-trainer.jpg`} alt={trainer.name} />
                <h3>{trainer.name}</h3>
                <p>{trainer.briefContent}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicePage;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./ServiceTemplate.scss";

const ServiceTemplate = ({ title, description, topics, trainers, testimonials }) => {
    const navigate = useNavigate();
    return (
    
    <div className="service-page">
      <button className="home-btn" onClick={() => { navigate("/"); }}>
        Home
      </button>
      <button className="home-btn" onClick={() => { navigate("/services"); }}>
        Take me back to the services
      </button>
      {/* Service Title */}
      <h1>{title}</h1>

      {/* Service Introduction */}
      <div className="service-introduction">
        <p>{description}</p>
      </div>
    <div
        className="background-image"
      ></div>
      {/* Topics Section */}
      {topics && topics.length > 0 && (
        <div className="topics-section">
          <h2>What You'll Learn</h2>
          <ul>
            {topics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Trainers Section */}
      {trainers && trainers.length > 0 && (
        <div className="trainers-section">
          <h2>Meet Our Experts</h2>
          <div className="trainers-container">
            {trainers.map((trainer, index) => (
              <div key={index} className="trainer-card">
                <img src={trainer.image} alt={trainer.name} />
                <h3>{trainer.name}</h3>
                <p>{trainer.bio}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
    </div>
    
  );
};

export default ServiceTemplate;

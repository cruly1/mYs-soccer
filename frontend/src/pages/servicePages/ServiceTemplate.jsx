import React from "react";
import "./ServiceTemplate.scss";

const ServiceTemplate = ({ title, description, topics, trainers, testimonials }) => {
  return (
    <div className="service-page">
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

      {/* Testimonials Section */}
      {testimonials && testimonials.length > 0 && (
        <div className="testimonials-section">
          <h2>What Our Clients Say</h2>
          <div className="testimonials-container">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <p>"{testimonial.feedback}"</p>
                <h4>- {testimonial.name}</h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceTemplate;

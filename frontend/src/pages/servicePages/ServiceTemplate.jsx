import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExpertiseByTitle } from "../../services/api";
import "./ServiceTemplate.scss";

// 🔹 Predefined services (backup if not in API)
const predefinedServices = [
  { title: "Mental Coach", briefContent: "Improve mental resilience and performance under pressure.", content: "Mental coaching helps players..." },
  { title: "Marketing", briefContent: "Boost your personal brand and sponsorship deals.", content: "Our marketing experts will..." },
  { title: "Nutrition", briefContent: "Personalized meal plans for peak athletic performance.", content: "A well-balanced diet is key..." },
  { title: "Rehabilitation", briefContent: "Recover from injuries with professional support.", content: "Rehabilitation ensures..." },
  { title: "Language Education", briefContent: "Learn new languages to boost communication on and off the field.", content: "Speaking multiple languages..." },
  { title: "Functional Training", briefContent: "Enhance strength, flexibility, and endurance for better performance.", content: "Functional training is..." },
  { title: "Financial Advice", briefContent: "Smart financial planning for long-term stability.", content: "Our financial advisors help you..." },
  { title: "Individual Training", briefContent: "One-on-one sessions to refine your skills and techniques.", content: "Personalized training sessions..." }
];


const ServiceTemplate = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      const apiService = await getExpertiseByTitle(title);

      if (apiService) {
        setService(apiService);
      } else {
        // 🔹 Use predefined service as fallback
        const predefinedService = predefinedServices.find((s) => s.title.toLowerCase() === title.toLowerCase());
        if (predefinedService) {
          setService(predefinedService);
        } else {
          setService(null); // Shows "Service Not Found" if nothing matches
        }
      }
    };

    fetchService();
  }, [title]);

  if (error) {
    return (
      <div className="service-page">
        <h1>Service Not Found</h1>
        <p>The service "{title}" does not exist. Check back later or select another service.</p>
        <button onClick={() => navigate("/services")}>Go to Services</button>
      </div>
    );
  }

  if (!service) return <div className="loading">Loading...</div>;

  return (
    <div className="service-page">
      {/* Navigation Buttons */}
      <div className="service-nav">
        <button onClick={() => navigate("/")}>🏠 Home</button>
        <button onClick={() => navigate("/services")}>📜 Back to Services</button>
      </div>

      {/* Service Title */}
      <h1>{service.title}</h1>

      {/* Service Introduction */}
      <div className="service-introduction">
        <p>{service.briefContent}</p>
      </div>

      {/* Background Image */}
      <div className="background-image"></div>

      {/* Topics Section */}
      {service.topics && service.topics.length > 0 && (
        <div className="topics-section">
          <h2>What You'll Learn</h2>
          <ul>
            {service.topics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
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

export default ServiceTemplate;

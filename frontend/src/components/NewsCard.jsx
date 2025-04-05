import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewsCard.scss';

const NewsCard = ({ title, postDate, briefContent, imageName }) => {
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:8080/api";
   const [imageLoaded, setImageLoaded] = useState(false);

  // Construct the image URL
  const imageUrl = imageName 
    ? `${API_BASE_URL}/images/downloadImage?fileName=${imageName}`
    : "/default-news.jpg";

   return (
    <div className="news-card">
      {/* Image with error handling */}
      <div className="news-card__image-container">
        <img
          loading="lazy"
          src={imageUrl}
          alt={title}
          className="news-card__image"
          width={400}
          height={200}
          onLoad={() => setImageLoaded(true)}
          
          onError={(e) => {
            
            e.target.onerror = null; // Prevent infinite loop if default image fails
          }}
        />
      </div>

      {/* Content */}
      <div className="news-card__content">
        <span className="news-card__date">{new Date(postDate).toLocaleDateString()}</span>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__brief">{briefContent}</p>

        {/* Read More Button */}
        <button 
          className="news-card__button" 
          onClick={() => navigate(`/news/${encodeURIComponent(title)}`)}
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default NewsCard;

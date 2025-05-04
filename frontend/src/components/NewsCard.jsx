import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewsCard.scss';

const NewsCard = ({ title, postDate, briefContent, imageName }) => {
  const navigate = useNavigate();

  const API_BASE_URL = "https://api.manageyself.com/api";
  const [imageLoaded, setImageLoaded] = useState(false);

  
  const imageUrl = imageName 
    ? `${API_BASE_URL}/images/downloadImage?fileName=${imageName}`
    : "/default_pic.png";

   return (
    <div className="news-card">
      
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
            
            e.target.onerror = null; 
          }}
        />
      </div>

      
      <div className="news-card__content">
        <span className="news-card__date">{new Date(postDate).toLocaleDateString()}</span>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__brief">{briefContent}</p>

       
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

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NewsCard.scss';

const NewsCard = ({ title, postDate, briefContent, imageName }) => {
  const navigate = useNavigate();

  return (
    <div className="news-card">
      {/* Image */}
      <div className="news-card__image" style={{ backgroundImage: `url(${imageName || "/default-news.jpg"})` }}></div>

      {/* Content */}
      <div className="news-card__content">
        <span className="news-card__date">{new Date(postDate).toDateString()}</span>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__brief">{briefContent}</p>

        {/* Read More Button */}
        <button className="news-card__button" onClick={() => navigate(`/news/${title}`)}>
          Read More
        </button>
      </div>
    </div>
  );
};

export default NewsCard;

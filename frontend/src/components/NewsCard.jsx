import React from "react";
import "./NewsCard.scss";

const NewsCard = ({ title, date, excerpt, image, link }) => {
  return (
    <div className="news-card">
      <a href={link} className="news-card__card-link"></a>
      <img src={image} alt={title} className="news-card__image" />
      <div className="news-card__text-wrapper">
        <h2 className="news-card__title">{title}</h2>
        <div className="news-card__post-date">{date}</div>
        <div className="news-card__details-wrapper">
          <p className="news-card__excerpt">{excerpt}</p>
          <a href={link} className="news-card__read-more">
            Read more <i className="fas fa-long-arrow-alt-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;

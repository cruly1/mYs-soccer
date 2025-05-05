import React, { useState } from "react";
import { API_BASE_URL } from "../services/config.js";
import "./PlayerCard.scss";

const PlayerCard = ({ name, imageName, team, club, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const imageUrl = imageName 
    ? `${API_BASE_URL}/images/downloadImage?fileName=${imageName}`
    : "/default_pic.png";

  return (
    <div className="player-card" onClick={onClick}>
      <div className="player-card__image-container">
        {!imageLoaded && !imageError && (
          <div className="image-placeholder">Loading...</div>
        )}
        <img
          src={imageUrl}
          alt={name}
          className={`player-card__image ${imageLoaded ? 'loaded' : ''}`}
          loading="lazy"
          width={300}
          height={300}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      </div>
      <div className="player-card__text-wrapper">
        <h2 className="player-card__name">{name}</h2>
        <p className="player-card__position">{team}</p>
        <p className="player-card__club">{club}</p>
      </div>
    </div>
  );
};

export default PlayerCard;

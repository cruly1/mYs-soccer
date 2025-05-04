import React, { useState } from "react";
import "./PlayerModal.scss";

const PlayerModal = ({ player, onClose }) => {
//  const API_BASE_URL = "http://128.140.102.156:8080/api";
  const API_BASE_URL = "https://api.manageyself.com/api";
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const imageUrl = player.imageName 
    ? `${API_BASE_URL}/images/downloadImage?fileName=${player.imageName}`
    : "/default_pic.png";

  return (
    <div className="player-modal" onClick={onClose}>
      <div className="player-modal__content" onClick={e => e.stopPropagation()}>
        <button className="player-modal__close" onClick={onClose}>
          &times;
        </button>
        
        <div className="player-modal__image-container">
          {!imageLoaded && !imageError && (
            <div className="image-placeholder">Loading player image...</div>
          )}
          <img
            src={imageUrl}
            alt={player.name}
            className={`player-modal__image ${imageLoaded ? 'loaded' : ''}`}
            width={400}
            height={400}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        </div>

        <div className="player-modal__details">
          <h2 className="player-modal__name">{player.name}</h2>
          
          <div className="player-modal__info-grid">
            <div className="player-modal__info-item">
              <strong>Position:</strong>
              <span>{player.position}</span>
            </div>
            
            <div className="player-modal__info-item">
              <strong>Team:</strong>
              <span>{player.team || "No team"}</span>
            </div>
            
            <div className="player-modal__info-item">
              <strong>Birthdate:</strong>
              <span>{new Date(player.dateOfBirth).toLocaleDateString()}</span>
            </div>
            
            <div className="player-modal__info-item">
              <strong>Place of Birth:</strong>
              <span>{player.placeOfBirth || "N/A"}</span>
            </div>
            
            <div className="player-modal__info-item">
              <strong>Height:</strong>
              <span>{player.heightInCm} cm</span>
            </div>
            
            <div className="player-modal__info-item">
              <strong>Weight:</strong>
              <span>{player.weightInKg} kg</span>
            </div>
            
            <div className="player-modal__info-item">
              <strong>Slogan:</strong>
              <span>{player.slogan || "No slogan yet"}</span>
            </div>
            
            <div className="player-modal__info-item">
              <strong>Preferred Leg:</strong>
              <span>{player.leg}</span>
            </div>

            {player.bio && (
              <div className="player-modal__bio">
                <strong>Bio:</strong>
                <p>{player.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerModal;

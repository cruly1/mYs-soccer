import React from "react";
import "./PlayerModal.scss";

const PlayerModal = ({ player, onClose }) => {
  return (
    <div className="player-modal">
      <div className="player-modal__content">
        <button className="player-modal__close" onClick={onClose}>
          &times;
        </button>
        <img src={player.image} alt={player.name} className="player-modal__image" />
        <h2>{player.name}</h2>
        <p><strong>Position:</strong> {player.position}</p>
        <p><strong>Club:</strong> {player.club}</p>
        <p><strong>Birthdate:</strong> {player.birthdate}</p>
      </div>
    </div>
  );
};

export default PlayerModal;

import React from "react";
import "./PlayerCard.scss";

const PlayerCard = ({ name, image, position, club, onClick }) => {
  return (
    <div className="player-card" onClick={onClick}>
      <img src={image} alt={name} className="player-card__image" />
      <div className="player-card__text-wrapper">
        <h2 className="player-card__name">{name}</h2>
        <p className="player-card__position">{position}</p>
        <p className="player-card__club">{club}</p>
      </div>
    </div>
  );
};

export default PlayerCard;

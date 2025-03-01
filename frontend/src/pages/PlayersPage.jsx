import React, { useState } from "react";
import PlayerCard from "../components/PlayerCard";
import PlayerModal from "../components/PlayerModal";
import Footer from "../components/Footer";
import "./PlayersPage.scss";

const players = [
  { name: "Cristiano Ronaldo", position: "Forward", club: "Al-Nassr", image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg", birthdate: "Feb 5, 1985" },
];

const PlayersPage = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  return (
    <div className="players-page">
    <div
        className="background-image"
      ></div>
      <h2>All Players</h2>
      <div className="players-grid">
        {players.map((player, index) => (
          <PlayerCard key={index} {...player} onClick={() => setSelectedPlayer(player)} />
        ))}
      </div>

      {selectedPlayer && <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />}
        <Footer />
    </div>
  );
};

export default PlayersPage;

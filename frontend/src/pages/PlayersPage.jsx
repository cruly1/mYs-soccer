import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlayerCard from "../components/PlayerCard";
import PlayerModal from "../components/PlayerModal";
import Footer from "../components/Footer";
import { getAllPlayers } from "../services/api";
import "./PlayersPage.scss";

const PlayersPage = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await getAllPlayers();
      setPlayers(data);
    };

    fetchPlayers();
  }, []);

  return (
    <div className="players-page">
      <button className="home-btn" onClick={() => navigate("/")}>
        Home
        </button>
      <div className="background-image"></div>
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

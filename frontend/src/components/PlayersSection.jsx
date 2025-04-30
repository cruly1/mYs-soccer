import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PlayerCard from "./PlayerCard";
import PlayerModal from "./PlayerModal";
import { getFirstFourPlayers } from "../services/api";
import "./PlayersSection.scss";

const PlayersSection = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await getFirstFourPlayers();
      setPlayers(data);
      //console.log("Fetched players:", data);
    };

    fetchPlayers();
  }, []);

  return (
    <div className="players-wrapper">
       {players.length > 0 ? (
        <>
          {/* Row for Player Cards */}
          <div className="players-row">
            {players.map((player, index) => (
              <PlayerCard
                key={index}
                {...player}
                onClick={() => setSelectedPlayer(player)}
              />
            ))}
          </div>

          {/* Animated Modal */}
          <AnimatePresence>
            {selectedPlayer && (
              <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
            )}
          </AnimatePresence>

          {/* View All Players Button */}
          <button className="view-all-players-btn" onClick={() => navigate("/players")}>
            View All Players
          </button>
        </>
      ) : (
        <p>No players available at the moment.</p>
      )}
    </div>
  );
};

export default PlayersSection;

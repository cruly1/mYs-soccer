import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PlayerCard from "./PlayerCard";
import PlayerModal from "./PlayerModal";
import "./PlayersSection.scss";

const playersData = [
  {
    name: "Cristiano Ronaldo",
    position: "Forward",
    club: "Al-Nassr",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
    birthdate: "February 5, 1985",
  },
  {
    name: "Cristiano Ronaldo",
    position: "Forward",
    club: "Al-Nassr",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
    birthdate: "February 5, 1985",
  },
  {
    name: "Cristiano Ronaldo",
    position: "Forward",
    club: "Al-Nassr",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
    birthdate: "February 5, 1985",
  },
  {
    name: "Cristiano Ronaldo",
    position: "Forward",
    club: "Al-Nassr",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
    birthdate: "February 5, 1985",
  },
];

const PlayersSection = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="players-wrapper">
      {/* Row for Player Cards */}
      <div className="players-row">
        {playersData.slice(0, 4).map((player, index) => (
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
    </div>
  );
};

export default PlayersSection;

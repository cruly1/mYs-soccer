import React, { useState } from "react";
import PlayerCard from "./PlayerCard";
import PlayerModal from "./PlayerModal"; // Modal to show player details
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
    name: "Lionel Messi",
    position: "Forward",
    club: "Inter Miami",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
    birthdate: "June 24, 1987",
  },
  {
    name: "Neymar Jr.",
    position: "Forward",
    club: "Al-Hilal",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
    birthdate: "February 5, 1992",
  },
  {
    name: "Kevin De Bruyne",
    position: "Midfielder",
    club: "Manchester City",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
    birthdate: "June 28, 1991",
  },
];

const PlayersSection = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  return (
    <div className="players-wrapper">
      {playersData.slice(0, 4).map((player, index) => (
        <PlayerCard
          key={index}
          {...player}
          onClick={() => setSelectedPlayer(player)}
        />
      ))}

      {/* Player Modal */}
      {selectedPlayer && (
        <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
      )}
    </div>
  );
};

export default PlayersSection;

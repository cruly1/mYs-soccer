import React, { useState } from "react";
import { motion } from "framer-motion";

const Owners = () => {
  const [owner, setOwner] = useState(0);
  const ownersData = [
    {
      name: "Owner 1",
      image: "owner1.jpg",
      description: "Experienced in managing soccer teams...",
    },
    {
      name: "Owner 2",
      image: "owner2.jpg",
      description: "Focused on the financial growth of the club...",
    },
  ];

  return (
    <motion.div
      className="owners-page"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
    >
      <div className="owner-info">
        <img src={ownersData[owner].image} alt={ownersData[owner].name} />
        <h2>{ownersData[owner].name}</h2>
        <p>{ownersData[owner].description}</p>
        <button onClick={() => setOwner((prev) => (prev === 0 ? 1 : 0))}>
          {owner === 0 ? "Next Owner" : "Previous Owner"}
        </button>
      </div>
    </motion.div>
  );
};

export default Owners;

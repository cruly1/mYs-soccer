import React, { useState } from "react";
import "./Navbar.scss";

const Navbar = ({ setActiveSection }) => {
  const [active, setActive] = useState("NEWS"); // ✅ Default active section

  const handleClick = (section) => {
    setActive(section);
    setActiveSection(section); // ✅ Set the active section globally
  };

  return (
    <div className="navbar">
      {["NEWS", "PLAYERS", "SERVICES", "ABOUT US", "CONTACT"].map((section) => (
        <button
          key={section}
          className={active === section ? "active" : ""}
          onClick={() => handleClick(section)}
        >
          {section}
        </button>
      ))}
    </div>
  );
};

export default Navbar;

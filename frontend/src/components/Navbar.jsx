import React, { useState } from "react";
import "./Navbar.scss";

const Navbar = ({ setActiveSection }) => {
  const [active, setActive] = useState("NEWS");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (section) => {
    setActive(section);
    setActiveSection(section);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
    <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
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
    </nav>
  );
};

export default Navbar;

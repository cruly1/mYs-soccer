import React, { useState } from "react";
import "./Navbar.scss";

const Navbar = ({ setActiveSection }) => {
  const [active, setActive] = useState("NEWS"); // ✅ Default active section
  const [menuOpen, setMenuOpen] = useState(false); // ✅ Track mobile menu state

  const handleClick = (section) => {
    setActive(section);
    setActiveSection(section); // ✅ Set the active section globally
    setMenuOpen(false); // ✅ Close menu after selection
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

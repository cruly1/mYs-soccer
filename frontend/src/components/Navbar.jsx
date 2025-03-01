import React from "react";
import "./Navbar.scss";

const Navbar = ({ setActiveSection }) => {
  return (
    <div className="navbar">
      {["NEWS", "PLAYERS", "SERVICES", "ABOUT US", "CONTACT"].map((item) => (
        <button key={item} onClick={() => setActiveSection(item)}>
          {item}
        </button>
      ))}
    </div>
  );
};

export default Navbar;

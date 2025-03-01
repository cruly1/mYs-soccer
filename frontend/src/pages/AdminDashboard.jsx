import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPlayer, addNews } from "../services/api"; // We'll create these API functions next
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [player, setPlayer] = useState({ name: "", dateOfBirth: "", position: "CSATAR" });
  const [news, setNews] = useState({ title: "", postDate: "", briefContent: "", content: "" });

  // Check if user is authenticated
  if (!localStorage.getItem("isAuthenticated")) {
    navigate("/"); // Redirect if not logged in
    return null;
  }

  // Handle adding a player
  const handleAddPlayer = async () => {
    await addPlayer(player);
    alert("Player added successfully!");
  };

  // Handle adding news
  const handleAddNews = async () => {
    await addNews(news);
    alert("News added successfully!");
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Panel</h2>
      
      <div className="form-section">
        <h3>Add Player</h3>
        <input type="text" placeholder="Name" onChange={(e) => setPlayer({ ...player, name: e.target.value })} />
        <input type="date" onChange={(e) => setPlayer({ ...player, dateOfBirth: e.target.value })} />
        <select className="dropdown" onChange={(e) => setPlayer({ ...player, position: e.target.value })} value={player.position}>
          <option value="CSATAR">CSATAR</option>
          <option value="KAPUS">KAPUS</option>
          <option value="VEDO">VEDO</option>
        </select>
        <button onClick={handleAddPlayer}>Add Player</button>
      </div>

      <div className="form-section">
        <h3>Add News</h3>
        <input type="text" placeholder="Title" onChange={(e) => setNews({ ...news, title: e.target.value })} />
        <input type="date" onChange={(e) => setNews({ ...news, postDate: e.target.value })} />
        <textarea placeholder="Brief Content" onChange={(e) => setNews({ ...news, briefContent: e.target.value })}></textarea>
        <textarea placeholder="Full Content" onChange={(e) => setNews({ ...news, content: e.target.value })}></textarea>
        <button onClick={handleAddNews}>Add News</button>
      </div>

      <button className="logout-btn" onClick={() => { localStorage.removeItem("isAuthenticated"); navigate("/"); }}>
        Home
      </button>
    </div>
  );
};

export default AdminDashboard;

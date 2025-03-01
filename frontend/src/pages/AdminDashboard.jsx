import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllPlayers,
  deletePlayer,
  updatePlayer,
  getAllNews,
  deleteNews,
  updateNews,
  addPlayer,
  addNews,
} from "../services/api"; // We'll create these API functions next
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [player, setPlayer] = useState({ name: "", dateOfBirth: "", position: "CSATAR" });
  const [news, setNews] = useState({ title: "", postDate: "", briefContent: "", content: "" });
  const [players, setPlayers] = useState([]);
  const [somethingNews, setSomethingNews] = useState([]);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [editingNews, setEditingNews] = useState(null);

  

  

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

  

  const fetchPlayers = async () => {
    const data = await getAllPlayers();
    setPlayers(data);
  };

  const fetchNews = async () => {
    const data = await getAllNews();
    setSomethingNews(data);
  };

  const handleDeletePlayer = async (name) => {
    await deletePlayer(name);
    fetchPlayers(); // Refresh the list
  };

  const handleDeleteNews = async (title) => {
    await deleteNews(title);
    fetchNews(); // Refresh the list
  };

  


  const handleUpdatePlayer = async () => {
  if (editingPlayer) {
    try {
      await updatePlayer(editingPlayer.originalName, editingPlayer); // ✅ Send original name
      setEditingPlayer(null);
      fetchPlayers(); // ✅ Refresh only after saving, not while typing
    } catch (error) {
      alert("Error updating player. Please try again.");
    }
  }
};

const handleUpdateNews = async () => {
  if (editingNews) {
    try {
      await updateNews(editingNews.originalTitle, editingNews); // ✅ Send original title
      setEditingNews(null);
      fetchNews(); // ✅ Refresh only after saving, not while typing
    } catch (error) {
      alert("Error updating news. Please try again.");
    }
  }
};


const handleEditPlayer = (player) => {
  setEditingPlayer({ ...player, originalName: player.name }); // ✅ Stores original name
};

const handleEditNews = (newsItem) => {
  setEditingNews({ ...newsItem, originalTitle: newsItem.title }); // ✅ Stores original title
};


useEffect(() => {
    fetchPlayers();
    fetchNews();
  }, []);
  // Check if user is authenticated
  if (!localStorage.getItem("isAuthenticated")) {
    navigate("/"); // Redirect if not logged in
    return null;
  }

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

      {/* Players Management */}
    <div className="management-section">
    <h3>Manage Players</h3>
    {players.map((player, index) => (
        <div key={index} className="admin-item">
        {editingPlayer && editingPlayer.originalName === player.name ? ( // ✅ Compare with stored original name
            <>
            <input
                type="text"
                value={editingPlayer.name}
                onChange={(e) => setEditingPlayer({ ...editingPlayer, name: e.target.value })}
            />
            <input
                type="date"
                value={editingPlayer.dateOfBirth}
                onChange={(e) => setEditingPlayer({ ...editingPlayer, dateOfBirth: e.target.value })}
            />
            <select
                value={editingPlayer.position}
                onChange={(e) => setEditingPlayer({ ...editingPlayer, position: e.target.value })}
            >
                <option value="CSATAR">CSATAR</option>
                <option value="KAPUS">KAPUS</option>
                <option value="VEDO">VEDO</option>
            </select>
            <button onClick={handleUpdatePlayer}>Save</button>
            <button onClick={() => setEditingPlayer(null)}>Cancel</button>
            </>
        ) : (
            <>
            <span>{player.name} - {player.position} - {player.dateOfBirth}</span>
            <button onClick={() => handleEditPlayer(player)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDeletePlayer(player.name)}>Delete</button>
            </>
        )}
        </div>
    ))}
    </div>



   {/* News Management */}
<div className="management-section">
  <h3>Manage News</h3>
  {somethingNews.map((newsItem, index) => (
    <div key={index} className="admin-item">
      {editingNews && editingNews.originalTitle === newsItem.title ? ( // ✅ Compare with stored original title
        <>
          <input
            type="text"
            value={editingNews.title}
            onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
          />
          <input
            type="date"
            value={editingNews.postDate}
            onChange={(e) => setEditingNews({ ...editingNews, postDate: e.target.value })}
          />
          <textarea
            value={editingNews.briefContent}
            onChange={(e) => setEditingNews({ ...editingNews, briefContent: e.target.value })}
          ></textarea>
          <textarea
            value={editingNews.content}
            onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value })}
          ></textarea>
          <button onClick={handleUpdateNews}>Save</button>
          <button onClick={() => setEditingNews(null)}>Cancel</button>
        </>
      ) : (
        <>
          <span>{newsItem.title} - {newsItem.postDate}</span>
          <button onClick={() => handleEditNews(newsItem)}>Edit</button>
          <button className="delete-btn" onClick={() => handleDeleteNews(newsItem.title)}>Delete</button>
        </>
      )}
    </div>
  ))}
</div>




      <button className="logout-btn" onClick={() => { localStorage.removeItem("isAuthenticated"); navigate("/"); }}>
        Home
      </button>
    </div>
  );
};

export default AdminDashboard;

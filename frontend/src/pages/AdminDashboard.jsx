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
  getAllExpertise,
  createExpertise,
  updateExpertise,
  deleteExpertise,
  createTrainer,
  deleteTrainer,
  createStudies
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
  const [expertiseList, setExpertiseList] = useState([]);
  const [expertise, setExpertise] = useState({ title: "", briefContent: "", content: "" });
  const [editingExpertise, setEditingExpertise] = useState(null);
  const [trainer, setTrainer] = useState({ name: "", briefContent: "" });
  const [selectedExpertise, setSelectedExpertise] = useState(""); // For trainer assignment
  const [newService, setNewService] = useState({
  title: "",
  briefContent: "",
  content: "",
  studies: [],
});
const [studyInput, setStudyInput] = useState(""); // For individual study inputs


  

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

   const fetchExpertise = async () => {
    const data = await getAllExpertise();
    console.log(data);
    setExpertiseList(data);
  };

  const handleAddExpertise = async () => {
    await createExpertise(expertise);
    fetchExpertise();
  };

  const handleUpdateExpertise = async () => {
  if (editingExpertise) {
    try {
      await updateExpertise(editingExpertise.originalTitle, {
        title: editingExpertise.title,
        briefContent: editingExpertise.briefContent, // ✅ Send correct `briefContent`
        content: editingExpertise.content, // ✅ Send correct `content`
      });

      setEditingExpertise(null);
      fetchExpertise();
      
    } catch (error) {
      console.error("Error updating expertise:", error);
      alert("Failed to update expertise. Please check your input.");
    }
  }
};



  const handleDeleteExpertise = async (title) => {
    await deleteExpertise(title);
    fetchExpertise();
  };

   const handleAddTrainer = async () => {
    if (!selectedExpertise) {
      alert("Please select an expertise to assign the trainer to.");
      return;
    }
    await createTrainer(selectedExpertise, trainer);
    fetchExpertise();
  };

  const handleDeleteTrainer = async (title, name) => {
    await deleteTrainer(title, name);
    fetchExpertise();
  };

  const handleEditExpertise = (exp) => {
  console.log("Editing Expertise Before Setting:", exp); // ✅ Check what data we are setting

  setEditingExpertise({
    ...exp,
    originalTitle: exp.title, 
    briefContent: exp.briefContent || "", // ✅ Ensure values are correct
    content: exp.content || "", // ✅ Ensure values are correct
  });
};


const handleAddService = async () => {
  try {
    // Step 1: Create the service
    const createdService = await createExpertise({
      title: newService.title,
      briefContent: newService.briefContent,
      content: newService.content,
    });

    // Step 2: If the service is created and studies exist, add them
    if (createdService && newService.studies.length > 0) {
      await createStudies(newService.title, newService.studies);
    }

    alert("Service added successfully!");
    fetchExpertise(); // Refresh the list
    setNewService({ title: "", briefContent: "", content: "", studies: [] }); // Reset form
    setStudyInput(""); // Reset study input
  } catch (error) {
    console.error("Error adding service:", error);
    alert("Failed to add service. Please check your input.");
  }
};

useEffect(() => {
    fetchPlayers();
    fetchNews();
    fetchExpertise();
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

      {/* Add Service */}
<div className="form-section">
  <h3>Add Service</h3>
  <input
    type="text"
    placeholder="Service Title"
    value={newService.title}
    onChange={(e) => setNewService({ ...newService, title: e.target.value })}
  />
  <textarea
    placeholder="Brief Content"
    value={newService.briefContent}
    onChange={(e) => setNewService({ ...newService, briefContent: e.target.value })}
  ></textarea>
  <textarea
    placeholder="Full Content"
    value={newService.content}
    onChange={(e) => setNewService({ ...newService, content: e.target.value })}
  ></textarea>

  {/* Studies Input */}
  <div className="study-input">
    <input
      type="text"
      placeholder="Enter Study Topic"
      value={studyInput}
      onChange={(e) => setStudyInput(e.target.value)}
    />
    <button onClick={() => {
      if (studyInput.trim() !== "") {
        setNewService({ ...newService, studies: [...newService.studies, studyInput] });
        setStudyInput(""); // Reset input field
      }
    }}>
      Add Study
    </button>
  </div>

  {/* Show Added Studies */}
  <ul>
    {newService.studies.map((study, index) => (
      <li key={index}>{study}</li>
    ))}
  </ul>

  {/* Create Service Button (Now adds studies too) */}
  <button onClick={handleAddService}>Create Service</button>
</div>


      {/* Add Trainer */}
      <div className="form-section">
        <h3>Add Trainer</h3>
        <select onChange={(e) => setSelectedExpertise(e.target.value)}>
          <option value="">Select Service</option>
          {expertiseList.map((exp) => (
            <option key={exp.title} value={exp.title}>{exp.title}</option>
          ))}
        </select>
        <input type="text" placeholder="Trainer Name" onChange={(e) => setTrainer({ ...trainer, name: e.target.value })} />
        <textarea placeholder="Trainer Bio" onChange={(e) => setTrainer({ ...trainer, briefContent: e.target.value })}></textarea>
        <button onClick={handleAddTrainer}>Add Trainer</button>
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
      <div className="management-section">
  <h3>Manage Services</h3>
  {expertiseList.map((exp, index) => (
    <div key={index} className="admin-item">
      {editingExpertise && editingExpertise.originalTitle === exp.title ? ( // ✅ Track by original title
        <>
          <input
            type="text"
            value={editingExpertise.title}
            onChange={(e) => setEditingExpertise({ ...editingExpertise, title: e.target.value })}
          />
          <textarea
            value={editingExpertise.briefContent}
            onChange={(e) => setEditingExpertise({ ...editingExpertise, briefContent: e.target.value })}
          ></textarea>
          <textarea
            value={editingExpertise.content}
            onChange={(e) => setEditingExpertise({ ...editingExpertise, content: e.target.value })}
          ></textarea>

          {/* Display Trainers */}
          <div className="trainers-list">
            <h4>Assigned Trainers:</h4>
            {editingExpertise.trainers && editingExpertise.trainers.length > 0 ? (
              editingExpertise.trainers.map((trainer, idx) => (
                <p key={idx}>{trainer.name} - {trainer.briefContent}</p>
              ))
            ) : (
              <p>No trainers assigned</p>
            )}
          </div>

          <button onClick={handleUpdateExpertise}>Save</button>
          <button onClick={() => setEditingExpertise(null)}>Cancel</button>
        </>
      ) : (
        <>
          <span>{exp.title} - {exp.briefContent}</span>
          <button onClick={() => handleEditExpertise(exp)}>Edit</button>
          <button className="delete-btn" onClick={() => handleDeleteExpertise(exp.title)}>Delete</button>
        </>
      )}
    </div>
  ))}
</div>

      {/* Manage Trainers */}
      <h3>Manage Trainers</h3>
      {expertiseList.map((exp) => (
        <div key={exp.title} className="admin-trainer-section">
          <h4>{exp.title} - Trainers</h4>
          {exp.trainers.length > 0 ? (
            exp.trainers.map((trainer) => (
              <div key={trainer.name} className="admin-item">
                <span>{trainer.name} - {trainer.briefContent}</span>
                <button className="delete-btn" onClick={() => handleDeleteTrainer(exp.title, trainer.name)}>Delete</button>
              </div>
            ))
          ) : (
            <p>No trainers assigned yet.</p>
          )}
        </div>
      ))}


      <button className="logout-btn" onClick={() => { localStorage.removeItem("isAuthenticated"); navigate("/"); }}>
        Home
      </button>
    </div>
  );
};

export default AdminDashboard;

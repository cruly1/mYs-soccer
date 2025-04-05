import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
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
  createStudies,
  uploadImageForNews,
  uploadImageForPlayer,
  downloadImage,
} from "../services/api"; // We'll create these API functions next
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  const API_BASE_URL = "http://localhost:8080/api";
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
const [playerImage, setPlayerImage] = useState(null); // For player image upload
const [newsImage, setNewsImage] = useState(null); // For news image upload
const [playerImages, setPlayerImages] = useState({});
const [newsImages, setNewsImages] = useState({});
 const [selectedEntityType, setSelectedEntityType] = useState('player'); // 'player' or 'news'
  const [selectedEntityId, setSelectedEntityId] = useState('');
  const [entityImage, setEntityImage] = useState(null);
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [availableNews, setAvailableNews] = useState([]);

  

  // Handle adding a player
   const handleAddPlayer = async () => {
    try {
      // First create the player
      const createdPlayer = await addPlayer(player);
      toast.success('Player created successfully!');

      // Then upload image if provided
      if (playerImage) {
        try {
          const updatedPlayer = await uploadImageForPlayer(createdPlayer.name, playerImage);
          
          // Update local state with the image info
          setPlayers(prev => prev.map(p => 
            p.name === createdPlayer.name ? updatedPlayer : p
          ));
        } catch (uploadError) {
          toast.warning('Player created but image upload failed');
        }
      }

      // Reset form
      setPlayer({ name: "", dateOfBirth: "", position: "CSATAR" });
      setPlayerImage(null);
    } catch (error) {
      toast.error('Failed to create player');
      console.error('Error adding player:', error);
    }
  };

  // Handle adding news
  const handleAddNews = async () => {
    try {
      // First create the news
      const createdNews = await addNews(news);
      toast.success('News created successfully!');

      // Then upload image if provided
      if (newsImage) {
        try {
          const updatedNews = await uploadImageForNews(createdNews.title, newsImage);
          
          // Update local state with the image info
          setSomethingNews(prev => prev.map(n => 
            n.title === createdNews.title ? updatedNews : n
          ));
        } catch (uploadError) {
          toast.warning('News created but image upload failed');
        }
      }

      // Reset form
      setNews({ title: "", postDate: "", briefContent: "", content: "" });
      setNewsImage(null);
    } catch (error) {
      toast.error('Failed to create news');
      console.error('Error adding news:', error);
    }
  };

// Handle player image change
  const handlePlayerImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPlayerImage(e.target.files[0]);
    }
  };

  // Handle news image change
  const handleNewsImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewsImage(e.target.files[0]);
    }
  };
  const filterEntitiesWithoutImages = (entities, entityType) => {
  return entities.filter(entity => !entity.imageName);
};

useEffect(() => {
  // Update available players and news whenever the main lists change
  setAvailablePlayers(filterEntitiesWithoutImages(players, 'player'));
  setAvailableNews(filterEntitiesWithoutImages(somethingNews, 'news'));
}, [players, somethingNews]);

const handleEntityImageChange = (e) => {
  if (e.target.files && e.target.files[0]) {
    setEntityImage(e.target.files[0]);
  }
};

const handleImageUpload = async () => {
  if (!selectedEntityId || !entityImage) {
    toast.error('Please select an entity and an image');
    return;
  }

  try {
    if (selectedEntityType === 'player') {
      const player = players.find(p => p.name === selectedEntityId);
      if (player) {
        const updatedPlayer = await uploadImageForPlayer(player.name, entityImage);
        setPlayers(prev => prev.map(p => 
          p.name === player.name ? updatedPlayer : p
        ));
        toast.success('Player image uploaded successfully!');
      }
    } else {
      const newsItem = somethingNews.find(n => n.title === selectedEntityId);
      if (newsItem) {
        const updatedNews = await uploadImageForNews(newsItem.title, entityImage);
        setSomethingNews(prev => prev.map(n => 
          n.title === newsItem.title ? updatedNews : n
        ));
        toast.success('News image uploaded successfully!');
      }
    }

    // Reset form
    setEntityImage(null);
    setSelectedEntityId('');
  } catch (error) {
    toast.error('Failed to upload image');
    console.error('Error uploading image:', error);
  }
};

  const fetchImage = async (fileName, setImageState) => {
    if (!fileName) return;
    try {
      const imageUrl = await downloadImage(fileName);
      if (imageUrl) {
        setImageState(prev => ({ ...prev, [fileName]: imageUrl }));
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const fetchPlayers = async () => {
    const data = await getAllPlayers();
    setPlayers(data);
    
    // Fetch images for players
    data.forEach(player => {
      if (player.imageFileName) {
        fetchImage(player.imageFileName, setPlayerImages);
      }
    });
  };


   const fetchNews = async () => {
    const data = await getAllNews();
    setSomethingNews(data);
    
    // Fetch images for news
    data.forEach(newsItem => {
      if (newsItem.imageFileName) {
        fetchImage(newsItem.imageFileName, setNewsImages);
      }
    });
  };

useEffect(() => {
    return () => {
      Object.values(playerImages).forEach(URL.revokeObjectURL);
      Object.values(newsImages).forEach(URL.revokeObjectURL);
    };
  }, [playerImages, newsImages]);

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
      toast.error("Error updating player. Please try again.");
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
    
    fetchExpertise(); // Refresh the list
    setNewService({ title: "", briefContent: "", content: "", studies: [] }); // Reset form
    setStudyInput(""); // Reset study input
  } catch (error) {
  }
};

useEffect(() => {
    fetchPlayers();
    fetchNews();
    fetchExpertise();
  }, []);
  // Check if user is authenticated
  if (!sessionStorage.getItem("token")) {
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

          <div className="form-section">
      <h3>Upload Image for Existing Entity</h3>
      
      <div className="form-row">
        <label>Entity Type:</label>
        <select 
          value={selectedEntityType}
          onChange={(e) => {
            setSelectedEntityType(e.target.value);
            setSelectedEntityId('');
          }}
        >
          <option value="player">Player</option>
          <option value="news">News</option>
        </select>
      </div>
      
      <div className="form-row">
        <label>
          {selectedEntityType === 'player' ? 'Select Player' : 'Select News'}:
        </label>
        <select
          value={selectedEntityId}
          onChange={(e) => setSelectedEntityId(e.target.value)}
          disabled={selectedEntityType === 'player' ? availablePlayers.length === 0 : availableNews.length === 0}
        >
          <option value="">Select {selectedEntityType === 'player' ? 'Player' : 'News'}</option>
          {selectedEntityType === 'player' 
            ? availablePlayers.map(player => (
                <option key={player.name} value={player.name}>
                  {player.name}
                </option>
              ))
            : availableNews.map(newsItem => (
                <option key={newsItem.title} value={newsItem.title}>
                  {newsItem.title}
                </option>
              ))
          }
        </select>
        {(selectedEntityType === 'player' && availablePlayers.length === 0) && (
          <p className="info-text">All players already have images</p>
        )}
        {(selectedEntityType === 'news' && availableNews.length === 0) && (
          <p className="info-text">All news items already have images</p>
        )}
      </div>
      
      <div className="form-row">
        <label>Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleEntityImageChange}
        />
        {entityImage && (
          <span className="file-name">{entityImage.name}</span>
        )}
      </div>
      
      <button 
        onClick={handleImageUpload}
        disabled={!selectedEntityId || !entityImage}
      >
        Upload Image
      </button>
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
            <div className="player-info">
                  {player.imageName && (
                  <img 
                    src={`${API_BASE_URL}/images/downloadImage?fileName=${player.imageName}`}
                    alt={player.name}
                    className="player-thumbnail"
                    onError={(e) => {
                      e.target.style.display = 'none'; // Hide if image fails to load
                    }}
                  />
                )}
            <span>{player.name} - {player.position} - {player.dateOfBirth}</span>
            </div>
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
            <div className="news-info">
                  {newsItem.imageName && (
                  <img 
                    src={`${API_BASE_URL}/images/downloadImage?fileName=${newsItem.imageName}`}
                    alt={newsItem.title}
                    className="news-thumbnail"
                    onError={(e) => {
                      e.target.style.display = 'none'; // Hide if image fails to load
                    }}
                  />
                )}
              <span>{newsItem.title} - {newsItem.postDate}</span>
              </div>
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


      <button className="logout-btn" onClick={() => { sessionStorage.removeItem("token"); navigate("/"); }}>
        Home
      </button>
    </div>
  );
};

export default AdminDashboard;

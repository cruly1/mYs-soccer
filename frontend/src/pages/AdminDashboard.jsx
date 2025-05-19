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
  uploadImageForExpertise,
  uploadImageForPlayer,
  uploadImageForTrainer,
  downloadImage,
} from "../services/api";
import { API_BASE_URL } from "../services/config.js";
import "./AdminDashboard.scss";

const AdminDashboard = () => {

  const navigate = useNavigate();
  const [player, setPlayer] = useState({
  name: "",
  dateOfBirth: "",
  placeOfBirth: "",
  heightInCm: "",
  weightInKg: "",
  slogan: "",
  leg: "RIGHT",
  team: "",
  position: "CSATAR",
});
  const [news, setNews] = useState({ title: "", postDate: "", briefContent: "", content: "" });
  const [players, setPlayers] = useState([]);
  const [somethingNews, setSomethingNews] = useState([]);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [editingNews, setEditingNews] = useState(null);
  const [expertiseList, setExpertiseList] = useState([]);
  const [expertise, setExpertise] = useState({ title: "", briefContent: "", content: "" });
  const [editingExpertise, setEditingExpertise] = useState(null);
  const [trainer, setTrainer] = useState({ name: "", briefContent: "" });
  const [selectedExpertise, setSelectedExpertise] = useState("");
  const [newService, setNewService] = useState({
  title: "",
  briefContent: "",
  content: "",
  studies: [],
});
const [studyInput, setStudyInput] = useState(""); 
const [playerImage, setPlayerImage] = useState(null); 
const [newsImage, setNewsImage] = useState(null); 
const [playerImages, setPlayerImages] = useState({});
const [newsImages, setNewsImages] = useState({});
const [serviceImage, setServiceImage] = useState(null);

const [selectedEntityType, setSelectedEntityType] = useState('player'); 
const [selectedEntityId, setSelectedEntityId] = useState('');
const [entityImage, setEntityImage] = useState(null);
const [availablePlayers, setAvailablePlayers] = useState([]);
const [availableNews, setAvailableNews] = useState([]);
const [availableServices, setAvailableServices] = useState([]);
const [availableTrainers, setAvailableTrainers] = useState([]);

useEffect(() => {
  const hasReloaded = localStorage.getItem("hasReloaded");

  if (!hasReloaded) {
    localStorage.setItem("hasReloaded", "true");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}, []);  

  
   const handleAddPlayer = async () => {
  try {
    const createdPlayer = await addPlayer(player);

    if (playerImage) {
      try {
        const updatedPlayer = await uploadImageForPlayer(createdPlayer.name, playerImage);
        setPlayers(prev => prev.map(p => 
          p.name === createdPlayer.name ? updatedPlayer : p
        ));
      } catch (uploadError) {
        toast.warning('Player created but image upload failed');
      }
    }

    
    setPlayer({
      name: "",
      dateOfBirth: "",
      placeOfBirth: "",
      heightInCm: "",
      weightInKg: "",
      slogan: "",
      leg: "RIGHT",
      team: "",
      position: "CSATAR",
    });
    setPlayerImage(null);
  } catch (error) {
    toast.error('Failed to create player');
  }
};


  
  const handleAddNews = async () => {
    try {
      
      const createdNews = await addNews(news);
      toast.success('News created successfully!');

      
      if (newsImage) {
        try {
          const updatedNews = await uploadImageForNews(createdNews.title, newsImage);
          
          
          setSomethingNews(prev => prev.map(n => 
            n.title === createdNews.title ? updatedNews : n
          ));
        } catch (uploadError) {
          toast.warning('News created but image upload failed');
        }
      }

      
      setNews({ title: "", postDate: "", briefContent: "", content: "" });
      setNewsImage(null);
    } catch (error) {
      toast.error('Failed to create news');
      
    }
  };


  const handlePlayerImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPlayerImage(e.target.files[0]);
    }
  };

  
  const handleNewsImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewsImage(e.target.files[0]);
    }
  };
  const filterEntitiesWithoutImages = (entities, entityType) => {
  return entities.filter(entity => {
    if (entityType === 'trainer') {
      return !entity.imageName && entity.name;
    }
    return !entity.imageName;
  });
};

useEffect(() => {
  setAvailablePlayers(filterEntitiesWithoutImages(players, 'player'));
  setAvailableNews(filterEntitiesWithoutImages(somethingNews, 'news'));
  setAvailableServices(filterEntitiesWithoutImages(expertiseList, 'services')); 
  
  
  const allTrainers = expertiseList.flatMap(exp => 
    exp.trainers && Array.isArray(exp.trainers) 
      ? exp.trainers.map(trainer => ({ 
          ...trainer, 
          expertiseTitle: exp.title 
        }))
      : [] 
  );
  
  setAvailableTrainers(filterEntitiesWithoutImages(allTrainers, 'trainer'));
}, [players, somethingNews, expertiseList]);

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
        
      }
    } else if (selectedEntityType === 'news') {
      const newsItem = somethingNews.find(n => n.title === selectedEntityId);
      if (newsItem) {
        const updatedNews = await uploadImageForNews(newsItem.title, entityImage);
        setSomethingNews(prev => prev.map(n => 
          n.title === newsItem.title ? updatedNews : n
        ));
        
      }
    } else if (selectedEntityType === 'services') {
      const serviceItem = expertiseList.find(s => s.title === selectedEntityId);
      if (serviceItem) {
        const updatedService = await uploadImageForExpertise(serviceItem.title, entityImage);
        setExpertiseList(prev => prev.map(s => 
          s.title === serviceItem.title ? updatedService : s
        ));
        toast.success('Service image uploaded successfully!');
      }
    }
    else if (selectedEntityType === 'trainer') {
      const trainer = availableTrainers.find(t => t.name === selectedEntityId);
      if (trainer) {
        const updatedTrainer = await uploadImageForTrainer(trainer.name, entityImage);
        
        
        setExpertiseList(prev => prev.map(exp => {
          if (exp.title === trainer.expertiseTitle) {
            return {
              ...exp,
              trainers: exp.trainers.map(t => 
                t.name === trainer.name ? updatedTrainer : t
              )
            };
          }
          return exp;
        }));
        
        toast.success('Trainer image uploaded successfully!');
      }
    }

    
    setEntityImage(null);
    setSelectedEntityId('');
  } catch (error) {
    toast.error('Failed to upload image');
    
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
      
    }
  };

  const fetchPlayers = async () => {
    const data = await getAllPlayers();
    setPlayers(data);
    
    data.forEach(player => {
      if (player.imageFileName) {
        fetchImage(player.imageFileName, setPlayerImages);
      }
    });
  };


   const fetchNews = async () => {
    const data = await getAllNews();
    setSomethingNews(data);
    
    
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
    
    fetchPlayers();
  };

  const handleDeleteNews = async (title) => {
    await deleteNews(title);
    
    fetchNews(); 
  };

  


  const handleUpdatePlayer = async () => {
  if (editingPlayer) {
    try {
      await updatePlayer(editingPlayer.originalName, editingPlayer);
      setEditingPlayer(null);
      fetchPlayers(); 
    } catch (error) {
      toast.error("Error updating player. Please try again.");
    }
  }
};

const handleUpdateNews = async () => {
  if (editingNews) {
    try {
      await updateNews(editingNews.originalTitle, editingNews);
      setEditingNews(null);
      
      fetchNews(); 
    } catch (error) {
      
      
    }
  }
};


const handleEditPlayer = (player) => {
  setEditingPlayer({ ...player, originalName: player.name }); 
};

const handleEditNews = (newsItem) => {
  setEditingNews({ ...newsItem, originalTitle: newsItem.title });
};

   const fetchExpertise = async () => {
    const data = await getAllExpertise();
    
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
        briefContent: editingExpertise.briefContent, 
        content: editingExpertise.content,
      });

      setEditingExpertise(null);
      
      fetchExpertise();
      
    } catch (error) {
      
      
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
  

  setEditingExpertise({
    ...exp,
    originalTitle: exp.title, 
    briefContent: exp.briefContent || "",
    content: exp.content || "", 
  });
};


const handleServiceImageChange = (e) => {
  if (e.target.files && e.target.files[0]) {
    setServiceImage(e.target.files[0]);
  }
};


const handleAddService = async () => {
  try {
    
    const createdService = await createExpertise({
      title: newService.title,
      briefContent: newService.briefContent,
      content: newService.content,
    });
    
    toast.success('Service created successfully!');

    
    if (createdService && newService.studies.length > 0) {
      await createStudies(newService.title, newService.studies);
    }
    
    
    if (serviceImage) {
      try {
        const updatedService = await uploadImageForExpertise(createdService.title, serviceImage);
        
        
        setExpertiseList(prev => prev.map(s => 
          s.title === createdService.title ? updatedService : s
        ));
        
        toast.success('Service image uploaded successfully!');
      } catch (uploadError) {
        toast.warning('Service created but image upload failed');
      }
    }

    fetchExpertise();
    setNewService({ title: "", briefContent: "", content: "", studies: [] });
    setStudyInput("");
    setServiceImage(null);
  } catch (error) {
    toast.error('Failed to create service');
  }
};

useEffect(() => {
    fetchPlayers();
    fetchNews();
    fetchExpertise();
  }, []);
  
  if (!sessionStorage.getItem("token")) {
    navigate("/");
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
          <option value="ATTACKER">Attacker</option>
          <option value="GOALKEEPER">Goalkeeper</option>
          <option value="DEFENDER">Defender</option>
          <option value="MIDFIELDER">Midfielder</option>
        </select>
        <input
          type="text"
          placeholder="Place of Birth"
          value={player.placeOfBirth}
          onChange={(e) => setPlayer({ ...player, placeOfBirth: e.target.value })}
        />

        <input
          type="number"
          placeholder="Height (cm)"
          value={player.heightInCm}
          onChange={(e) => setPlayer({ ...player, heightInCm: e.target.value })}
        />

        <input
          type="number"
          placeholder="Weight (kg)"
          value={player.weightInKg}
          onChange={(e) => setPlayer({ ...player, weightInKg: e.target.value })}
        />

        <input
          type="text"
          placeholder="Slogan"
          value={player.slogan}
          onChange={(e) => setPlayer({ ...player, slogan: e.target.value })}
        />

        <select
          value={player.leg}
          onChange={(e) => setPlayer({ ...player, leg: e.target.value })}
        >
          <option value="RIGHT">Right</option>
          <option value="LEFT">Left</option>
        </select>

        <input
          type="text"
          placeholder="Team"
          value={player.team}
          onChange={(e) => setPlayer({ ...player, team: e.target.value })}
        />
        
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
        setStudyInput(""); 
      }
    }}>
      Add Study
    </button>
  </div>

  
  <ul>
    {newService.studies.map((study, index) => (
      <li key={index}>{study}</li>
    ))}
  </ul>

  
  <button onClick={handleAddService}>Create Service</button>
</div>


      
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
          <option value="services">Service</option>
          <option value="trainer">Trainer</option>
        </select>
      </div>
      
      <div className="form-row">
        <label>
      {selectedEntityType === 'player' ? 'Select Player' : 
       selectedEntityType === 'news' ? 'Select News' : 
       selectedEntityType === 'services' ? 'Select Service' : 'Select Trainer'}:
    </label>
        <select
          value={selectedEntityId}
          onChange={(e) => setSelectedEntityId(e.target.value)}
          disabled={
        (selectedEntityType === 'player' && availablePlayers.length === 0) ||
        (selectedEntityType === 'news' && availableNews.length === 0) ||
        (selectedEntityType === 'services' && availableServices.length === 0) ||
        (selectedEntityType === 'trainer' && availableTrainers.length === 0)
      }
    >
          <option value="">Select {selectedEntityType}</option>
      {selectedEntityType === 'player' 
        ? availablePlayers.map(player => (
            <option key={player.name} value={player.name}>
              {player.name}
            </option>
          ))
        : selectedEntityType === 'news'
          ? availableNews.map(newsItem => (
              <option key={newsItem.title} value={newsItem.title}>
                {newsItem.title}
              </option>
            ))
         : selectedEntityType === 'services'
            ? availableServices.map(service => (
                <option key={service.title} value={service.title}>
                  {service.title}
                </option>
              ))   
          : availableTrainers.map(trainer => (
              <option 
                key={`${trainer.expertiseTitle}-${trainer.name}`} 
                value={trainer.name}
              >
                {trainer.name} ({trainer.expertiseTitle})
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
        {(selectedEntityType === 'services' && availableServices.length === 0) && (
          <p className="info-text">All services already have images</p>
        )}
        {selectedEntityType === 'trainer' && availableTrainers.length === 0 && (
          <p className="info-text">All trainers already have images</p>
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


      
    <div className="management-section">
    <h3>Manage Players</h3>
    {players.map((player, index) => (
      <div key={index} className="admin-item">
        {editingPlayer && editingPlayer.originalName === player.name ? (
          <>
            <input
              type="text"
              value={editingPlayer.name}
              onChange={(e) => setEditingPlayer({ ...editingPlayer, name: e.target.value })}
              placeholder="Name"
            />
            <input
              type="date"
              value={editingPlayer.dateOfBirth}
              onChange={(e) => setEditingPlayer({ ...editingPlayer, dateOfBirth: e.target.value })}
            />
            <input
              type="text"
              value={editingPlayer.placeOfBirth}
              onChange={(e) => setEditingPlayer({ ...editingPlayer, placeOfBirth: e.target.value })}
              placeholder="Place of Birth"
            />
            <input
              type="number"
              value={editingPlayer.heightInCm}
              onChange={(e) => setEditingPlayer({ ...editingPlayer, heightInCm: parseInt(e.target.value) })}
              placeholder="Height (cm)"
            />
            <input
              type="number"
              value={editingPlayer.weightInKg}
              onChange={(e) => setEditingPlayer({ ...editingPlayer, weightInKg: parseInt(e.target.value) })}
              placeholder="Weight (kg)"
            />
            <input
              type="text"
              value={editingPlayer.slogan}
              onChange={(e) => setEditingPlayer({ ...editingPlayer, slogan: e.target.value })}
              placeholder="Slogan"
            />
            <select
              value={editingPlayer.leg}
              onChange={(e) => setEditingPlayer({ ...editingPlayer, leg: e.target.value })}
            >
              <option value="RIGHT">Right</option>
              <option value="LEFT">Left</option>
            </select>
            <input
              type="text"
              value={editingPlayer.team}
              onChange={(e) => setEditingPlayer({ ...editingPlayer, team: e.target.value })}
              placeholder="Team"
            />
            <select
              value={editingPlayer.position}
              onChange={(e) => setEditingPlayer({ ...editingPlayer, position: e.target.value })}
            >
              <option value="ATTACKER">Attacker</option>
              <option value="GOALKEEPER">Goalkeeper</option>
              <option value="DEFENDER">Defender</option>
              <option value="MIDFIELDER">Midfielder</option>
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
                    e.target.style.display = 'none';
                  }}
                />
              )}
              <span>
                <strong>{player.name}</strong> - <strong>{player.position}</strong> - <strong>{player.dateOfBirth}</strong> - <strong>{player.placeOfBirth}</strong> - <strong>{player.heightInCm} cm</strong> - <strong>{player.weightInKg} kg</strong> - <strong>{player.slogan || "No slogan yet"}</strong> - <strong>{player.leg}</strong> - <strong>{player.team || "No team"}</strong>
              </span>
            </div>
            <button onClick={() => handleEditPlayer(player)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDeletePlayer(player.name)}>Delete</button>
          </>
        )}
      </div>
    ))}

    </div>



      
    <div className="management-section">
      <h3>Manage News</h3>
      {somethingNews.map((newsItem, index) => (
        <div key={index} className="admin-item">
          {editingNews && editingNews.originalTitle === newsItem.title ? ( 
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
                      e.target.style.display = 'none'; 
                    }}
                  />
                )}
              <span><strong>{newsItem.title}</strong> - <strong>{newsItem.postDate}</strong></span>
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
      {editingExpertise && editingExpertise.originalTitle === exp.title ? ( 
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
          <div className="expertise-info">
          {exp.imageName && (
              <img 
                src={`${API_BASE_URL}/images/downloadImage?fileName=${exp.imageName}`}
                alt={exp.title}
                className="service-thumbnail"
                onError={(e) => {
                  e.target.style.display = 'none'; 
                }}
              />
            )}
          <span><strong>{exp.title}</strong> - <strong>{exp.briefContent}</strong></span>
          </div>
          <button onClick={() => handleEditExpertise(exp)}>Edit</button>
          <button className="delete-btn" onClick={() => handleDeleteExpertise(exp.title)}>Delete</button>
          
        </>
      )}
    </div>
  ))}
</div>

      
<h3>Manage Trainers</h3>
{expertiseList.map((exp) => (
  <div key={exp.title} className="admin-trainer-section">
    {exp.trainers && Array.isArray(exp.trainers) && exp.trainers.length > 0 ? (
      exp.trainers.map((trainer) => (
        <div key={trainer.name} className="admin-item">
          <div className="trainer-info">
            {trainer.imageName && (
              <img 
                src={`${API_BASE_URL}/images/downloadImage?fileName=${trainer.imageName}`}
                alt={trainer.name}
                className="trainer-thumbnail"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
            <span><strong>{trainer.name}</strong> - <strong>{trainer.briefContent}</strong></span>
          </div>
          <button className="delete-btn" onClick={() => handleDeleteTrainer(exp.title, trainer.name)}>Delete</button>
        </div>
      ))
    ) : (
      <p>No trainers assigned yet.</p>
    )}
  </div>
))}


      <button className="logout-btn" onClick={() => { sessionStorage.removeItem("token"); localStorage.removeItem("hasReloaded"); navigate("/"); }}>
        Home
      </button>
    </div>
  );
};

export default AdminDashboard;

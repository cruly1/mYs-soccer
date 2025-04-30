import axios from "axios";
import { toast } from "react-toastify";

// VPS CONFIG const API_BASE_URL = "http://128.140.102.156:8080/api";
const API_BASE_URL = "http://localhost:8080/api";
const token = sessionStorage.getItem("token");
// **Players API**
export const getAllPlayers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/players/getAllPlayers`);
    return response.data;
  } catch (error) {
    //console.error("Error fetching players:", error);
    return [];
  }
};

export const getFirstFourPlayers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/players/getFirstFourPlayers`);
    return response.data;
  } catch (error) {
    //console.error("Error fetching first four players:", error);
    return [];
  }
};

export const getPlayerByName = async (name) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/players/getPlayerByName?name=${name}`);
    return response.data;
  } catch (error) {
    //console.error("Error fetching player:", error);
    return null;
  }
};

export const addPlayer = async (playerData, imageFile) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/players/addPlayer`, playerData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Then upload the image if provided
    if (imageFile) {
      await uploadImageForPlayer(playerData.name, imageFile);
    }

    toast.success("Player added successfully!");
    return response.data;
  } catch (error) {
    //console.error("Error adding player:", error);
    toast.error("Failed to add player.");
  }
};

export const updatePlayer = async (originalName, playerData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/players/updatePlayer?name=${encodeURIComponent(originalName)}`,
      playerData
    , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Player updated successfully!");
    return response.data;
  } catch (error) {
    //console.error("Error updating player:", error);
    toast.error("Failed to update player.");
    
  }
};


// Delete player
export const deletePlayer = async (name) => {
  try {
    await axios.delete(`${API_BASE_URL}/players/deletePlayer?name=${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Player deleted successfully!");
  } catch (error) {
    //console.error("Error deleting player:", error);
    toast.error("Failed to delete player.");
  }
};

// **News API**
export const getAllNews = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/news/getAllNews`);
    return response.data;
  } catch (error) {
    //console.error("Error fetching news:", error);
    return [];
  }
};

export const getFirstFourNews = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/news/getFirstFourNews`);
    return response.data;
  } catch (error) {
    //console.error("Error fetching first four news:", error);
    return [];
  }
};
export const getNewsByTitle = async (title) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/news/getNewsByTitle?title=${title}`);
    return response.data;
  } catch (error) {
    //console.error("Error fetching news:", error);
    return null;
  }
};

export const addNews = async (newsData, imageFile) => {
  try {
    // First upload the image if provided
    if (imageFile) {
      await uploadImageForNews(newsData.title, imageFile);
    }

    const response = await axios.post(`${API_BASE_URL}/news/addNews`, newsData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("News added successfully!");
    return response.data;
  } catch (error) {
    //console.error("Error adding news:", error);
    toast.error("Failed to add news.");
  }
};

export const deleteNews = async (title) => {
  try {
    await axios.delete(`${API_BASE_URL}/news/deleteNews?title=${title}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("News deleted successfully!");
  } catch (error) {
    //console.error("Error deleting news:", error);
    toast.error("Failed to delete news.");
  }
};


export const updateNews = async (originalTitle, newsData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/news/updateNews?title=${encodeURIComponent(originalTitle)}`,
      newsData
    , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("News updated successfully!");
    return response.data;
  } catch (error) {
    //console.error("Error updating news:", error);
    toast.error("Failed to update news.");
    throw error;
  }
};


export const getExpertiseByTitle = async (title) => {
  try {
    const encodedTitle = encodeURIComponent(title); // ✅ Ensures spaces are correctly handled
    const response = await axios.get(`${API_BASE_URL}/expertise/getExpertiseByTitle?title=${encodedTitle}`);
    return response.data;
  } catch (error) {
    //console.error("Error fetching expertise:", error.response?.data || error.message);
    return null;
  }
};




export const getAllExpertise = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/expertise/getAllExpertise`);
    return response.data;
  } catch (error) {
    //console.error("Error fetching all expertise:", error);
    return [];
  }
};

export const createExpertise = async (expertiseData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/expertise/createExpertise`, expertiseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Expertise created successfully!");
    return response.data;
  } catch (error) {
    //console.error("Error creating expertise:", error);
    toast.error("Failed to create expertise.");
    throw error;
  }
};

export const updateExpertise = async (title, expertiseData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/expertise/updateExpertise?title=${encodeURIComponent(title)}`, expertiseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Expertise updated successfully!");
    return response.data;
  } catch (error) {
    //console.error("Error updating expertise:", error);
    toast.error("Failed to update expertise.");
    throw error;
  }
};

export const deleteExpertise = async (title) => {
  try {
    await axios.delete(`${API_BASE_URL}/expertise/deleteExpertise?title=${encodeURIComponent(title)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Expertise deleted successfully!");
  } catch (error) {
    //console.error("Error deleting expertise:", error);
    toast.error("Failed to delete expertise.");
    throw error;
  }
};

// Trainer API Calls
export const createTrainer = async (title, trainerData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/expertise/createTrainer?title=${encodeURIComponent(title)}`, trainerData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Trainer created successfully!");
    return response.data;
  } catch (error) {
    //console.error("Error creating trainer:", error);
    toast.error("Failed to create trainer.");
    throw error;
  }
};

export const deleteTrainer = async (title, name) => {
  try {
    await axios.delete(`${API_BASE_URL}/expertise/deleteTrainer?title=${encodeURIComponent(title)}&name=${encodeURIComponent(name)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Trainer deleted successfully!");
  } catch (error) {
    //console.error("Error deleting trainer:", error);
    toast.error("Failed to delete trainer.");
    throw error;
  }
};

export const createStudies = async (title, studies) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/expertise/createStudies?title=${encodeURIComponent(title)}`, {
      studies: studies,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Studies created successfully!");
    return response.data;
  } catch (error) {
    //console.error("Error creating studies:", error.response?.data || error.message);
    toast.error("Failed to create studies.");
    return null;
  }
};

export const uploadImageForPlayer = async (playerName, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await axios.post(
      `${API_BASE_URL}/images/uploadImageForPlayer?nickName=${playerName}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    // Assuming backend returns the updated player with imageName and imageType
    const updatedPlayer = response.data;
    toast.success('Player image uploaded successfully!');
    return updatedPlayer;
  } catch (error) {
    //console.error('Error uploading player image:', error.response?.data || error.message);
    toast.error('Failed to upload player image.');
    throw error;
  }
};

export const uploadImageForNews = async (newsTitle, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await axios.post(
      `${API_BASE_URL}/images/uploadImageForNews?title=${newsTitle}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    // Assuming backend returns the updated news with imageName and imageType
    const updatedNews = response.data;
    toast.success('News image uploaded successfully!');
    return updatedNews;
  } catch (error) {
    //console.error('Error uploading news image:', error.response?.data || error.message);
    toast.error('Failed to upload news image.');
    throw error;
  }
};

export const uploadImageForTrainer = async (trainerName, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await axios.post(
      `${API_BASE_URL}/images/uploadImageForTrainer?trainer=${trainerName}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    // Assuming backend returns the updated player with imageName and imageType
    const updatedTrainer = response.data;
    toast.success('Trainer image uploaded successfully!');
    return updatedTrainer;
  } catch (error) {
    //console.error('Error uploading trainer image:', error.response?.data || error.message);
    toast.error('Failed to upload trainer image.');
    throw error;
  }
};

export const downloadImage = async (fileName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/images/downloadImage?fileName=${fileName}`, {
      responseType: 'blob', // Important for handling binary data
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cacheControl: 'public, max-age=86400'
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    //console.error('Error downloading image:', error);
    return null;
  }
};

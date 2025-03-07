import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// **Players API**
export const getAllPlayers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/players/getAllPlayers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching players:", error);
    return [];
  }
};

export const getFirstFourPlayers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/players/getFirstFourPlayers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching first four players:", error);
    return [];
  }
};

export const getPlayerByName = async (name) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/players/getPlayerByName?name=${name}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching player:", error);
    return null;
  }
};

export const addPlayer = async (playerData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/players/addPlayer`, playerData);
    return response.data;
  } catch (error) {
    console.error("Error adding player:", error);
  }
};

export const updatePlayer = async (originalName, playerData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/players/updatePlayer?name=${encodeURIComponent(originalName)}`,
      playerData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating player:", error);
    throw error;
  }
};


// Delete player
export const deletePlayer = async (name) => {
  try {
    await axios.delete(`${API_BASE_URL}/players/deletePlayer?name=${name}`);
  } catch (error) {
    console.error("Error deleting player:", error);
  }
};

// **News API**
export const getAllNews = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/news/getAllNews`);
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

export const getFirstFourNews = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/news/getFirstFourNews`);
    return response.data;
  } catch (error) {
    console.error("Error fetching first four news:", error);
    return [];
  }
};
export const getNewsByTitle = async (title) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/news/getNewsByTitle?title=${title}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return null;
  }
};

export const addNews = async (newsData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/news/addNews`, newsData);
    return response.data;
  } catch (error) {
    console.error("Error adding news:", error);
  }
};

export const deleteNews = async (title) => {
  try {
    await axios.delete(`${API_BASE_URL}/news/deleteNews?title=${title}`);
  } catch (error) {
    console.error("Error deleting news:", error);
  }
};


export const updateNews = async (originalTitle, newsData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/news/updateNews?title=${encodeURIComponent(originalTitle)}`,
      newsData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating news:", error);
    throw error;
  }
};


export const getExpertiseByTitle = async (title) => {
  try {
    const encodedTitle = encodeURIComponent(title); // ✅ Ensures spaces are correctly handled
    const response = await axios.get(`${API_BASE_URL}/expertise/getExpertiseByTitle?title=${encodedTitle}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching expertise:", error.response?.data || error.message);
    return null;
  }
};




export const getAllExpertise = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/expertise/getAllExpertise`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all expertise:", error);
    return [];
  }
};

export const createExpertise = async (expertiseData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/expertise/createExpertise`, expertiseData);
    return response.data;
  } catch (error) {
    console.error("Error creating expertise:", error);
    throw error;
  }
};

export const updateExpertise = async (title, expertiseData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/expertise/updateExpertise?title=${encodeURIComponent(title)}`, expertiseData);
    return response.data;
  } catch (error) {
    console.error("Error updating expertise:", error);
    throw error;
  }
};

export const deleteExpertise = async (title) => {
  try {
    await axios.delete(`${API_BASE_URL}/expertise/deleteExpertise?title=${encodeURIComponent(title)}`);
  } catch (error) {
    console.error("Error deleting expertise:", error);
    throw error;
  }
};

// Trainer API Calls
export const createTrainer = async (title, trainerData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/expertise/createTrainer?title=${encodeURIComponent(title)}`, trainerData);
    return response.data;
  } catch (error) {
    console.error("Error creating trainer:", error);
    throw error;
  }
};

export const deleteTrainer = async (title, name) => {
  try {
    await axios.delete(`${API_BASE_URL}/expertise/deleteTrainer?title=${encodeURIComponent(title)}&name=${encodeURIComponent(name)}`);
  } catch (error) {
    console.error("Error deleting trainer:", error);
    throw error;
  }
};

export const createStudies = async (title, studies) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/expertise/createStudies?title=${encodeURIComponent(title)}`, {
      studies: studies,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating studies:", error.response?.data || error.message);
    return null;
  }
};

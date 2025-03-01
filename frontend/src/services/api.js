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

export const updatePlayer = async (playerData) => {
  return axios.put(`${API_BASE_URL}/players/updatePlayer`, playerData);
};

export const deletePlayer = async (name) => {
  return axios.delete(`${API_BASE_URL}/players/deletePlayers?name=${name}`);
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

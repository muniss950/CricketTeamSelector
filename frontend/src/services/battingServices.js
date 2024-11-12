import axios from 'axios';

const API_URL = 'http://localhost:5000/batting'; // Ensure this URL matches your backend setup

const battingService = {
  // Fetch all batting stats
  getAllBattingStats: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching all batting stats:", error);
      throw error;
    }
  },

  // Fetch batting stats for a specific player by playerId
  getBattingStatsById: async (playerId) => {
    try {
      const response = await axios.get(`${API_URL}/${playerId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching batting stats for player ${playerId}:`, error);
      throw error;
    }
  },

  // Add new batting stats
  addBattingStats: async (battingData) => {
    try {
      const response = await axios.post(API_URL, battingData);
      return response.data;
    } catch (error) {
      console.error("Error adding batting stats:", error);
      throw error;
    }
  },

  // Update batting stats for a specific player
  updateBattingStats: async (playerId, updateData) => {
    try {
      const response = await axios.put(`${API_URL}/${playerId}`, updateData);
      return response.data;
    } catch (error) {
      console.error(`Error updating batting stats for player ${playerId}:`, error);
      throw error;
    }
  },

  // Delete batting stats for a specific player
  deleteBattingStats: async (playerId) => {
    try {
      const response = await axios.delete(`${API_URL}/${playerId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting batting stats for player ${playerId}:`, error);
      throw error;
    }
  },
};

export default battingService;

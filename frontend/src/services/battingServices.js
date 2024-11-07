import axios from 'axios';

const API_URL = 'http://localhost:5000/batting'; // Update with the correct backend URL

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

  // Fetch batting stats for a specific player and match
  getBattingStatsById: async (playerId, matchId) => {
    try {
      const response = await axios.get(`${API_URL}/${playerId}/${matchId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching batting stats for player ${playerId} in match ${matchId}:`, error);
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

  // Update batting stats for a specific player, match, and inning
  updateBattingStats: async (playerId, matchId, inningNumber, updateData) => {
    try {
      const response = await axios.put(
        `${API_URL}/${playerId}/${matchId}/${inningNumber}`,
        updateData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating batting stats for player ${playerId} in match ${matchId} inning ${inningNumber}:`, error);
      throw error;
    }
  },

  // Delete batting stats for a specific player, match, and inning
  deleteBattingStats: async (playerId, matchId, inningNumber) => {
    try {
      const response = await axios.delete(`${API_URL}/${playerId}/${matchId}/${inningNumber}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting batting stats for player ${playerId} in match ${matchId} inning ${inningNumber}:`, error);
      throw error;
    }
  },
};

export default battingService;


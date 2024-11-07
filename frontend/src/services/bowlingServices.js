
import axios from 'axios';

const API_URL = 'http://localhost:5000/bowling'; // Update with the correct backend URL

const bowlingService = {
  // Fetch all bowling stats
  getAllBowlingStats: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching all bowling stats:", error);
      throw error;
    }
  },

  // Fetch bowling stats for a specific player in a match
  getBowlingStatsByPlayer: async (matchId, playerId) => {
    try {
      const response = await axios.get(`${API_URL}/${matchId}/${playerId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching bowling stats for player ${playerId} in match ${matchId}:`, error);
      throw error;
    }
  },

  // Add new bowling stats
  addBowlingStats: async (bowlingData) => {
    try {
      const response = await axios.post(API_URL, bowlingData);
      return response.data;
    } catch (error) {
      console.error("Error adding bowling stats:", error);
      throw error;
    }
  },

  // Update bowling stats for a specific player in a match and inning
  updateBowlingStats: async (matchId, playerId, inningNumber, updateData) => {
    try {
      const response = await axios.put(
        `${API_URL}/${matchId}/${playerId}`,
        updateData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating bowling stats for player ${playerId} in match ${matchId} inning ${inningNumber}:`, error);
      throw error;
    }
  },

  // Delete bowling stats for a specific player in a match and inning
  deleteBowlingStats: async (matchId, playerId, inningNumber) => {
    try {
      const response = await axios.delete(`${API_URL}/${matchId}/${playerId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting bowling stats for player ${playerId} in match ${matchId} inning ${inningNumber}:`, error);
      throw error;
    }
  },
};

export default bowlingService;

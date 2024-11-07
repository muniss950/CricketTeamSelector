import axios from 'axios';

const API_URL = 'http://localhost:5000/player_batting_stats'; // Update this URL as necessary

const playerBattingStatsService = {
  // Fetch all player batting stats
  getAllBattingStats: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching all batting stats:", error);
      throw error;
    }
  },

  // Fetch batting stats for a specific player by ID
  getBattingStatsById: async (playerId) => {
    try {
      const response = await axios.get(`${API_URL}/${playerId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching batting stats for player ID ${playerId}:`, error);
      throw error;
    }
  },
};

export default playerBattingStatsService;


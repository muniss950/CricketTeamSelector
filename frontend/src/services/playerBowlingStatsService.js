// services/playerBowlingStatsService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/player_bowling_stats'; // Update this URL as necessary

const playerBowlingStatsService = {
  // Fetch bowling stats for a specific player by ID
  getBowlingStatsById: async (playerId) => {
    try {
      const response = await axios.get(`${API_URL}/${playerId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching bowling stats for player ID ${playerId}:`, error);
      throw error;
    }
  },
};

export default playerBowlingStatsService;

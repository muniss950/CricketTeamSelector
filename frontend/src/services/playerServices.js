// playerService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/players'; // Update with your actual API URL if different

const playerService = {
  // Fetch all players
  async getPlayers() {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;  // Axios automatically parses the JSON response
    } catch (error) {
      console.error('Error fetching players:', error);
      throw error;
    }
  },

  // Fetch a single player by ID
  async getPlayer(playerId) {
    try {
      const response = await axios.get(`${API_URL}/${playerId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching player:', error);
      throw error;
    }
  },

  // Create a new player
  async createPlayer(playerData) {
    try {
      const response = await axios.post(API_URL, playerData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating player:', error);
      throw error;
    }
  },

  // Update an existing player by ID
  async updatePlayer(playerId, playerData) {
    try {
      const response = await axios.put(`${API_URL}/${playerId}`, playerData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating player:', error);
      throw error;
    }
  },

  // Delete a player by ID
  async deletePlayer(playerId) {
    try {
      const response = await axios.delete(`${API_URL}/${playerId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting player:', error);
      throw error;
    }
  },
};

// Export the playerService object
export const PlayerService = playerService;

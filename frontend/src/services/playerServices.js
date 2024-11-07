// playerService.js

const API_URL = 'http://localhost:5000/players'; // Update with your actual API URL if different

const playerService = {
  // Fetch all players
  async getPlayers() {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch players');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Fetch a single player by ID
  async getPlayer(playerId) {
    try {
      const response = await fetch(`${API_URL}/${playerId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Player not found');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Create a new player
  async createPlayer(playerData) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerData),
      });
      if (!response.ok) {
        throw new Error('Failed to create player');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Update an existing player by ID
  async updatePlayer(playerId, playerData) {
    try {
      const response = await fetch(`${API_URL}/${playerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerData),
      });
      if (!response.ok) {
        throw new Error('Failed to update player');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Delete a player by ID
  async deletePlayer(playerId) {
    try {
      const response = await fetch(`${API_URL}/${playerId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete player');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

// Export the playerService object
export const PlayerService = playerService;

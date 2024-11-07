// squadService.js

const API_URL = 'http://localhost:5000/squad'; // Update with your actual API URL if different

const squadService = {
  // Fetch all squad entries
  async getAllSquadEntries() {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch squad entries');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Fetch a specific squad entry by player_id, team_id, and match_id
  async getSquadEntry(playerId, teamId, matchId) {
    try {
      const response = await fetch(`${API_URL}/${playerId}/${teamId}/${matchId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Squad entry not found');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Add a new squad entry
  async addSquadEntry(playerId, teamId, matchId) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Player_ID: playerId,
          Team_ID: teamId,
          Match_ID: matchId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add squad entry');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Update an existing squad entry
  async updateSquadEntry(playerId, teamId, matchId, newPlayerId, newTeamId, newMatchId) {
    try {
      const response = await fetch(`${API_URL}/${playerId}/${teamId}/${matchId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Player_ID: newPlayerId,
          Team_ID: newTeamId,
          Match_ID: newMatchId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update squad entry');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Delete a squad entry
  async deleteSquadEntry(playerId, teamId, matchId) {
    try {
      const response = await fetch(`${API_URL}/${playerId}/${teamId}/${matchId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete squad entry');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

// Export the squadService object
export const SquadService = squadService;

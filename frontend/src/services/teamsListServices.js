// teamsListService.js

const API_URL = 'http://localhost:5000/teams_list'; // Update with your actual API URL if different

const teamsListService = {
  // Fetch all teams in the list
  async getAllTeams() {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch teams list');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Fetch a team entry by team_id and tournament_id
  async getTeamEntry(teamId, tournamentId) {
    try {
      const response = await fetch(`${API_URL}/${teamId}/${tournamentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Team entry not found');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Add a team entry
  async addTeamEntry(teamId, tournamentId) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Team_ID: teamId,
          Tournament_ID: tournamentId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add team entry');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Update a team entry
  async updateTeamEntry(teamId, tournamentId, newTeamId, newTournamentId) {
    try {
      const response = await fetch(`${API_URL}/${teamId}/${tournamentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Team_ID: newTeamId,
          Tournament_ID: newTournamentId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update team entry');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Delete a team entry
  async deleteTeamEntry(teamId, tournamentId) {
    try {
      const response = await fetch(`${API_URL}/${teamId}/${tournamentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete team entry');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

// Export the teamsListService object
export const TeamsListService = teamsListService;


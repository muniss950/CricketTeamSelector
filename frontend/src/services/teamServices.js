// i// teamService.js

const API_URL = 'http://localhost:5000/teams'; // Update with your actual API URL if different

const teamService = {
  // Fetch all teams
  async getAllTeams() {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch teams');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Fetch a team by its ID
  async getTeamById(teamId) {
    try {
      const response = await fetch(`${API_URL}/${teamId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Team not found');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Add a new team
  async addTeam(teamName, teamType, captainId) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Team_Name: teamName,
          Team_Type: teamType,
          Captain_ID: captainId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add team');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Update an existing team
  async updateTeam(teamId, teamName, teamType, captainId) {
    try {
      const response = await fetch(`${API_URL}/${teamId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Team_Name: teamName,
          Team_Type: teamType,
          Captain_ID: captainId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update team');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Delete a team by its ID
  async deleteTeam(teamId) {
    try {
      const response = await fetch(`${API_URL}/${teamId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete team');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

// Export the teamService object
export const TeamService = teamService;


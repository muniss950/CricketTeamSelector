// tournamentsService.js

const API_URL = 'http://localhost:5000/tournaments'; // Update with your actual API URL if different

const tournamentsService = {
  // Fetch all tournaments
  async getAllTournaments() {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tournaments');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Fetch a tournament by tournament_id
  async getTournament(tournamentId) {
    try {
      const response = await fetch(`${API_URL}/${tournamentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Tournament not found');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Create a new tournament
  async createTournament(tournamentData) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tournamentData),
      });

      if (!response.ok) {
        throw new Error('Failed to create tournament');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Update a tournament
  async updateTournament(tournamentId, tournamentData) {
    try {
      const response = await fetch(`${API_URL}/${tournamentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tournamentData),
      });

      if (!response.ok) {
        throw new Error('Failed to update tournament');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Delete a tournament
  async deleteTournament(tournamentId) {
    try {
      const response = await fetch(`${API_URL}/${tournamentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete tournament');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

// Export the tournamentsService object
export const TournamentsService = tournamentsService;

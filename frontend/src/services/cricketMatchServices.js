import axios from 'axios';

const API_URL = 'http://localhost:5000/matches'; // Update this URL to match your backend setup

const cricketMatchService = {
  // Fetch all matches
  getAllMatches: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching all matches:", error);
      throw error;
    }
  },

  // Fetch a match by ID
  getMatchById: async (matchId) => {
    try {
      const response = await axios.get(`${API_URL}/${matchId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching match with ID ${matchId}:`, error);
      throw error;
    }
  },

  // Add a new match
  addMatch: async (matchData) => {
    try {
      const response = await axios.post(API_URL, matchData);
      return response.data;
    } catch (error) {
      console.error("Error adding match:", error);
      throw error;
    }
  },

  // Update an existing match by ID
  updateMatch: async (matchId, updateData) => {
    try {
      const response = await axios.put(`${API_URL}/${matchId}`, updateData);
      return response.data;
    } catch (error) {
      console.error(`Error updating match with ID ${matchId}:`, error);
      throw error;
    }
  },

  // Delete a match by ID
  deleteMatch: async (matchId) => {
    try {
      const response = await axios.delete(`${API_URL}/${matchId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting match with ID ${matchId}:`, error);
      throw error;
    }
  },
};

export default cricketMatchService;

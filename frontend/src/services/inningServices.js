import axios from 'axios';

const API_URL = 'http://localhost:5000/innings'; // Update this URL if needed

const inningService = {
  // Fetch all innings
  getAllInnings: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching all innings:", error);
      throw error;
    }
  },

  // Add a new inning
  addInning: async (inningData) => {
    try {
      const response = await axios.post(API_URL, inningData);
      return response.data;
    } catch (error) {
      console.error("Error adding inning:", error);
      throw error;
    }
  },

  // Update an existing inning
  updateInning: async (matchId, inningNumber, updateData) => {
    try {
      const response = await axios.put(`${API_URL}/${matchId}/${inningNumber}`, updateData);
      return response.data;
    } catch (error) {
      console.error(`Error updating inning for Match ID ${matchId}, Inning Number ${inningNumber}:`, error);
      throw error;
    }
  },

  // Delete an inning
  deleteInning: async (matchId, inningNumber) => {
    try {
      const response = await axios.delete(`${API_URL}/${matchId}/${inningNumber}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting inning for Match ID ${matchId}, Inning Number ${inningNumber}:`, error);
      throw error;
    }
  },
};

export default inningService;

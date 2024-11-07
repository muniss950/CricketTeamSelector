import axios from 'axios';

const API_URL = 'http://localhost:5000/ball-by-ball'; // Update to match your backend URL

const ballByBallService = {
  // Fetch all ball-by-ball stats
  getBallByBallStats: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching ball-by-ball stats:", error);
      throw error;
    }
  },

  // Add a new ball-by-ball stat
  addBallByBallStats: async (ballData) => {
    try {
      const response = await axios.post(API_URL, ballData);
      return response.data;
    } catch (error) {
      console.error("Error adding ball-by-ball stat:", error);
      throw error;
    }
  },

  // Update a specific ball-by-ball stat
  updateBallByBallStats: async (matchId, inningNumber, overNo, bowlNo, updateData) => {
    try {
      const response = await axios.put(
        `${API_URL}/${matchId}/${inningNumber}/${overNo}/${bowlNo}`,
        updateData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating ball-by-ball stat:", error);
      throw error;
    }
  },

  // Delete a specific ball-by-ball stat
  deleteBallByBallStats: async (matchId, inningNumber, overNo, bowlNo) => {
    try {
      const response = await axios.delete(`${API_URL}/${matchId}/${inningNumber}/${overNo}/${bowlNo}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting ball-by-ball stat:", error);
      throw error;
    }
  },
};

export default ballByBallService;

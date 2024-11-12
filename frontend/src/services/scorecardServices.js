
// scorecardService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/scorecard/'; // Update with your actual API URL if different

const scorecardService = {
  // Fetch the scorecard for a specific match and inning
  async getScorecard(matchId, inningNumber) {
    try {
      const response =await axios.get(`${API_URL}?match_id=${matchId}&inning_number=${inningNumber}`)

      // console.log(response.data)
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

// Export the scorecardService object
export const ScorecardService = scorecardService;

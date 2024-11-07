
// scorecardService.js

const API_URL = 'http://localhost:5000/scorecard'; // Update with your actual API URL if different

const scorecardService = {
  // Fetch the scorecard for a specific match and inning
  async getScorecard(matchId, inningNumber) {
    try {
      const response = await fetch(`${API_URL}?match_id=${matchId}&inning_number=${inningNumber}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch scorecard');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

// Export the scorecardService object
export const ScorecardService = scorecardService;

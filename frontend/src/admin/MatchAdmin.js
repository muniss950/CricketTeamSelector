
import React, { useState, useEffect } from 'react';
import cricketMatchService from '../services/cricketMatchServices';

const MatchPage = () => {
  const [matches, setMatches] = useState([]);
  const [newMatch, setNewMatch] = useState({
    match_date: '',
    tournament_id: '',
    team1_id: '',
    team2_id: '',
    winner: null,
    stage: '',
  });
  const [editingMatch, setEditingMatch] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch all matches on component mount
  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const data = await cricketMatchService.getAllMatches();
      setMatches(data);
    } catch (error) {
      console.error("Error fetching matches:", error);
      setError('Failed to fetch matches');
    }
  };

  // Handle form field changes for new match
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMatch({ ...newMatch, [name]: value });
  };

  // Handle form field changes for editing an existing match
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingMatch({ ...editingMatch, [name]: value });
  };

  // Add a new match
  const handleCreateMatch = async () => {
    if (!newMatch.match_date || !newMatch.tournament_id || !newMatch.team1_id || !newMatch.team2_id || !newMatch.stage) {
      setError('All fields are required to add a new match.');
      return;
    }

    try {
      await cricketMatchService.addMatch(newMatch);
      fetchMatches();
      setSuccess(true);
      setNewMatch({
        match_date: '',
        tournament_id: '',
        team1_id: '',
        team2_id: '',
        winner: null,
        stage: '',
      });
    } catch (error) {
      console.error("Error adding match:", error);
      setError('Failed to add match');
    }
  };

  // Update an existing match (Only update fields that were changed)
  const handleUpdateMatch = async () => {
    const updatedMatch = { ...editingMatch };

    // Remove fields that are empty (not updated)
    Object.keys(updatedMatch).forEach((key) => {
      if (updatedMatch[key] === '' || updatedMatch[key] === null) {
        delete updatedMatch[key];
      }
    });

    if (!updatedMatch.match_date || !updatedMatch.tournament_id || !updatedMatch.team1_id || !updatedMatch.team2_id || !updatedMatch.stage) {
      setError('All fields are required to update the match.');
      return;
    }

    try {
      await cricketMatchService.updateMatch(editingMatch.Match_ID, updatedMatch);
      fetchMatches();
      setEditingMatch(null);
      setSuccess(true);
    } catch (error) {
      console.error("Error updating match:", error);
      setError('Failed to update match');
    }
  };

  // Delete a match
  const handleDeleteMatch = async (matchId) => {
    try {
      await cricketMatchService.deleteMatch(matchId);
      fetchMatches();
      setSuccess(true);
    } catch (error) {
      console.error("Error deleting match:", error);
      setError('Failed to delete match');
    }
  };

  return (
    <div>
      <h2>Cricket Matches</h2>

      {/* Display success/error messages */}
      {success && <p className="success-message">Operation successful!</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Form for adding a new match */}
      <div>
        <h3>Add New Match</h3>
        <form>
          <label>
            Match Date:
            <input type="date" name="match_date" value={newMatch.match_date} onChange={handleInputChange} />
          </label>
          <label>
            Tournament ID:
            <input type="text" name="tournament_id" value={newMatch.tournament_id} onChange={handleInputChange} />
          </label>
          <label>
            Team 1 ID:
            <input type="text" name="team1_id" value={newMatch.team1_id} onChange={handleInputChange} />
          </label>
          <label>
            Team 2 ID:
            <input type="text" name="team2_id" value={newMatch.team2_id} onChange={handleInputChange} />
          </label>
          <label>
            Winner:
            <input type="text" name="winner" value={newMatch.winner || ''} onChange={handleInputChange} />
          </label>
          <label>
            Stage:
            <input type="text" name="stage" value={newMatch.stage} onChange={handleInputChange} />
          </label>
          <button type="button" onClick={handleCreateMatch}>Add Match</button>
        </form>
      </div>

      {/* Table of all matches */}
      <h3>All Matches</h3>
      <table>
        <thead>
          <tr>
            <th>Match Date</th>
            <th>Tournament ID</th>
            <th>Team 1</th>
            <th>Team 2</th>
            <th>Winner</th>
            <th>Stage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.Match_ID}>
              <td>{match.Match_Date}</td>
              <td>{match.Tournament_ID}</td>
              <td>{match.Team1_Name}</td>
              <td>{match.Team2_Name}</td>
              <td>{match.Winner_Name}</td>
              <td>{match.Stage}</td>
              <td>
                <button onClick={() => setEditingMatch(match)}>Edit</button>
                <button onClick={() => handleDeleteMatch(match.Match_ID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form for editing an existing match */}
      {editingMatch && (
        <div>
          <h3>Edit Match</h3>
          <form>
            <label>
              Match Date:
              <input type="date" name="match_date" value={editingMatch.match_date} onChange={handleEditChange} />
            </label>
            <label>
              Tournament ID:
              <input type="text" name="tournament_id" value={editingMatch.tournament_id} onChange={handleEditChange} />
            </label>
            <label>
              Team 1 ID:
              <input type="text" name="team1_id" value={editingMatch.team1_id} onChange={handleEditChange} />
            </label>
            <label>
              Team 2 ID:
              <input type="text" name="team2_id" value={editingMatch.team2_id} onChange={handleEditChange} />
            </label>
            <label>
              Winner:
              <input type="text" name="winner" value={editingMatch.winner || ''} onChange={handleEditChange} />
            </label>
            <label>
              Stage:
              <input type="text" name="stage" value={editingMatch.stage} onChange={handleEditChange} />
            </label>
            <button type="button" onClick={handleUpdateMatch}>Update Match</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MatchPage;

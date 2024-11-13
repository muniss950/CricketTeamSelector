import React, { useState, useEffect } from 'react';
import cricketMatchService from '../services/cricketMatchServices';
import { TournamentsService } from '../services/tournamentServices';
import { TeamService } from '../services/teamServices';

const MatchPage = () => {
  const [matches, setMatches] = useState([]);
  const [newMatch, setNewMatch] = useState({
    Match_Date: '',
    Tournament_ID: '',
    Team1_ID: '',
    Team2_ID: '',
    Stage: '',
  });
  const [editingMatch, setEditingMatch] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [tournaments, setTournaments] = useState([]);
  const [teams, setTeams] = useState([]); // Store teams data
  const [winner, setWinner] = useState(''); // Track the winner separately for both Add and Edit forms

  // Fetch all matches, tournaments, and teams on component mount
  useEffect(() => {
    fetchMatches();
    fetchTournaments();
    fetchTeams(); // Add this call to fetch teams
  }, []);

  // Fetch matches from the API
  const fetchMatches = async () => {
    try {
      const data = await cricketMatchService.getAllMatches();
      setMatches(data);
    } catch (error) {
      console.error("Error fetching matches:", error);
      setError('Failed to fetch matches');
    }
  };

  // Fetch tournaments from the API
  const fetchTournaments = async () => {
    try {
      const data = await TournamentsService.getAllTournaments();
      setTournaments(data);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
      setError('Failed to fetch tournaments');
    }
  };

  // Fetch teams from the API
  const fetchTeams = async () => {
    try {
      const teamsData = await TeamService.getAllTeams();
      console.log("Teams data: ", teamsData);  // Check the structure of the teams data
      setTeams(teamsData);
    } catch (error) {
      console.error("Error fetching teams:", error);
      setError('Failed to fetch teams');
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

  // Handle winner selection change for Add Match
  const handleWinnerChange = (e) => {
    setWinner(e.target.value);
  };

  // Handle winner selection change for Edit Match
  const handleEditWinnerChange = (e) => {
    setWinner(e.target.value);
  };

  const handleCreateMatch = async () => {
    // Check if all required fields are filled
    if (!newMatch.Match_Date || !newMatch.Tournament_ID || !newMatch.Team1_ID || !newMatch.Team2_ID || !newMatch.Stage || !winner) {
      setError('All fields are required to add a new match.');
      return;
    }

    // Validate Match_Date to ensure it's not empty
    if (newMatch.Match_Date === '') {
      setError('Match Date cannot be empty.');
      return;
    }

    // Format the Match_Date to YYYY-MM-DD if necessary (for MySQL)
    const formattedDate = new Date(newMatch.Match_Date).toISOString().split('T')[0];

    // Proceed if the date is valid
    if (isNaN(new Date(formattedDate))) {
      setError('Invalid date format.');
      return;
    }

    try {
      // Add the match using the service
      await cricketMatchService.addMatch({ ...newMatch, Match_Date: formattedDate, Winner: winner });
      fetchMatches(); // Refresh the match list
      setSuccess(true);
      setNewMatch({
        Match_Date: '',
        Tournament_ID: '',
        Team1_ID: '',
        Team2_ID: '',
        Stage: '',
      });
      setWinner(''); // Reset winner after submitting the form
    } catch (error) {
      console.error("Error adding match:", error);
      setError('Failed to add match');
    }
  };

  const handleUpdateMatch = async () => {
    const updatedMatch = { ...editingMatch };

    // Validate Match_Date to ensure it's not empty
    if (updatedMatch.Match_Date === '') {
      setError('Match Date cannot be empty.');
      return;
    }

    // Format the Match_Date to YYYY-MM-DD if necessary (for MySQL)
    const formattedDate = new Date(updatedMatch.Match_Date).toISOString().split('T')[0];

    // Proceed if the date is valid
    if (isNaN(new Date(formattedDate))) {
      setError('Invalid date format.');
      return;
    }

    // Remove empty or null fields that weren't updated
    Object.keys(updatedMatch).forEach((key) => {
      if (updatedMatch[key] === '' || updatedMatch[key] === null) {
        delete updatedMatch[key];
      }
    });

    // Check if all necessary fields are filled after cleaning
    if (!updatedMatch.Match_Date || !updatedMatch.Tournament_ID || !updatedMatch.Team1_ID || !updatedMatch.Team2_ID || !updatedMatch.Stage || !winner) {
      setError('All fields are required to update the match.');
      return;
    }

    try {
      // Update the match using the service
      await cricketMatchService.updateMatch(editingMatch.Match_ID, { ...updatedMatch, Match_Date: formattedDate, Winner: winner });
      fetchMatches(); // Refresh the match list
      setEditingMatch(null); // Reset editing state
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
            <input type="date" name="Match_Date" value={newMatch.Match_Date} onChange={handleInputChange} />
          </label>
          <label>
            Tournament:
            <select name="Tournament_ID" value={newMatch.Tournament_ID} onChange={handleInputChange}>
              <option value="">Select Tournament</option>
              {tournaments.map(tournament => (
                <option key={tournament.Tournament_ID} value={tournament.Tournament_ID}>{tournament.Tournament_Name}</option>
              ))}
            </select>
          </label>
          <label>
            Team 1:
            <select name="Team1_ID" value={newMatch.Team1_ID} onChange={handleInputChange}>
              <option value="">Select Team 1</option>
              {teams.map(team => (
                <option key={team.Team_ID} value={team.Team_ID}>{team.Team_Name}</option>
              ))}
            </select>
          </label>
          <label>
            Team 2:
            <select name="Team2_ID" value={newMatch.Team2_ID} onChange={handleInputChange}>
              <option value="">Select Team 2</option>
              {teams.map(team => (
                <option key={team.Team_ID} value={team.Team_ID}>{team.Team_Name}</option>
              ))}
            </select>
          </label>
          <label>
            Winner:
            <select name="Winner" value={winner} onChange={handleWinnerChange}>
              <option value="">Select Winner</option>
              {newMatch.Team1_ID && newMatch.Team2_ID && (
                <>
                  <option value={newMatch.Team1_ID}>
                    {teams.find(team => team.Team_ID === newMatch.Team1_ID)?.Team_Name}
                  </option>
                  <option value={newMatch.Team2_ID}>
                    {teams.find(team => team.Team_ID === newMatch.Team2_ID)?.Team_Name}
                  </option>
                </>
              )}
            </select>
          </label>
          <label>
            Stage:
            <input type="text" name="Stage" value={newMatch.Stage} onChange={handleInputChange} />
          </label>
          <button type="button" onClick={handleCreateMatch}>Add Match</button>
        </form>
      </div>

      {/* Matches list */}
      <div>
        <h3>Match List</h3>
        <ul>
          {matches.map((match) => (
            <li key={match.Match_ID}>
              <p>{match.Match_Date} - {match.Team1_Name} vs {match.Team2_Name} - Winner: {match.Winner_Name}</p>
              <button onClick={() => handleDeleteMatch(match.Match_ID)}>Delete</button>
              <button onClick={() => setEditingMatch(match)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Form for editing an existing match */}
      {editingMatch && (
        <div>
          <h3>Edit Match</h3>
          <form>
            <label>
              Match Date:
              <input type="date" name="Match_Date" value={editingMatch.Match_Date} onChange={handleEditChange} />
            </label>
            <label>
              Tournament:
              <select name="Tournament_ID" value={editingMatch.Tournament_ID} onChange={handleEditChange}>
                <option value="">Select Tournament</option>
                {tournaments.map(tournament => (
                  <option key={tournament.Tournament_ID} value={tournament.Tournament_ID}>{tournament.Tournament_Name}</option>
                ))}
              </select>
            </label>
            <label>
              Team 1:
              <select name="Team1_ID" value={editingMatch.Team1_ID} onChange={handleEditChange}>
                <option value="">Select Team 1</option>
                {teams.map(team => (
                  <option key={team.Team_ID} value={team.Team_ID}>{team.Team_Name}</option>
                ))}
              </select>
            </label>
            <label>
              Team 2:
              <select name="Team2_ID" value={editingMatch.Team2_ID} onChange={handleEditChange}>
                <option value="">Select Team 2</option>
                {teams.map(team => (
                  <option key={team.Team_ID} value={team.Team_ID}>{team.Team_Name}</option>
                ))}
              </select>
            </label>
            <label>
              Winner:
              <select name="Winner" value={winner} onChange={handleEditWinnerChange}>
                <option value="">Select Winner</option>
                <option value={editingMatch.Team1_ID}>
                  {teams.find(team => team.Team_ID === editingMatch.Team1_ID)?.Team_Name}
                </option>
                <option value={editingMatch.Team2_ID}>
                  {teams.find(team => team.Team_ID === editingMatch.Team2_ID)?.Team_Name}
                </option>
              </select>
            </label>
            <label>
              Stage:
              <input type="text" name="Stage" value={editingMatch.Stage} onChange={handleEditChange} />
            </label>
            <button type="button" onClick={handleUpdateMatch}>Update Match</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MatchPage;

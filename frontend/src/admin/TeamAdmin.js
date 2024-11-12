
import React, { useEffect, useState } from 'react';
import { TeamService } from '../services/teamServices';

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [newTeam, setNewTeam] = useState({ Team_Name: '', Team_Type: '', Captain_ID: '' });
  const [editTeam, setEditTeam] = useState(null);
  const [error, setError] = useState(null);

  // Fetch all teams when the component mounts
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const data = await TeamService.getAllTeams();
      setTeams(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSelectTeam = async (teamId) => {
    try {
      const team = await TeamService.getTeamById(teamId);
      setSelectedTeam(team);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddTeam = async () => {
    try {
      const addedTeam = await TeamService.addTeam(newTeam.Team_Name, newTeam.Team_Type, newTeam.Captain_ID);
      setTeams([...teams, addedTeam]);
      setNewTeam({ Team_Name: '', Team_Type: '', Captain_ID: '' });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateTeam = async () => {
    if (editTeam) {
      try {
        const updatedTeam = await TeamService.updateTeam(editTeam.Team_ID, editTeam.Team_Name, editTeam.Team_Type, editTeam.Captain_ID);
        setTeams(teams.map((team) => (team.Team_ID === updatedTeam.Team_ID ? updatedTeam : team)));
        setEditTeam(null);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleDeleteTeam = async (teamId) => {
    try {
      await TeamService.deleteTeam(teamId);
      setTeams(teams.filter((team) => team.Team_ID !== teamId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Teams</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display all teams */}
      <ul>
        {teams.map((team) => (
          <li key={team.Team_ID}>
            {team.Team_Name} - {team.Team_Type} 
            <button onClick={() => handleSelectTeam(team.Team_ID)}>View</button>
            <button onClick={() => setEditTeam({ ...team })}>Edit</button>
            <button onClick={() => handleDeleteTeam(team.Team_ID)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Add new team form */}
      <h2>Add New Team</h2>
      <input
        type="text"
        placeholder="Team Name"
        value={newTeam.Team_Name}
        onChange={(e) => setNewTeam({ ...newTeam, Team_Name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Team Type"
        value={newTeam.Team_Type}
        onChange={(e) => setNewTeam({ ...newTeam, Team_Type: e.target.value })}
      />
      <input
        type="number"
        placeholder="Captain ID"
        value={newTeam.Captain_ID}
        onChange={(e) => setNewTeam({ ...newTeam, Captain_ID: e.target.value })}
      />
      <button onClick={handleAddTeam}>Add Team</button>

      {/* Edit team form */}
      {editTeam && (
        <>
          <h2>Edit Team</h2>
          <input
            type="text"
            value={editTeam.Team_Name}
            onChange={(e) => setEditTeam({ ...editTeam, Team_Name: e.target.value })}
          />
          <input
            type="text"
            value={editTeam.Team_Type}
            onChange={(e) => setEditTeam({ ...editTeam, Team_Type: e.target.value })}
          />
          <input
            type="number"
            value={editTeam.Captain_ID}
            onChange={(e) => setEditTeam({ ...editTeam, Captain_ID: e.target.value })}
          />
          <button onClick={handleUpdateTeam}>Save</button>
          <button onClick={() => setEditTeam(null)}>Cancel</button>
        </>
      )}

      {/* Display selected team details */}
      {selectedTeam && (
        <>
          <h2>Team Details</h2>
          <p>Name: {selectedTeam.Team_Name}</p>
          <p>Type: {selectedTeam.Team_Type}</p>
          <p>Captain ID: {selectedTeam.Captain_ID}</p>
          <button onClick={() => setSelectedTeam(null)}>Close</button>
        </>
      )}
    </div>
  );
};

export default TeamsPage;

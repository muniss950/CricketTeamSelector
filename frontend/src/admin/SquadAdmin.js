import React, { useEffect, useState } from 'react';
import { SquadService } from '../services/squadServices';
import { TeamService } from '../services/teamServices';
import { PlayerService } from '../services/playerServices';
import TableComponent from './TableAdmin'; // Import the new TableComponent

const SquadPage = () => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [squadEntries, setSquadEntries] = useState([]);
  const [newSquadEntry, setNewSquadEntry] = useState({ Player_ID: '' });
  const [error, setError] = useState(null);
  const [isTeamDone, setIsTeamDone] = useState(false); // Track if team task is done

  useEffect(() => {
    fetchTeams();
    fetchPlayers();
  }, []);

  // Fetch teams
  const fetchTeams = async () => {
    try {
      const teamList = await TeamService.getAllTeams();
      setTeams(teamList);
    } catch (error) {
      setError(error.message);
    }
  };

  // Fetch players for dropdown selection
  const fetchPlayers = async () => {
    try {
      const playerList = await PlayerService.getPlayers();
      setPlayers(playerList);
    } catch (error) {
      setError(error.message);
    }
  };

  // Fetch squad entries for a selected team
  const fetchSquadEntries = async (teamId) => {
    try {
      const entries = await SquadService.getAllSquadEntries();
      const filteredEntries = entries.filter((entry) => entry.Team_ID === teamId);
      setSquadEntries(filteredEntries);
      setSelectedTeam(teamId);
      setIsTeamDone(false); // Reset the "done" state when selecting a new team
    } catch (error) {
      setError(error.message);
    }
  };

  // Add a new squad entry
  const handleAddSquadEntry = async () => {
    if (!newSquadEntry.Player_ID) {
      setError('Please select a player.');
      return;
    }

    try {
      // Fetch player details from PlayerService using getPlayer
      const player = await PlayerService.getPlayer(newSquadEntry.Player_ID);
      if (!player) {
        setError('Player not found.');
        return;
      }

      // Add the squad entry
      const addedEntry = await SquadService.addSquadEntry(newSquadEntry.Player_ID, selectedTeam);

      // Update squadEntries with the player details
      setSquadEntries([
        ...squadEntries,
        { Player_ID: player.Player_ID, Player_Name: player.Player_Name },
      ]);

      setNewSquadEntry({ Player_ID: '' }); // Reset player selection
      setError(null); // Clear error
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete a squad entry
  const handleDeleteSquadEntry = async (playerId) => {
    try {
      await SquadService.deleteSquadEntry(playerId, selectedTeam);
      setSquadEntries(squadEntries.filter((entry) => entry.Player_ID !== playerId));
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle row click if needed (e.g., edit squad entry)
  const handleRowClick = (entry) => {
    console.log('Row clicked:', entry);
    // You can add more actions like editing the squad entry here
  };

  // Handle button click (Delete or other actions)
  const handleButtonClick = (action, item) => {
    if (action === 'delete') {
      handleDeleteSquadEntry(item.Player_ID);
    }
    // Handle other actions here
  };

  // Mark the team task as done
  const handleMarkAsDone = () => {
    setIsTeamDone(true); // Mark the task as done for this team
  };

  // Button configuration for the team table
  const teamButtons = [
    { label: 'View Squad', action: 'view' }
  ];

  // Button configuration for the squad table
  const squadButtons = [
    { label: 'Delete', action: 'delete' }
  ];

  return (
    <div>
      <h1>Teams</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Team List Table */}
      <h2>Select a Team to View/Edit Squad</h2>
      <TableComponent
        data={teams}
        columns={['Team_Name']}
        onRowClick={(team) => fetchSquadEntries(team.Team_ID)} // Fetch squad entries when a team is clicked
        onButtonClick={(action, item) => {
          if (action === 'view') {
            fetchSquadEntries(item.Team_ID);
          }
        }}
        buttons={teamButtons}
      />

      {/* Squad Table for Selected Team */}
      {selectedTeam && !isTeamDone && (
        <>
          <h2>Squad for Team {teams.find((team) => team.Team_ID === selectedTeam)?.Team_Name}</h2>

          {/* Use TableComponent for squad entries */}
          <TableComponent 
            data={squadEntries} 
            onRowClick={handleRowClick} 
            onButtonClick={handleButtonClick} // Pass the button click handler to TableComponent
            buttons={squadButtons} // Passing the delete button configuration
          />

          {/* Add New Squad Entry */}
          <h3>Add New Squad Entry</h3>
          <select
            value={newSquadEntry.Player_ID}
            onChange={(e) => setNewSquadEntry({ Player_ID: e.target.value })}
          >
            <option value="">Select Player</option>
            {players.map((player) => (
              <option key={player.Player_ID} value={player.Player_ID}>
                {player.Player_Name}
              </option>
            ))}
          </select>
          <button onClick={handleAddSquadEntry}>Add Squad Entry</button>

          {/* Mark as Done Button */}
          <div>
            {!isTeamDone ? (
              <button onClick={handleMarkAsDone}>Mark as Done</button>
            ) : (
              <p>Task for this team is complete!</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SquadPage;

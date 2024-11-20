import { useState, useEffect } from 'react';
import { PlayerService } from '../services/playerServices'; // Assuming playerService.js is in the same directory

const PlayerPage = () => {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({
    Player_Name: '',
    Gender: '',
    Role: '',
    Team_ID: '',
    DOB: '',
  });
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [error, setError] = useState(null); // Error state
  const [success, setSuccess] = useState(false); // Success state

  // Fetch all players
  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const playersData = await PlayerService.getPlayers();
      setPlayers(playersData);
    } catch (error) {
      console.error('Error fetching players:', error);
      setError(error?.response?.data?.error || 'Failed to fetch players');
    }
  };

  // Create new player
  const handleCreatePlayer = async () => {
    // Ensure required fields are not empty
    if (!newPlayer.Player_Name || !newPlayer.Team_ID || !newPlayer.DOB) {
      setError('Player Name, Team ID, and Date of Birth are required.');
      return;
    }

    try {
      const createdPlayer = await PlayerService.createPlayer(newPlayer);
      setPlayers([...players, createdPlayer]);
      setNewPlayer({
        Player_Name: '',
        Gender: '',
        Role: '',
        Team_ID: '',
        DOB: '',
      });
      setSuccess(true);
      setError(null); // Clear any previous error
    } catch (error) {
      setError(error?.response?.data?.error || 'Failed to create player');
    }
  };

  // Update player
  const handleUpdatePlayer = async () => {
    if (!editingPlayer.Player_Name || !editingPlayer.Team_ID || !editingPlayer.DOB) {
      setError('Player Name, Team ID, and Date of Birth are required.');
      return;
    }

    try {
      const updatedPlayer = await PlayerService.updatePlayer(editingPlayer.Player_ID, editingPlayer);
      const updatedPlayers = players.map(player =>
        player.Player_ID === updatedPlayer.Player_ID ? updatedPlayer : player
      );
      setPlayers(updatedPlayers);
      setEditingPlayer(null); // Reset editing state
      setSuccess(true);
      setError(null); // Clear any previous error
    } catch (error) {
      setError(error?.response?.data?.error || 'Failed to update player');
    }
  };

  // Delete player
  const handleDeletePlayer = async (playerId) => {
    try {
      await PlayerService.deletePlayer(playerId);
      setPlayers(players.filter(player => player.Player_ID !== playerId));
      setSuccess(true);
      setError(null); // Clear any previous error
    } catch (error) {
      setError(error?.response?.data?.error || 'Failed to delete player');
    }
  };

  // Start editing player
  const handleEditPlayer = (player) => {
    setEditingPlayer(player);
  };

  // Handle form input changes for both new player and editing
  const handleChange = (e, field) => {
    const value = e.target.value;
    if (editingPlayer) {
      setEditingPlayer({ ...editingPlayer, [field]: value });
    } else {
      setNewPlayer({ ...newPlayer, [field]: value });
    }
  };

  return (
    <div>
      <h1>Player Management</h1>
      
      {/* Display error or success message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Operation successful!</p>}

      <h2>Create New Player</h2>
      <input
        type="text"
        placeholder="Player Name"
        value={newPlayer.Player_Name}
        onChange={(e) => handleChange(e, 'Player_Name')}
      />
      <select
        name="Gender"
        value={newPlayer.Gender}
        onChange={(e) => handleChange(e, 'Gender')}
      >
        <option value="">Select Gender</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
        <option value="O">Other</option>
      </select>
      <select
        name="Role"
        value={newPlayer.Role}
        onChange={(e) => handleChange(e, 'Role')}
      >
        <option value="">Select Role</option>
        <option value="Bowler">Bowler</option>
        <option value="Batsman">Batsman</option>
        <option value="Wicket-Keeper Batsman">Wicket-Keeper Batsman</option>
        <option value="All-Rounder">All-Rounder</option>
      </select>
      <input
        type="number"
        placeholder="Team ID"
        value={newPlayer.Team_ID}
        onChange={(e) => handleChange(e, 'Team_ID')}
      />
      <input
        type="date"
        placeholder="Date of Birth"
        value={newPlayer.DOB}
        onChange={(e) => handleChange(e, 'DOB')}
      />
      <button onClick={handleCreatePlayer}>Create Player</button>

      {editingPlayer && (
        <div>
          <h2>Edit Player</h2>
          <input
            type="text"
            placeholder="Player Name"
            value={editingPlayer.Player_Name}
            onChange={(e) => handleChange(e, 'Player_Name')}
          />
          <select
            name="Gender"
            value={editingPlayer.Gender}
            onChange={(e) => handleChange(e, 'Gender')}
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
          <select
            name="Role"
            value={editingPlayer.Role}
            onChange={(e) => handleChange(e, 'Role')}
          >
            <option value="">Select Role</option>
            <option value="Bowler">Bowler</option>
            <option value="Batsman">Batsman</option>
            <option value="Wicket-Keeper Batsman">Wicket-Keeper Batsman</option>
            <option value="All-Rounder">All-Rounder</option>
          </select>
          <input
            type="number"
            placeholder="Team ID"
            value={editingPlayer.Team_ID}
            onChange={(e) => handleChange(e, 'Team_ID')}
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={editingPlayer.DOB}
            onChange={(e) => handleChange(e, 'DOB')}
          />
          <button onClick={handleUpdatePlayer}>Update Player</button>
        </div>
      )}

      <h2>Player List</h2>
      <ul>
        {players.map((player) => (
          <li key={player.Player_ID}>
            {player.Player_Name} - {player.Team_ID}
            <button onClick={() => handleEditPlayer(player)}>Edit</button>
            <button onClick={() => handleDeletePlayer(player.Player_ID)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerPage;


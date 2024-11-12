
import React, { useEffect, useState } from 'react';
import { SquadService } from '../services/squadServices';

const SquadPage = () => {
  const [squadEntries, setSquadEntries] = useState([]);
  const [selectedSquadEntry, setSelectedSquadEntry] = useState(null);
  const [newSquadEntry, setNewSquadEntry] = useState({ Player_ID: '', Team_ID: '', Match_ID: '' });
  const [editSquadEntry, setEditSquadEntry] = useState(null);
  const [error, setError] = useState(null);

  // Fetch all squad entries when the component mounts
  useEffect(() => {
    fetchSquadEntries();
  }, []);

  const fetchSquadEntries = async () => {
    try {
      const data = await SquadService.getAllSquadEntries();
      setSquadEntries(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSelectSquadEntry = async (playerId, teamId, matchId) => {
    try {
      const entry = await SquadService.getSquadEntry(playerId, teamId, matchId);
      setSelectedSquadEntry(entry);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddSquadEntry = async () => {
    try {
      const addedEntry = await SquadService.addSquadEntry(newSquadEntry.Player_ID, newSquadEntry.Team_ID, newSquadEntry.Match_ID);
      setSquadEntries([...squadEntries, addedEntry]);
      setNewSquadEntry({ Player_ID: '', Team_ID: '', Match_ID: '' });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateSquadEntry = async () => {
    if (editSquadEntry) {
      try {
        const updatedEntry = await SquadService.updateSquadEntry(
          editSquadEntry.Player_ID,
          editSquadEntry.Team_ID,
          editSquadEntry.Match_ID,
          editSquadEntry.Player_ID,
          editSquadEntry.Team_ID,
          editSquadEntry.Match_ID
        );
        setSquadEntries(
          squadEntries.map((entry) =>
            entry.Player_ID === updatedEntry.Player_ID &&
            entry.Team_ID === updatedEntry.Team_ID &&
            entry.Match_ID === updatedEntry.Match_ID
              ? updatedEntry
              : entry
          )
        );
        setEditSquadEntry(null);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleDeleteSquadEntry = async (playerId, teamId, matchId) => {
    try {
      await SquadService.deleteSquadEntry(playerId, teamId, matchId);
      setSquadEntries(squadEntries.filter((entry) => entry.Player_ID !== playerId || entry.Team_ID !== teamId || entry.Match_ID !== matchId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Squad Entries</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display all squad entries */}
      <ul>
        {squadEntries.map((entry) => (
          <li key={`${entry.Player_ID}-${entry.Team_ID}-${entry.Match_ID}`}>
            Player ID: {entry.Player_ID}, Team ID: {entry.Team_ID}, Match ID: {entry.Match_ID}
            <button onClick={() => handleSelectSquadEntry(entry.Player_ID, entry.Team_ID, entry.Match_ID)}>View</button>
            <button onClick={() => setEditSquadEntry({ ...entry })}>Edit</button>
            <button onClick={() => handleDeleteSquadEntry(entry.Player_ID, entry.Team_ID, entry.Match_ID)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Add new squad entry form */}
      <h2>Add New Squad Entry</h2>
      <input
        type="number"
        placeholder="Player ID"
        value={newSquadEntry.Player_ID}
        onChange={(e) => setNewSquadEntry({ ...newSquadEntry, Player_ID: e.target.value })}
      />
      <input
        type="number"
        placeholder="Team ID"
        value={newSquadEntry.Team_ID}
        onChange={(e) => setNewSquadEntry({ ...newSquadEntry, Team_ID: e.target.value })}
      />
      <input
        type="number"
        placeholder="Match ID"
        value={newSquadEntry.Match_ID}
        onChange={(e) => setNewSquadEntry({ ...newSquadEntry, Match_ID: e.target.value })}
      />
      <button onClick={handleAddSquadEntry}>Add Squad Entry</button>

      {/* Edit squad entry form */}
      {editSquadEntry && (
        <>
          <h2>Edit Squad Entry</h2>
          <input
            type="number"
            value={editSquadEntry.Player_ID}
            onChange={(e) => setEditSquadEntry({ ...editSquadEntry, Player_ID: e.target.value })}
          />
          <input
            type="number"
            value={editSquadEntry.Team_ID}
            onChange={(e) => setEditSquadEntry({ ...editSquadEntry, Team_ID: e.target.value })}
          />
          <input
            type="number"
            value={editSquadEntry.Match_ID}
            onChange={(e) => setEditSquadEntry({ ...editSquadEntry, Match_ID: e.target.value })}
          />
          <button onClick={handleUpdateSquadEntry}>Save</button>
          <button onClick={() => setEditSquadEntry(null)}>Cancel</button>
        </>
      )}

      {/* Display selected squad entry details */}
      {selectedSquadEntry && (
        <>
          <h2>Squad Entry Details</h2>
          <p>Player ID: {selectedSquadEntry.Player_ID}</p>
          <p>Team ID: {selectedSquadEntry.Team_ID}</p>
          <p>Match ID: {selectedSquadEntry.Match_ID}</p>
          <button onClick={() => setSelectedSquadEntry(null)}>Close</button>
        </>
      )}
    </div>
  );
};

export default SquadPage;

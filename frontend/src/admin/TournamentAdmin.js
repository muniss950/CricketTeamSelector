
import React, { useState, useEffect } from 'react';
import { TournamentsService } from '../services/tournamentsServices';

const TournamentPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [tournamentData, setTournamentData] = useState({
    tournament_name: '',
    format: '',
    level: '',
    start_date: '',
    end_date: '',
  });
  const [editingTournament, setEditingTournament] = useState(null);
  const [error, setError] = useState('');

  // Fetch all tournaments on component mount
  useEffect(() => {
    async function fetchTournaments() {
      try {
        const data = await TournamentsService.getAllTournaments();
        setTournaments(data);
      } catch (error) {
        setError('Failed to fetch tournaments');
      }
    }

    fetchTournaments();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTournamentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to create a new tournament
  const handleCreateTournament = async () => {
    try {
      const newTournament = {
        Tournament_Name: tournamentData.tournament_name,
        Format: tournamentData.format,
        Level: tournamentData.level,
        Start_Date: tournamentData.start_date,
        End_Date: tournamentData.end_date,
      };
      const createdTournament = await TournamentsService.createTournament(newTournament);
      setTournaments((prevTournaments) => [...prevTournaments, createdTournament]);
      setTournamentData({
        tournament_name: '',
        format: '',
        level: '',
        start_date: '',
        end_date: '',
      });
    } catch (error) {
      setError('Failed to create tournament');
    }
  };

  // Handle the deletion of a tournament
  const handleDeleteTournament = async (tournamentId) => {
    try {
      await TournamentsService.deleteTournament(tournamentId);
      setTournaments((prevTournaments) =>
        prevTournaments.filter((tournament) => tournament.Tournament_ID !== tournamentId)
      );
    } catch (error) {
      setError('Failed to delete tournament');
    }
  };

  // Handle form submission to update a tournament
  const handleUpdateTournament = async () => {
    try {
      const updatedTournament = {
        Tournament_Name: tournamentData.tournament_name,
        Format: tournamentData.format,
        Level: tournamentData.level,
        Start_Date: tournamentData.start_date,
        End_Date: tournamentData.end_date,
      };
      const updatedTournamentData = await TournamentsService.updateTournament(
        editingTournament.Tournament_ID,
        updatedTournament
      );
      setTournaments((prevTournaments) =>
        prevTournaments.map((tournament) =>
          tournament.Tournament_ID === editingTournament.Tournament_ID ? updatedTournamentData : tournament
        )
      );
      setEditingTournament(null);
      setTournamentData({
        tournament_name: '',
        format: '',
        level: '',
        start_date: '',
        end_date: '',
      });
    } catch (error) {
      setError('Failed to update tournament');
    }
  };

  // Set the editing tournament's data into the form
  const handleEditTournament = (tournament) => {
    setEditingTournament(tournament);
    setTournamentData({
      tournament_name: tournament.Tournament_Name,
      format: tournament.Format,
      level: tournament.Level,
      start_date: tournament.Start_Date,
      end_date: tournament.End_Date,
    });
  };

  return (
    <div>
      <h1>Tournament Management</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Create/Edit Tournament Form */}
      <div>
        <h3>{editingTournament ? 'Edit Tournament' : 'Add Tournament'}</h3>
        <form>
          <label>
            Tournament Name:
            <input
              type="text"
              name="tournament_name"
              value={tournamentData.tournament_name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Format:
            <input
              type="text"
              name="format"
              value={tournamentData.format}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Level:
            <input
              type="text"
              name="level"
              value={tournamentData.level}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Start Date:
            <input
              type="date"
              name="start_date"
              value={tournamentData.start_date}
              onChange={handleInputChange}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              name="end_date"
              value={tournamentData.end_date}
              onChange={handleInputChange}
            />
          </label>
          <button type="button" onClick={editingTournament ? handleUpdateTournament : handleCreateTournament}>
            {editingTournament ? 'Update Tournament' : 'Create Tournament'}
          </button>
        </form>
      </div>

      {/* Tournaments List */}
      <div>
        <h3>All Tournaments</h3>
        <ul>
          {tournaments.map((tournament) => (
            <li key={tournament.Tournament_ID}>
              <p>
                {tournament.Tournament_Name} - {tournament.Format} - {tournament.Level} - {tournament.Start_Date} to {tournament.End_Date}
              </p>
              <button onClick={() => handleDeleteTournament(tournament.Tournament_ID)}>Delete</button>
              <button onClick={() => handleEditTournament(tournament)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TournamentPage;

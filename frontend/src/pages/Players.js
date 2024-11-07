// Teams.js
import React, { useEffect, useState } from 'react';
import { getPlayers } from '../services/api'; // adjust the import path as needed
import { Link } from 'react-router-dom';
import logo from '../logo1.png'; // Import your logo

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await getPlayers();
        // console.log(response)
        setPlayers(response.data); // Assuming `response.data` contains the teams array
      } catch (err) {
        setError('Failed to fetch teams');
      }
    };

    fetchPlayers();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
            <header className="App-header">
                <div className="logo-container">
                    <img src={logo} alt="CricFreak Logo" className="App-logo" />
                    <h1>CRICFREAK</h1>
                </div>
                <nav className="App-navbar">
                    <ul>
                        <li><Link to="/teams">Teams</Link></li>
                        <li><Link to="/players">Players</Link></li>
                        <li><Link to="/matches">Matches</Link></li>
                        <li><Link to="/tournaments">Tournaments</Link></li>
                    </ul>
                </nav>
                <div className="search-account">
                    <input type="text" placeholder="Search..." className="search-bar" />
                    <button className="login-button">Login</button>
                </div>
            </header>
      <ul>
        {players.map((player) => (
          <li key={player.Player_ID}>
            <strong>{player.Player_Name}</strong> (ID: {player.Player_ID})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Players;




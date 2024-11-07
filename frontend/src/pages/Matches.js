// Teams.js
import React, { useEffect, useState } from 'react';
import { getMatches } from '../services/api'; // adjust the import path as needed
import { Link } from 'react-router-dom';
import logo from '../logo1.png'; // Import your logo

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await getMatches();
        // console.log(response)
        setMatches(response.data); // Assuming `response.data` contains the teams array
      } catch (err) {
        setError('Failed to fetch teams');
      }
    };

    fetchMatches();
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
        {matches.map((match) => (
          <li key={match.Match_ID}>
            <strong>{match.Match_Date}</strong> (ID: {match.Match_ID})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Matches;





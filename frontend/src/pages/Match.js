import React, { useEffect, useState } from 'react';
import { getMatches } from '../services/api'; // adjust the import path as needed
import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo1.png'; // Import your logo
import TableComponent from '../TableComponent.js';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook from React Router v6

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await getMatches();
        console.log(response.data)
        setMatches(response.data); // Assuming `response.data` contains the matches array
      } catch (err) {
        setError('Failed to fetch matches');
      }
    };

    fetchMatches();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  // Handle row click to navigate to the Scorecard page
  const handleRowClick = (matches) => {
    // Navigate to the scorecard page for the selected match
    // You may need to specify the inning number (in this case I am assuming it's 1, but you can modify it as needed)
    const matchId=matches.Match_ID
    console.log("Matchid ",matchId)
    navigate(`/scorecard/${matchId}`);
  };

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

      {/* Pass the matches data to TableComponent and handle row clicks */}
      <TableComponent data={matches} onRowClick={handleRowClick} />
    </div>
  );
};

export default Matches;

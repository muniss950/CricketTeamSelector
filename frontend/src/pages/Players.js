// // Teams.js
// import React, { useEffect, useState } from 'react';
// import { getPlayers } from '../services/api'; // adjust the import path as needed
// import { Link } from 'react-router-dom';
// import logo from '../logo1.png'; // Import your logo
// import TableComponent from '../TableComponent.js'

// const Players = () => {
//   const [players, setPlayers] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPlayers = async () => {
//       try {
//         const response = await getPlayers();
//         // console.log(response)
//         setPlayers(response.data); // Assuming `response.data` contains the teams array
//       } catch (err) {
//         setError('Failed to fetch teams');
//       }
//     };

//     fetchPlayers();
//   }, []);

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//             <header className="App-header">
//                 <div className="logo-container">
//                     <img src={logo} alt="CricFreak Logo" className="App-logo" />
//                     <h1>CRICFREAK</h1>
//                 </div>
//                 <nav className="App-navbar">
//                     <ul>
//                         <li><Link to="/teams">Teams</Link></li>
//                         <li><Link to="/players">Players</Link></li>
//                         <li><Link to="/matches">Matches</Link></li>
//                         <li><Link to="/tournaments">Tournaments</Link></li>
//                     </ul>
//                 </nav>
//                 <div className="search-account">
//                     <input type="text" placeholder="Search..." className="search-bar" />
//                     <button className="login-button">Login</button>
//                 </div>
//             </header>
//       <TableComponent data={players} />
//     </div>
//   );
// };

// export default Players;

// Players.js
import React, { useEffect, useState } from 'react';
import { getPlayers } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo1.png';
import TableComponent from '../TableComponent';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await getPlayers();
        setPlayers(response.data);
      } catch (err) {
        setError('Failed to fetch players');
      }
    };

    fetchPlayers();
  }, []);

  const handleRowClick = (player) => {
    navigate(`/batting/${player.Player_ID}`);  // Adjust key if needed
  };

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
      <TableComponent data={players} onRowClick={handleRowClick} />
    </div>
  );
};

export default Players;

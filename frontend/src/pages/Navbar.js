// Import Link from react-router-dom
import { Link } from 'react-router-dom';

import logo from '../logo1.png'; // Import your logo
const Navbar = () => (
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
);

export default Navbar;


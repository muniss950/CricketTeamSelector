import React from 'react';
import '../App.css';
import logo from '../logo1.png'; // Import your logo
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="App">
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
                    <button  className="login-button"><Link to="/login">
                  Login</Link></button>

                </div>
            </header>
            <div className="App-body">
                <main className="App-content">
                    <h2>Welcome to Cricket Stats</h2>
                    <p>Select a section from the navigation bar to view more details.</p>
                </main>
            </div>
            <footer className="App-footer">
                <p>&copy; 2024 Cricket Stats</p>
            </footer>
        </div>
    );
}

export default Home;

import React from 'react';
import '../App.css';
import logo from '../logo1.png'; // Import your logo
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="App">
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

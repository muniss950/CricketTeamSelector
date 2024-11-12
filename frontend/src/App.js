import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar'; // The navbar component with links
import Home from './pages/Home';
import Teams from './pages/Teams';
import Players from './pages/Players';
import Tournaments from './pages/Tournament';
import Matches from './pages/Match';
import Batting from './pages/batting';
import Scorecard from './pages/Scorecard'; // Import Scorecard page
import LoginPage from './pages/Login.js'
import PlayerPage from './admin/PlayerAdmin';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/players" element={<Players />} />
      <Route path="/tournaments" element={<Tournaments />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/batting/:playerId" element={<Batting />} />
      {/* Route for scorecard page with query parameters */}
      <Route path="/scorecard/:matchId" element={<Scorecard  />} />
      <Route path="/admin/players" element={<PlayerPage />} />
    </Routes>
  </Router>
);

export default App;

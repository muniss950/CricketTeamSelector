// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './pages/Navbar'; // The navbar component with links
// import Home from './pages/Home';
// import Teams from './pages/Teams';
// import Players from './pages/Players';
// import Tournaments from './pages/Tournament';
// import Matches from './pages/Match';
// import Stats from './pages/Stats';
// import Scorecard from './pages/Scorecard'; // Import Scorecard page
// import LoginPage from './pages/Login.js'
// import PlayerPage from './admin/PlayerAdmin';
// import MatchPage from './admin/MatchAdmin';
// import TeamsPage from './admin/TeamAdmin'; 
// import SquadPage from './admin/SquadAdmin';
// import TournamentPage from './admin/TournamentAdmin';

// const App = () => (
//   <Router>
//     <Navbar />
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/teams" element={<Teams />} />
//       <Route path="/players" element={<Players />} />
//       <Route path="/tournaments" element={<Tournaments />} />
//       <Route path="/matches" element={<Matches />} />
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/stats/:playerId" element={<Stats />} />
//       {/* Route for scorecard page with query parameters */}
//       <Route path="/scorecard/:matchId" element={<Scorecard  />} />
//       <Route path="/admin/players" element={<PlayerPage />} />
//       <Route path="/admin/matches" element={<MatchPage />} />
//       <Route path="/admin/teams" element={<TeamsPage />} />
//       <Route path="/admin/squad" element={<SquadPage />} />
//       <Route path="/admin/tournaments" element={<TournamentPage />} />
//     </Routes>
//   </Router>
// );

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Teams from './pages/Teams';
import Players from './pages/Players';
import Tournaments from './pages/Tournament';
import Matches from './pages/Match';
import Stats from './pages/Stats';
import Scorecard from './pages/Scorecard';
import LoginPage from './pages/Login';
import PlayerPage from './admin/PlayerAdmin';
import MatchPage from './admin/MatchAdmin';
import TeamsPage from './admin/TeamAdmin';
import SquadPage from './admin/SquadAdmin';
import TournamentPage from './admin/TournamentAdmin';
import AdminDashboard from './admin/AdminDashboard';

// Optional: Add a simple AdminDashboard component
// const AdminDashboard = () => (
//   <div>
//     <h2>Admin Dashboard</h2>
//     <p>Welcome to the Admin Dashboard! Select a section to manage.</p>
//   </div>
// );

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false); // Track if the user is an admin

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/players" element={<Players />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/login" element={<LoginPage setIsAdmin={setIsAdmin} />} />
        <Route path="/stats/:playerId" element={<Stats />} />
        <Route path="/scorecard/:matchId" element={<Scorecard />} />

        {/* Base Admin route and protected admin routes */}
        {isAdmin ? (
          <>
            <Route path="/admin" element={<AdminDashboard />} /> {/* Base /admin route */}
            <Route path="/admin/players" element={<PlayerPage />} />
            <Route path="/admin/matches" element={<MatchPage />} />
            <Route path="/admin/teams" element={<TeamsPage />} />
            <Route path="/admin/squad" element={<SquadPage />} />
            <Route path="/admin/tournaments" element={<TournamentPage />} />
          </>
        ) : (
          // Redirect unauthorized access to admin pages back to login
          <>
            <Route path="/admin/*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;

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

        {/* Admin routes protected by checking isAdmin */}
        {isAdmin ? (
          <>
            <Route path="/admin/players" element={<PlayerPage />} />
            <Route path="/admin/matches" element={<MatchPage />} />
            <Route path="/admin/teams" element={<TeamsPage />} />
            <Route path="/admin/squad" element={<SquadPage />} />
            <Route path="/admin/tournaments" element={<TournamentPage />} />
          </>
        ) : (
          // Redirect unauthorized access to admin pages back to login
          <>
            <Route path="/admin/players" element={<Navigate to="/login" />} />
            <Route path="/admin/matches" element={<Navigate to="/login" />} />
            <Route path="/admin/teams" element={<Navigate to="/login" />} />
            <Route path="/admin/squad" element={<Navigate to="/login" />} />
            <Route path="/admin/tournaments" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;

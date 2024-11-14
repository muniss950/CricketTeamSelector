import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import PlayerPage from './PlayerPage';
import MatchPage from './MatchPage';
import TeamsPage from './TeamsPage';
import SquadPage from './SquadPage';
import TournamentPage from './TournamentPage';

const Admin = () => (
  <div>
    <h2>Admin Dashboard</h2>
    <nav>
      <ul>
        <li><Link to="players">Manage Players</Link></li>
        <li><Link to="matches">Manage Matches</Link></li>
        <li><Link to="teams">Manage Teams</Link></li>
        <li><Link to="squad">Manage Squad</Link></li>
        <li><Link to="tournaments">Manage Tournaments</Link></li>
      </ul>
    </nav>

    <Routes>
      <Route path="players" element={<PlayerPage />} />
      <Route path="matches" element={<MatchPage />} />
      <Route path="teams" element={<TeamsPage />} />
      <Route path="squad" element={<SquadPage />} />
      <Route path="tournaments" element={<TournamentPage />} />
    </Routes>
  </div>
);

export default Admin;

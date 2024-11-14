import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';
import adminImage from '../admin/administrator.png'; // Adjust the path as needed

const AdminDashboard = () => (
  <div className="admin-dashboard">
    {/* Sidebar with navigation links */}
    <div className="admin-sidebar">
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/admin/players">Manage Players</Link></li>
          <li><Link to="/admin/matches">Manage Matches</Link></li>
          <li><Link to="/admin/teams">Manage Teams</Link></li>
          <li><Link to="/admin/squad">Manage Squad</Link></li>
          <li><Link to="/admin/tournaments">Manage Tournaments</Link></li>
        </ul>
      </nav>
    </div>

    {/* Main content area with centered message and image */}
    <div className="admin-content">
      <h2>Welcome to the Admin Dashboard!</h2>
      <p>Select an option from the sidebar to manage different sections of the application.</p>
      <img src={adminImage} alt="Administrator" />
    </div>
  </div>
);

export default AdminDashboard;

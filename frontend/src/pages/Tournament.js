// Teams.js
import React, { useEffect, useState } from 'react';
import { getTournaments } from '../services/api'; // adjust the import path as needed
import { Link } from 'react-router-dom';
import logo from '../logo1.png'; // Import your logo
import TableComponent from '../TableComponent.js'

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await getTournaments();
        // console.log(response)
        setTournaments(response.data); // Assuming `response.data` contains the teams array
      } catch (err) {
        setError('Failed to fetch teams');
      }
    };

    fetchTournaments();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <TableComponent data={tournaments} />
    </div>
  );
};

export default Tournaments;

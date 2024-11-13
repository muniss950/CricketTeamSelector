
// Players.js
import React, { useEffect, useState } from 'react';
import { getPlayers } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
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
    navigate(`/stats/${player.Player_ID}`);  // Adjust key if needed
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <TableComponent data={players} onRowClick={handleRowClick} />
    </div>
  );
};

export default Players;

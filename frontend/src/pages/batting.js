// pages/BattingStats.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // for accessing URL parameters
import battingService from '../services/playerBattingStatsService'; // Adjust the import path if necessary
import bowlingService from '../services/playerBowlingStatsService'; // Import the new bowling stats service
import TableComponent from '../TableComponent';

const BattingStats = () => {
  const { playerId } = useParams(); // Extract playerId from URL params
  const [battingStats, setBattingStats] = useState([]);
  const [bowlingStats, setBowlingStats] = useState([]);
  const [error, setError] = useState(null);

  // Fetch batting stats
  useEffect(() => {
    const fetchBattingStats = async () => {
      try {
        const response = await battingService.getBattingStatsById(playerId);
        setBattingStats(response && Array.isArray(response) ? response : [response] || []);
      } catch (err) {
        setError("Failed to fetch batting stats");
      }
    };

    fetchBattingStats();
  }, [playerId]);

  // Fetch bowling stats
  useEffect(() => {
    const fetchBowlingStats = async () => {
      try {
        const response = await bowlingService.getBowlingStatsById(playerId);
        setBowlingStats(response && Array.isArray(response) ? response : [response] || []);
      } catch (err) {
        setError("Failed to fetch bowling stats");
      }
    };

    fetchBowlingStats();
  }, [playerId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Batting Stats for Player {playerId}</h2>
      {battingStats.length > 0 ? (
        <TableComponent data={battingStats} />  // Display Batting stats
      ) : (
        <p>Loading Batting Stats...</p>
      )}

      <h2>Bowling Stats for Player {playerId}</h2>
      {bowlingStats.length > 0 ? (
        <TableComponent data={bowlingStats} />  // Display Bowling stats
      ) : (
        <p>Loading Bowling Stats...</p>
      )}
    </div>
  );
};

export default BattingStats;

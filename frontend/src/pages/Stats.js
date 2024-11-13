import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // for accessing URL parameters
import battingService from '../services/playerBattingStatsService'; // Adjust the import path if necessary
import bowlingService from '../services/playerBowlingStatsService'; // Import the new bowling stats service
import TableComponent from '../TableComponent';

const Stats = () => {
  const { playerId } = useParams(); // Extract playerId from URL params
  const [battingStats, setBattingStats] = useState(null);
  const [bowlingStats, setBowlingStats] = useState(null);
  const [error, setError] = useState(null);

  // Fetch batting stats
  useEffect(() => {
    const fetchBattingStats = async () => {
      try {
        const response = await battingService.getBattingStatsById(playerId);
        if (response.message && response.message === "Player batting stats not found") {
          setBattingStats(null);
        } else {
          setBattingStats(Array.isArray(response) ? response : [response]);
        }
      } catch (err) {
        setBattingStats(null);
        // setError("Failed to fetch batting stats");
      }
    };

    fetchBattingStats();
  }, [playerId]);

  // Fetch bowling stats
  useEffect(() => {
    const fetchBowlingStats = async () => {
      try {
        const response = await bowlingService.getBowlingStatsById(playerId);
        if (response.message && response.message === "Player bowling stats not found") {
          setBowlingStats(null);
        } else {
          setBowlingStats(Array.isArray(response) ? response : [response]);
        }
      } catch (err) {
        setBowlingStats(null);
        // setError("Failed to fetch bowling stats");
      }
    };

    fetchBowlingStats();
  }, [playerId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {battingStats ? (
        <>
          <h2>Batting Stats for Player {playerId}</h2>
          <TableComponent data={battingStats} />  {/* Display Batting stats */}
        </>
      ) : bowlingStats ? (
        <>
          <h2>Bowling Stats for Player {playerId}</h2>
          <TableComponent data={bowlingStats} />  {/* Display Bowling stats */}
        </>
      ) : (
        <p>Loading Stats...</p>
      )}
    </div>
  );
};

export default Stats;

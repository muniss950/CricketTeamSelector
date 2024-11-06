// Teams.js
import React, { useEffect, useState } from 'react';
import { getTeams } from '../api'; // adjust the import path as needed

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getTeams();
        // console.log(response)
        setTeams(response.data); // Assuming `response.data` contains the teams array
      } catch (err) {
        setError('Failed to fetch teams');
      }
    };

    fetchTeams();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Teams</h1>
      <ul>
        {teams.map((team) => (
          <li key={team.Team_ID}>
            <strong>{team.Team_Name}</strong> (ID: {team.Team_ID})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Teams;


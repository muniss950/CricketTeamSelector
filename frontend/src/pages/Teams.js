// Teams.js
import React, { useEffect, useState } from 'react';
import { getTeams } from '../services/api'; // adjust the import path as needed
import { Link } from 'react-router-dom';
import logo from '../logo1.png'; // Import your logo
import TableComponent from '../TableComponent.js'

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getTeams();
        console.log(response.data)
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
      <TableComponent data={teams} />
    </div>
  );
};

export default Teams;

      // <ul>
        // {teams.map((team) => (
        //   <li key={team.Team_ID}>
        //     <strong>{team.Team_Name}</strong> (ID: {team.Team_ID})
        //   </li>
        // ))}
    //
      // </ul>

// // batting.js
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom'; // for accessing URL parameters
// import battingService from '../services/battingServices.js'; // adjust the path as needed
// import TableComponent from '../TableComponent.js';

// const BattingStats = () => {
//   const { playerId } = useParams(); // Extract playerId from URL params
//   const [battingStats, setBattingStats] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBattingStats = async () => {
//       try {
//         const response = await battingService.getBattingStatsById(playerId);
//         setBattingStats([response]); // Set data in an array for TableComponent
//       } catch (err) {
//         setError("Failed to fetch batting stats");
//       }
//     };

//     fetchBattingStats();
//   }, [playerId]);

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <h2>Batting Stats for Player {playerId}</h2>
//       {battingStats.length > 0 ? (
//         <TableComponent data={battingStats} />
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default BattingStats;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom'; // for accessing URL parameters
// import battingService from '../services/battingServices'; // Adjust the import path if necessary
// import TableComponent from '../TableComponent';

// const BattingStats = () => {
//   const { playerId } = useParams(); // Extract playerId from URL params
//   const [battingStats, setBattingStats] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBattingStats = async () => {
//       try {
//         const response = await battingService.getBattingStatsById(playerId);
//         console.log(response);  // Log the response here
//         setBattingStats(response); // Set data as a single object (not an array)
//       } catch (err) {
//         setError("Failed to fetch batting stats");
//       }
//     };
  
//     fetchBattingStats();
//   }, [playerId]);
  

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <h2>Batting Stats for Player {playerId}</h2>
//       {battingStats ? (
//         <TableComponent data={[battingStats]} />  // Pass data as an array for the TableComponent
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default BattingStats;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // for accessing URL parameters
import battingService from '../services/battingServices'; // Adjust the import path if necessary
import TableComponent from '../TableComponent';

const BattingStats = () => {
  const { playerId } = useParams(); // Extract playerId from URL params
  const [battingStats, setBattingStats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBattingStats = async () => {
      try {
        const response = await battingService.getBattingStatsById(playerId);
        console.log(response);  // Log the response here
        if (response && Array.isArray(response)) {
          setBattingStats(response); // If the response is already an array, set it directly
        } else if (response) {
          setBattingStats([response]); // Wrap single object in an array
        } else {
          setBattingStats([]); // Set empty array if no data
        }
      } catch (err) {
        setError("Failed to fetch batting stats");
      }
    };
  
    fetchBattingStats();
  }, [playerId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Batting Stats for Player {playerId}</h2>
      {battingStats.length > 0 ? (
        <TableComponent data={battingStats} />  // Pass the data array
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BattingStats;

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ScorecardService } from '../services/scorecardServices.js'; // Assuming the service is in the same folder
import TableComponent from '../TableComponent'; // Importing the TableComponent

const Scorecard = () => {
  const [scorecard, setScorecard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const matchId = queryParams.get('match_id');
  const inningNumber = queryParams.get('inning_number');
  console.log(queryParams)
  useEffect(() => {
    if (matchId && inningNumber) {
      ScorecardService.getScorecard(matchId, inningNumber)
        .then((data) => {
          setScorecard(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [matchId, inningNumber]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Scorecard data might have different sections, e.g., Innings, Batting, Bowling
  return (
    <div>
      <h2>Scorecard for Match {matchId} - Inning {inningNumber}</h2>
      {scorecard && (
        <div>
          {/* Render different sections of the scorecard using TableComponent */}
          {scorecard.Inning && (
            <div>
              <h3>Inning</h3>
              <TableComponent data={scorecard.Inning} />
            </div>
          )}
          {scorecard.Batting && (
            <div>
              <h3>Batting</h3>
              <TableComponent data={scorecard.Batting} />
            </div>
          )}
          {scorecard.Bowling && (
            <div>
              <h3>Bowling</h3>
              <TableComponent data={scorecard.Bowling} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Scorecard;

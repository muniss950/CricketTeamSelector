import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ScorecardService } from '../services/scorecardServices';
import TableComponent from '../TableComponent';

const ScorecardPage = () => {
  const { matchId } = useParams(); // Extracting matchId from URL
  const [inning1Data, setInning1Data] = useState({
    inningInfo: [],
    batting: [],
    bowling: [],
  });
  const [inning2Data, setInning2Data] = useState({
    inningInfo: [],
    batting: [],
    bowling: [],
  });
  const [loading, setLoading] = useState(true);

  // Fetch data for both innings
  useEffect(() => {
    const fetchInningsData = async () => {
      try {
        // Fetching inning 1 data
        const inning1Scorecard = await ScorecardService.getScorecard(matchId, 1);
        const d1=inning1Scorecard
        console.log("inning1 ",d1)
        setInning1Data({
          inningInfo: d1.data.Inning,
          batting: d1.data.Batting,
          bowling: d1.data.Bowling,
        });

        // Fetching inning 2 data
        const inning2Scorecard = await ScorecardService.getScorecard(matchId, 2);
        setInning2Data({
          inningInfo: inning2Scorecard.Inning,
          batting: inning2Scorecard.Batting,
          bowling: inning2Scorecard.Bowling,
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching scorecard data:', error);
        setLoading(false);
      }
    };

    fetchInningsData();
  }, [matchId]);

  // If loading, display loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(inning1Data)
  return (
    <div>
      <h2>Scorecard for Match {matchId}</h2>

      {/* Inning 1 Tables */}
      <h3>Inning 1 Information</h3>
      <TableComponent data={inning1Data.inningInfo} />
      <h3>Inning 1 Batting Score</h3>
      <TableComponent data={inning1Data.batting} />
      <h3>Inning 1 Bowling Score</h3>
      <TableComponent data={inning1Data.bowling} />

      {/* Inning 2 Tables */}
      <h3>Inning 2 Information</h3>
      <TableComponent data={inning2Data.inningInfo} />
      <h3>Inning 2 Batting Score</h3>
      <TableComponent data={inning2Data.batting} />
      <h3>Inning 2 Bowling Score</h3>
      <TableComponent data={inning2Data.bowling} />
    </div>
  );
};

export default ScorecardPage;

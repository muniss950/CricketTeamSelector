import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ScorecardService } from '../services/scorecardServices';
import TableComponent from '../TableComponent';

const ScorecardPage = () => {
  const { matchId } = useParams(); // Extracting matchId from URL
  const [inning1Data, setInning1Data] = useState({
    inningInfo: {},
    batting: [],
    bowling: [],
  });
  const [inning2Data, setInning2Data] = useState({
    inningInfo: {},
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
        const d1 = inning1Scorecard
        console.log("inning1 ", d1)
        setInning1Data({
          inningInfo: d1.Inning,
          batting: d1.Batting,
          bowling: d1.Bowling,
        });

        // Fetching inning 2 data
        const inning2Scorecard = await ScorecardService.getScorecard(matchId, 2);
        console.log("inning2 ",inning2Scorecard)
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
  const formatCricketScore = (inningData) => {
    // const { Total_Score, Total_Wickets, Overs } = inningData;


    const Total_Score=inningData.Total_Score;
    const Total_Wickets=inningData.Total_Wickets;
    const Overs=inningData.Overs;
    console.log("inside format: ",inningData)
    // Format overs to "x.y" format
    const formattedOvers = Overs; 
      // != null ? `${Math.floor(Overs)}.${(Overs % 1) * 6}` : 'N/A';


    // Return the formatted score
    return `${Total_Score != null ? Total_Score : 'N/A'}/${Total_Wickets != null ? Total_Wickets : 'N/A'} (${formattedOvers})`;
  };

  // <TableComponent data={inning1Data.inningInfo} />
  // <TableComponent data={inning2Data.inningInfo} />
  // console.log(inning1Data.inningInfo)
  return (

    <div>
      <h2>Scorecard for Match {matchId}</h2>

      {/* Inning 1 Tables */}
      <h3>Inning 1 Information</h3>
      <div>
        <h3>Cricket Score: {formatCricketScore(inning1Data.inningInfo)}</h3>
      </div>
      <h3>Inning 1 Batting Score</h3>
      <TableComponent data={inning1Data.batting} />
      <h3>Inning 1 Bowling Score</h3>
      <TableComponent data={inning1Data.bowling} />

      {/* Inning 2 Tables */}
      <h3>Inning 2 Information</h3>
        <h3>Cricket Score: {formatCricketScore(inning2Data.inningInfo)}</h3>
      <h3>Inning 2 Batting Score</h3>
      <TableComponent data={inning2Data.batting} />
      <h3>Inning 2 Bowling Score</h3>
      <TableComponent data={inning2Data.bowling} />
    </div>
  );
};

export default ScorecardPage;


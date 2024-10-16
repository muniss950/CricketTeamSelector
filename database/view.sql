CREATE OR REPLACE VIEW Player_Batting_Stats AS
SELECT 
    b.Player_ID,
    p.Player_Name, -- Assuming there's a Player_Name column in the Player table
    COUNT(DISTINCT b.Match_ID) AS Matches_Played,
    SUM(b.Runs_Scored) AS Total_Runs,
    SUM(b.Balls_Faced) AS Total_Balls,
    SUM(b.Fours) AS Total_Fours,
    SUM(b.Sixes) AS Total_Sixes,
    AVG(b.Runs_Scored) AS Average_Runs_Scored -- Average runs scored
FROM 
    Batting b
JOIN 
    Player p ON b.Player_ID = p.Player_ID
GROUP BY 
    b.Player_ID, p.Player_Name;

CREATE OR REPLACE VIEW Player_Bowling_Stats AS
SELECT 
    b.Player_ID,
    p.Player_Name, -- Assuming there's a Player_Name column in the Player table
    COUNT(DISTINCT b.Match_ID) AS Matches_Played,
    SUM(b.Overs_Bowled) AS Total_Overs_Bowled,
    SUM(b.Balls_Bowled) AS Total_Balls_Bowled,
    SUM(b.Runs_Conceded) AS Total_Runs_Conceded,
    SUM(b.Wickets_Taken) AS Total_Wickets_Taken,
    SUM(b.Maiden_Overs) AS Total_Maiden_Overs -- Total maiden overs
FROM 
    Bowling b
JOIN 
    Player p ON b.Player_ID = p.Player_ID
GROUP BY 
    b.Player_ID, p.Player_Name;


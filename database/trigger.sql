DELIMITER $$

CREATE TRIGGER after_ball_insert
AFTER INSERT ON ball_by_ball
FOR EACH ROW
BEGIN
    DECLARE total_runs INT DEFAULT 0;
    DECLARE total_wickets INT DEFAULT 0;
    DECLARE total_balls INT DEFAULT 0;

    INSERT INTO Inning (Match_ID, Inning_Number, Total_Score, Total_Wickets, Overs)
    VALUES (NEW.Match_ID, NEW.Inning_Number, 0, 0, 0)
    ON DUPLICATE KEY UPDATE
        Total_Score = Total_Score;

    INSERT INTO Batting (Match_ID, Inning_Number, Player_ID, Runs_Scored, Balls_Faced, Fours, Sixes)
    VALUES (NEW.Match_ID, NEW.Inning_Number, NEW.on_strike, 0, 0, 0, 0)
    ON DUPLICATE KEY UPDATE
        Runs_Scored = Runs_Scored;

    INSERT INTO Bowling (Match_ID, Inning_Number, Player_ID, Overs_Bowled, Balls_Bowled, Runs_Conceded, Wickets_Taken)
    VALUES (NEW.Match_ID, NEW.Inning_Number, NEW.bowler, 0, 0, 0, 0)
    ON DUPLICATE KEY UPDATE
        Runs_Conceded = Runs_Conceded;

    SELECT SUM(run_taken), SUM(wicket), COUNT(*) INTO total_runs, total_wickets, total_balls
    FROM ball_by_ball
    WHERE Match_ID = NEW.Match_ID AND Inning_Number = NEW.Inning_Number;

    UPDATE Inning
    SET Total_Score = total_runs,
        Total_Wickets = total_wickets,
        Overs = FLOOR(total_balls / 6) + (total_balls % 6) / 6.0
    WHERE Match_ID = NEW.Match_ID AND Inning_Number = NEW.Inning_Number;

END$$

DELIMITER ;

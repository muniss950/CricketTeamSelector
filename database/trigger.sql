
DELIMITER $$

CREATE TRIGGER after_ball_insert
AFTER INSERT ON ball_by_ball
FOR EACH ROW
BEGIN
    DECLARE total_runs INT;
    DECLARE total_wickets INT;

    -- Calculate total runs and total wickets for the inning
    SELECT SUM(run_taken) INTO total_runs
    FROM ball_by_ball
    WHERE Match_ID = NEW.Match_ID AND Inning_Number = NEW.Inning_Number;

    SELECT SUM(wicket) INTO total_wickets
    FROM ball_by_ball
    WHERE Match_ID = NEW.Match_ID AND Inning_Number = NEW.Inning_Number;

    -- Update the Inning table
    UPDATE Inning
    SET Total_Score = total_runs,
        Total_Wickets = total_wickets,
        Overs = FLOOR(COUNT(*) / 6) + (COUNT(*) % 6) / 6.0 -- Calculate overs
    WHERE Match_ID = NEW.Match_ID AND Inning_Number = NEW.Inning_Number;
END$$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER after_ball_insert_batting
AFTER INSERT ON ball_by_ball
FOR EACH ROW
BEGIN
    -- Update the batting statistics for the player on strike
    UPDATE Batting
    SET Runs_Scored = Runs_Scored + NEW.run_taken,
        Balls_Faced = Balls_Faced + 1,
        Fours = Fours + IF(NEW.run_taken = 4, 1, 0),
        Sixes = Sixes + IF(NEW.run_taken = 6, 1, 0)
    WHERE Match_ID = NEW.Match_ID
      AND Player_ID = NEW.on_strike;
END$$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER after_ball_insert_bowling
AFTER INSERT ON ball_by_ball
FOR EACH ROW
BEGIN
    -- Update the bowling statistics for the bowler
    UPDATE Bowling
    SET Overs_Bowled = Overs_Bowled + FLOOR(NEW.bowl_no / 6),
        Balls_Bowled = Balls_Bowled + 1,
        Runs_Conceded = Runs_Conceded + NEW.run_taken,
        Wickets_Taken = Wickets_Taken + IF(NEW.wicket = 1, 1, 0)
    WHERE Match_ID = NEW.Match_ID
      AND Player_ID = NEW.bowler;
END$$

DELIMITER ;


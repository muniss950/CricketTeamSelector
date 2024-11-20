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
DELIMITER $$

-- Trigger to ensure Player's DOB is valid (10 years or older)
CREATE TRIGGER before_player_insert_dob_check
BEFORE INSERT ON Player
FOR EACH ROW
BEGIN
    IF NEW.DOB > DATE_SUB(CURDATE(), INTERVAL 10 YEAR) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Player must be at least 10 years old.';
    END IF;
END$$

CREATE TRIGGER before_player_update_dob_check
BEFORE UPDATE ON Player
FOR EACH ROW
BEGIN
    IF NEW.DOB > DATE_SUB(CURDATE(), INTERVAL 10 YEAR) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Player must be at least 10 years old.';
    END IF;
END$$

-- Trigger to ensure Gender is valid ENUM('M', 'F', 'O')
CREATE TRIGGER before_player_insert_gender_check
BEFORE INSERT ON Player
FOR EACH ROW
BEGIN
    IF NEW.Gender NOT IN ('M', 'F', 'O') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Gender must be one of M, F, or O.';
    END IF;
END$$

CREATE TRIGGER before_player_update_gender_check
BEFORE UPDATE ON Player
FOR EACH ROW
BEGIN
    IF NEW.Gender NOT IN ('M', 'F', 'O') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Gender must be one of M, F, or O.';
    END IF;
END$$

-- Trigger to ensure Role is valid
CREATE TRIGGER before_player_insert_role_check
BEFORE INSERT ON Player
FOR EACH ROW
BEGIN
    IF NEW.Role NOT IN ('Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Role must be one of Batsman, Bowler, All-Rounder, or Wicket-Keeper.';
    END IF;
END$$

CREATE TRIGGER before_player_update_role_check
BEFORE UPDATE ON Player
FOR EACH ROW
BEGIN
    IF NEW.Role NOT IN ('Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Role must be one of Batsman, Bowler, All-Rounder, or Wicket-Keeper.';
    END IF;
END$$

-- Trigger to ensure Team_ID exists in Team table
CREATE TRIGGER before_player_insert_team_check
BEFORE INSERT ON Player
FOR EACH ROW
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Team WHERE Team_ID = NEW.Team_ID) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Team_ID does not exist in the Team table.';
    END IF;
END$$

CREATE TRIGGER before_player_update_team_check
BEFORE UPDATE ON Player
FOR EACH ROW
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Team WHERE Team_ID = NEW.Team_ID) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Team_ID does not exist in the Team table.';
    END IF;
END$$

DELIMITER ;


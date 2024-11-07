
DELIMITER //
CREATE PROCEDURE GetPlayerByID(IN p_id INT)
BEGIN
    SELECT * FROM Player WHERE Player_ID = p_id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE InsertPlayer(
    IN p_name VARCHAR(100), 
    IN p_gender CHAR(1), 
    IN p_role VARCHAR(50), 
    IN p_team_id INT, 
    IN p_dob DATE
)
BEGIN
    INSERT INTO Player (Player_Name, Gender, Role, Team_ID, DOB)
    VALUES (p_name, p_gender, p_role, p_team_id, p_dob);
END //
DELIMITER ;


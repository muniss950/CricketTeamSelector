/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.5.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: cricket
-- ------------------------------------------------------
-- Server version	11.5.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `Batting`
--

DROP TABLE IF EXISTS `Batting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Batting` (
  `Player_ID` int(11) NOT NULL,
  `Match_ID` int(11) NOT NULL,
  `Runs_Scored` int(11) DEFAULT 0,
  `Balls_Faced` int(11) DEFAULT 0,
  `Fours` int(11) DEFAULT 0,
  `Sixes` int(11) DEFAULT 0,
  `Position` int(11) DEFAULT -1,
  PRIMARY KEY (`Player_ID`,`Match_ID`),
  KEY `Match_ID` (`Match_ID`),
  CONSTRAINT `Batting_ibfk_1` FOREIGN KEY (`Player_ID`) REFERENCES `Player` (`Player_ID`),
  CONSTRAINT `Batting_ibfk_2` FOREIGN KEY (`Match_ID`) REFERENCES `Cricket_Match` (`Match_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Batting`
--

LOCK TABLES `Batting` WRITE;
/*!40000 ALTER TABLE `Batting` DISABLE KEYS */;
/*!40000 ALTER TABLE `Batting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Bowling`
--

DROP TABLE IF EXISTS `Bowling`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Bowling` (
  `Player_ID` int(11) NOT NULL,
  `Match_ID` int(11) NOT NULL,
  `Overs_Bowled` int(11) DEFAULT 0,
  `Balls_Bowled` int(11) DEFAULT 0,
  `Runs_Conceded` int(11) DEFAULT 0,
  `Wickets_Taken` int(11) DEFAULT 0,
  `Maiden_Overs` int(11) DEFAULT 0,
  PRIMARY KEY (`Player_ID`,`Match_ID`),
  KEY `Match_ID` (`Match_ID`),
  CONSTRAINT `Bowling_ibfk_1` FOREIGN KEY (`Player_ID`) REFERENCES `Player` (`Player_ID`),
  CONSTRAINT `Bowling_ibfk_2` FOREIGN KEY (`Match_ID`) REFERENCES `Cricket_Match` (`Match_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bowling`
--

LOCK TABLES `Bowling` WRITE;
/*!40000 ALTER TABLE `Bowling` DISABLE KEYS */;
/*!40000 ALTER TABLE `Bowling` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cricket_Match`
--

DROP TABLE IF EXISTS `Cricket_Match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Cricket_Match` (
  `Match_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Match_Date` date NOT NULL,
  `Tournament_ID` int(11) DEFAULT NULL,
  `Team1_ID` int(11) DEFAULT NULL,
  `Team2_ID` int(11) DEFAULT NULL,
  `Winner` int(11) DEFAULT NULL,
  `Stage` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Match_ID`),
  KEY `fkt` (`Tournament_ID`),
  KEY `Team1_ID` (`Team1_ID`),
  KEY `Team2_ID` (`Team2_ID`),
  CONSTRAINT `Cricket_Match_ibfk_1` FOREIGN KEY (`Team1_ID`) REFERENCES `Team` (`Team_ID`),
  CONSTRAINT `Cricket_Match_ibfk_2` FOREIGN KEY (`Team2_ID`) REFERENCES `Team` (`Team_ID`),
  CONSTRAINT `fkt` FOREIGN KEY (`Tournament_ID`) REFERENCES `Tournament` (`Tournament_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cricket_Match`
--

LOCK TABLES `Cricket_Match` WRITE;
/*!40000 ALTER TABLE `Cricket_Match` DISABLE KEYS */;
/*!40000 ALTER TABLE `Cricket_Match` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Inning`
--

DROP TABLE IF EXISTS `Inning`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Inning` (
  `Match_ID` int(11) NOT NULL,
  `Inning_Number` int(11) NOT NULL,
  `Total_Score` int(11) DEFAULT NULL,
  `Overs` float DEFAULT NULL,
  `Total_wickets` int(11) DEFAULT NULL,
  PRIMARY KEY (`Match_ID`,`Inning_Number`),
  CONSTRAINT `fkm` FOREIGN KEY (`Match_ID`) REFERENCES `Cricket_Match` (`Match_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Inning`
--

LOCK TABLES `Inning` WRITE;
/*!40000 ALTER TABLE `Inning` DISABLE KEYS */;
/*!40000 ALTER TABLE `Inning` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Player`
--

DROP TABLE IF EXISTS `Player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Player` (
  `Player_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Player_Name` varchar(100) NOT NULL,
  `Age` int(11) DEFAULT NULL,
  `Gender` enum('M','F','O') DEFAULT NULL,
  `Role` varchar(20) DEFAULT NULL,
  `Team_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`Player_ID`),
  KEY `fkteam` (`Team_ID`),
  CONSTRAINT `fkteam` FOREIGN KEY (`Team_ID`) REFERENCES `Team` (`Team_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Player`
--

LOCK TABLES `Player` WRITE;
/*!40000 ALTER TABLE `Player` DISABLE KEYS */;
/*!40000 ALTER TABLE `Player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `Player_Batting_Stats`
--

DROP TABLE IF EXISTS `Player_Batting_Stats`;
/*!50001 DROP VIEW IF EXISTS `Player_Batting_Stats`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `Player_Batting_Stats` AS SELECT
 1 AS `Player_ID`,
  1 AS `Player_Name`,
  1 AS `Matches_Played`,
  1 AS `Total_Runs`,
  1 AS `Total_Balls`,
  1 AS `Total_Fours`,
  1 AS `Total_Sixes`,
  1 AS `Average_Runs_Scored` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `Player_Bowling_Stats`
--

DROP TABLE IF EXISTS `Player_Bowling_Stats`;
/*!50001 DROP VIEW IF EXISTS `Player_Bowling_Stats`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `Player_Bowling_Stats` AS SELECT
 1 AS `Player_ID`,
  1 AS `Player_Name`,
  1 AS `Matches_Played`,
  1 AS `Total_Overs_Bowled`,
  1 AS `Total_Balls_Bowled`,
  1 AS `Total_Runs_Conceded`,
  1 AS `Total_Wickets_Taken`,
  1 AS `Total_Maiden_Overs` */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Squad`
--

DROP TABLE IF EXISTS `Squad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Squad` (
  `Player_ID` int(11) NOT NULL,
  `Team_ID` int(11) NOT NULL,
  `Match_ID` int(11) NOT NULL,
  PRIMARY KEY (`Player_ID`,`Team_ID`,`Match_ID`),
  KEY `Team_ID` (`Team_ID`),
  KEY `Match_ID` (`Match_ID`),
  CONSTRAINT `Squad_ibfk_1` FOREIGN KEY (`Team_ID`) REFERENCES `Team` (`Team_ID`),
  CONSTRAINT `Squad_ibfk_2` FOREIGN KEY (`Match_ID`) REFERENCES `Cricket_Match` (`Match_ID`),
  CONSTRAINT `fkp` FOREIGN KEY (`Player_ID`) REFERENCES `Player` (`Player_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Squad`
--

LOCK TABLES `Squad` WRITE;
/*!40000 ALTER TABLE `Squad` DISABLE KEYS */;
/*!40000 ALTER TABLE `Squad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Team`
--

DROP TABLE IF EXISTS `Team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Team` (
  `Team_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Team_Name` varchar(100) NOT NULL,
  `Team_Type` varchar(20) DEFAULT NULL,
  `Captain_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`Team_ID`),
  KEY `fkcaptain` (`Captain_ID`),
  CONSTRAINT `fkcaptain` FOREIGN KEY (`Captain_ID`) REFERENCES `Player` (`Player_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Team`
--

LOCK TABLES `Team` WRITE;
/*!40000 ALTER TABLE `Team` DISABLE KEYS */;
/*!40000 ALTER TABLE `Team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Teams_List`
--

DROP TABLE IF EXISTS `Teams_List`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Teams_List` (
  `Team_ID` int(11) NOT NULL,
  `Tournament_ID` int(11) NOT NULL,
  PRIMARY KEY (`Team_ID`,`Tournament_ID`),
  KEY `Tournament_ID` (`Tournament_ID`),
  CONSTRAINT `Teams_List_ibfk_1` FOREIGN KEY (`Team_ID`) REFERENCES `Team` (`Team_ID`),
  CONSTRAINT `Teams_List_ibfk_2` FOREIGN KEY (`Tournament_ID`) REFERENCES `Tournament` (`Tournament_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Teams_List`
--

LOCK TABLES `Teams_List` WRITE;
/*!40000 ALTER TABLE `Teams_List` DISABLE KEYS */;
/*!40000 ALTER TABLE `Teams_List` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tournament`
--

DROP TABLE IF EXISTS `Tournament`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tournament` (
  `Tournament_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Tournament_Name` varchar(100) NOT NULL,
  `Format` varchar(10) DEFAULT NULL,
  `Level` varchar(20) DEFAULT NULL,
  `Start_Date` date DEFAULT NULL,
  `End_Date` date DEFAULT NULL,
  PRIMARY KEY (`Tournament_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tournament`
--

LOCK TABLES `Tournament` WRITE;
/*!40000 ALTER TABLE `Tournament` DISABLE KEYS */;
/*!40000 ALTER TABLE `Tournament` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ball_by_ball`
--

DROP TABLE IF EXISTS `ball_by_ball`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ball_by_ball` (
  `over_no` int(11) NOT NULL,
  `bowl_no` int(11) NOT NULL,
  `run_taken` int(11) DEFAULT NULL,
  `wicket` int(11) DEFAULT NULL,
  `on_strike` int(11) DEFAULT NULL,
  `other_end` int(11) DEFAULT NULL,
  `bowler` int(11) DEFAULT NULL,
  `Match_ID` int(11) NOT NULL,
  `Inning_Number` int(11) NOT NULL,
  PRIMARY KEY (`Match_ID`,`Inning_Number`,`over_no`,`bowl_no`),
  KEY `on_strike` (`on_strike`),
  KEY `other_end` (`other_end`),
  KEY `bowler` (`bowler`),
  CONSTRAINT `ball_by_ball_ibfk_1` FOREIGN KEY (`on_strike`) REFERENCES `Player` (`Player_ID`),
  CONSTRAINT `ball_by_ball_ibfk_2` FOREIGN KEY (`other_end`) REFERENCES `Player` (`Player_ID`),
  CONSTRAINT `ball_by_ball_ibfk_3` FOREIGN KEY (`bowler`) REFERENCES `Player` (`Player_ID`),
  CONSTRAINT `fk` FOREIGN KEY (`Match_ID`, `Inning_Number`) REFERENCES `Inning` (`Match_ID`, `Inning_Number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ball_by_ball`
--

LOCK TABLES `ball_by_ball` WRITE;
/*!40000 ALTER TABLE `ball_by_ball` DISABLE KEYS */;
/*!40000 ALTER TABLE `ball_by_ball` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb3 */ ;
/*!50003 SET character_set_results = utf8mb3 */ ;
/*!50003 SET collation_connection  = utf8mb3_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER after_ball_insert
AFTER INSERT ON ball_by_ball
FOR EACH ROW
BEGIN
    DECLARE total_runs INT;
    DECLARE total_wickets INT;

    
    SELECT SUM(run_taken) INTO total_runs
    FROM ball_by_ball
    WHERE Match_ID = NEW.Match_ID AND Inning_Number = NEW.Inning_Number;

    SELECT SUM(wicket) INTO total_wickets
    FROM ball_by_ball
    WHERE Match_ID = NEW.Match_ID AND Inning_Number = NEW.Inning_Number;

    
    UPDATE Inning
    SET Total_Score = total_runs,
        Total_Wickets = total_wickets,
        Overs = FLOOR(COUNT(*) / 6) + (COUNT(*) % 6) / 6.0 
    WHERE Match_ID = NEW.Match_ID AND Inning_Number = NEW.Inning_Number;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb3 */ ;
/*!50003 SET character_set_results = utf8mb3 */ ;
/*!50003 SET collation_connection  = utf8mb3_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER after_ball_insert_batting
AFTER INSERT ON ball_by_ball
FOR EACH ROW
BEGIN
    
    UPDATE Batting
    SET Runs_Scored = Runs_Scored + NEW.run_taken,
        Balls_Faced = Balls_Faced + 1,
        Fours = Fours + IF(NEW.run_taken = 4, 1, 0),
        Sixes = Sixes + IF(NEW.run_taken = 6, 1, 0)
    WHERE Match_ID = NEW.Match_ID
      AND Player_ID = NEW.on_strike;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb3 */ ;
/*!50003 SET character_set_results = utf8mb3 */ ;
/*!50003 SET collation_connection  = utf8mb3_uca1400_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER after_ball_insert_bowling
AFTER INSERT ON ball_by_ball
FOR EACH ROW
BEGIN
    
    UPDATE Bowling
    SET Overs_Bowled = Overs_Bowled + FLOOR(NEW.bowl_no / 6),
        Balls_Bowled = Balls_Bowled + 1,
        Runs_Conceded = Runs_Conceded + NEW.run_taken,
        Wickets_Taken = Wickets_Taken + IF(NEW.wicket = 1, 1, 0)
    WHERE Match_ID = NEW.Match_ID
      AND Player_ID = NEW.bowler;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `Player_Batting_Stats`
--

/*!50001 DROP VIEW IF EXISTS `Player_Batting_Stats`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb3 */;
/*!50001 SET character_set_results     = utf8mb3 */;
/*!50001 SET collation_connection      = utf8mb3_uca1400_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `Player_Batting_Stats` AS select `b`.`Player_ID` AS `Player_ID`,`p`.`Player_Name` AS `Player_Name`,count(distinct `b`.`Match_ID`) AS `Matches_Played`,sum(`b`.`Runs_Scored`) AS `Total_Runs`,sum(`b`.`Balls_Faced`) AS `Total_Balls`,sum(`b`.`Fours`) AS `Total_Fours`,sum(`b`.`Sixes`) AS `Total_Sixes`,avg(`b`.`Runs_Scored`) AS `Average_Runs_Scored` from (`Batting` `b` join `Player` `p` on(`b`.`Player_ID` = `p`.`Player_ID`)) group by `b`.`Player_ID`,`p`.`Player_Name` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `Player_Bowling_Stats`
--

/*!50001 DROP VIEW IF EXISTS `Player_Bowling_Stats`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb3 */;
/*!50001 SET character_set_results     = utf8mb3 */;
/*!50001 SET collation_connection      = utf8mb3_uca1400_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `Player_Bowling_Stats` AS select `b`.`Player_ID` AS `Player_ID`,`p`.`Player_Name` AS `Player_Name`,count(distinct `b`.`Match_ID`) AS `Matches_Played`,sum(`b`.`Overs_Bowled`) AS `Total_Overs_Bowled`,sum(`b`.`Balls_Bowled`) AS `Total_Balls_Bowled`,sum(`b`.`Runs_Conceded`) AS `Total_Runs_Conceded`,sum(`b`.`Wickets_Taken`) AS `Total_Wickets_Taken`,sum(`b`.`Maiden_Overs`) AS `Total_Maiden_Overs` from (`Bowling` `b` join `Player` `p` on(`b`.`Player_ID` = `p`.`Player_ID`)) group by `b`.`Player_ID`,`p`.`Player_Name` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2024-10-16 16:51:24

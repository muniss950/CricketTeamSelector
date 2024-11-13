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
-- Current Database: `cricket`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `cricket` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `cricket`;

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
  `Inning_Number` int(11) NOT NULL,
  PRIMARY KEY (`Match_ID`,`Player_ID`,`Inning_Number`),
  KEY `fk_batting_player` (`Player_ID`),
  CONSTRAINT `Batting_ibfk_2` FOREIGN KEY (`Match_ID`) REFERENCES `Cricket_Match` (`Match_ID`) ON DELETE CASCADE,
  CONSTRAINT `fk_batting_player` FOREIGN KEY (`Player_ID`) REFERENCES `Player` (`Player_ID`) ON DELETE CASCADE
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
  `Inning_Number` int(11) NOT NULL,
  PRIMARY KEY (`Match_ID`,`Player_ID`,`Inning_Number`),
  KEY `fk_bowling_player` (`Player_ID`),
  CONSTRAINT `Bowling_ibfk_2` FOREIGN KEY (`Match_ID`) REFERENCES `Cricket_Match` (`Match_ID`) ON DELETE CASCADE,
  CONSTRAINT `fk_bowling_player` FOREIGN KEY (`Player_ID`) REFERENCES `Player` (`Player_ID`) ON DELETE CASCADE
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
  KEY `Cricket_Match_ibfk_1` (`Team1_ID`),
  KEY `Cricket_Match_ibfk_2` (`Team2_ID`),
  KEY `fkt` (`Tournament_ID`),
  CONSTRAINT `Cricket_Match_ibfk_1` FOREIGN KEY (`Team1_ID`) REFERENCES `Team` (`Team_ID`) ON DELETE CASCADE,
  CONSTRAINT `Cricket_Match_ibfk_2` FOREIGN KEY (`Team2_ID`) REFERENCES `Team` (`Team_ID`) ON DELETE CASCADE,
  CONSTRAINT `fkt` FOREIGN KEY (`Tournament_ID`) REFERENCES `Tournament` (`Tournament_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  CONSTRAINT `fkm` FOREIGN KEY (`Match_ID`) REFERENCES `Cricket_Match` (`Match_ID`) ON DELETE CASCADE
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
  `Gender` enum('M','F','O') DEFAULT NULL,
  `Role` enum('Bowler','Batsman','Wicker-Keeper Batsman','All-Rounder') DEFAULT NULL,
  `Team_ID` int(11) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  PRIMARY KEY (`Player_ID`),
  KEY `fkteam` (`Team_ID`),
  CONSTRAINT `fkteam` FOREIGN KEY (`Team_ID`) REFERENCES `Team` (`Team_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Player`
--

LOCK TABLES `Player` WRITE;
/*!40000 ALTER TABLE `Player` DISABLE KEYS */;
INSERT INTO `Player` VALUES
(5,'dhoni',NULL,NULL,NULL,NULL),
(6,'kohli',NULL,NULL,NULL,NULL),
(8,'Sachin','M',NULL,NULL,NULL);
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
  PRIMARY KEY (`Player_ID`,`Team_ID`),
  KEY `fk_squad_team` (`Team_ID`),
  CONSTRAINT `fk_squad_player` FOREIGN KEY (`Player_ID`) REFERENCES `Player` (`Player_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_squad_team` FOREIGN KEY (`Team_ID`) REFERENCES `Team` (`Team_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Squad`
--

LOCK TABLES `Squad` WRITE;
/*!40000 ALTER TABLE `Squad` DISABLE KEYS */;
INSERT INTO `Squad` VALUES
(5,1),
(6,1),
(6,6),
(8,6);
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
  CONSTRAINT `fkcaptain` FOREIGN KEY (`Captain_ID`) REFERENCES `Player` (`Player_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Team`
--

LOCK TABLES `Team` WRITE;
/*!40000 ALTER TABLE `Team` DISABLE KEYS */;
INSERT INTO `Team` VALUES
(1,'Mumbai Indians',NULL,NULL),
(4,'DT Titans','T20',NULL),
(6,'GT','T20',5);
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
  KEY `Teams_List_ibfk_2` (`Tournament_ID`),
  CONSTRAINT `Teams_List_ibfk_1` FOREIGN KEY (`Team_ID`) REFERENCES `Team` (`Team_ID`) ON DELETE CASCADE,
  CONSTRAINT `Teams_List_ibfk_2` FOREIGN KEY (`Tournament_ID`) REFERENCES `Tournament` (`Tournament_ID`) ON DELETE CASCADE
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tournament`
--

LOCK TABLES `Tournament` WRITE;
/*!40000 ALTER TABLE `Tournament` DISABLE KEYS */;
INSERT INTO `Tournament` VALUES
(1,'IPL',NULL,NULL,NULL,NULL),
(3,'PSL',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Tournament` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
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
  `extras` enum('NB','W','By','LB','NoExtras') DEFAULT NULL,
  PRIMARY KEY (`Match_ID`,`Inning_Number`,`over_no`,`bowl_no`),
  KEY `ball_by_ball_ibfk_1` (`on_strike`),
  KEY `ball_by_ball_ibfk_2` (`other_end`),
  KEY `ball_by_ball_ibfk_3` (`bowler`),
  CONSTRAINT `ball_by_ball_ibfk_1` FOREIGN KEY (`on_strike`) REFERENCES `Player` (`Player_ID`) ON DELETE CASCADE,
  CONSTRAINT `ball_by_ball_ibfk_2` FOREIGN KEY (`other_end`) REFERENCES `Player` (`Player_ID`) ON DELETE CASCADE,
  CONSTRAINT `ball_by_ball_ibfk_3` FOREIGN KEY (`bowler`) REFERENCES `Player` (`Player_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ball_by_ball`
--

LOCK TABLES `ball_by_ball` WRITE;
/*!40000 ALTER TABLE `ball_by_ball` DISABLE KEYS */;
INSERT INTO `ball_by_ball` VALUES
(1,1,6,0,5,6,8,3,1,NULL);
/*!40000 ALTER TABLE `ball_by_ball` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Current Database: `cricket`
--

USE `cricket`;

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

-- Dump completed on 2024-11-13 16:44:38

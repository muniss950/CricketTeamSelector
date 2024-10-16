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
-- Table structure for table `Cricket_Match`
--

DROP TABLE IF EXISTS `Cricket_Match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Cricket_Match` (
  `Match_ID` int(11) NOT NULL,
  `Match_Date` date NOT NULL,
  `Tournament_ID` int(11) DEFAULT NULL,
  `Venue_ID` int(11) DEFAULT NULL,
  `Team1_ID` int(11) DEFAULT NULL,
  `Team2_ID` int(11) DEFAULT NULL,
  `Winner` int(11) DEFAULT NULL,
  `Stage` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Match_ID`),
  KEY `fkt` (`Tournament_ID`),
  KEY `fkv` (`Venue_ID`),
  KEY `Team1_ID` (`Team1_ID`),
  KEY `Team2_ID` (`Team2_ID`),
  CONSTRAINT `Cricket_Match_ibfk_1` FOREIGN KEY (`Team1_ID`) REFERENCES `Team` (`Team_ID`),
  CONSTRAINT `Cricket_Match_ibfk_2` FOREIGN KEY (`Team2_ID`) REFERENCES `Team` (`Team_ID`),
  CONSTRAINT `fkt` FOREIGN KEY (`Tournament_ID`) REFERENCES `Tournament` (`Tournament_ID`),
  CONSTRAINT `fkv` FOREIGN KEY (`Venue_ID`) REFERENCES `Venue` (`Venue_ID`)
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
  `Player_ID` int(11) NOT NULL,
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
-- Table structure for table `Player_List`
--

DROP TABLE IF EXISTS `Player_List`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Player_List` (
  `Player_ID` int(11) NOT NULL,
  `Team_ID` int(11) NOT NULL,
  `Match_ID` int(11) NOT NULL,
  PRIMARY KEY (`Player_ID`,`Team_ID`,`Match_ID`),
  KEY `Team_ID` (`Team_ID`),
  KEY `Match_ID` (`Match_ID`),
  CONSTRAINT `Player_List_ibfk_1` FOREIGN KEY (`Team_ID`) REFERENCES `Team` (`Team_ID`),
  CONSTRAINT `Player_List_ibfk_2` FOREIGN KEY (`Match_ID`) REFERENCES `Cricket_Match` (`Match_ID`),
  CONSTRAINT `fkp` FOREIGN KEY (`Player_ID`) REFERENCES `Player` (`Player_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Player_List`
--

LOCK TABLES `Player_List` WRITE;
/*!40000 ALTER TABLE `Player_List` DISABLE KEYS */;
/*!40000 ALTER TABLE `Player_List` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Team`
--

DROP TABLE IF EXISTS `Team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Team` (
  `Team_ID` int(11) NOT NULL,
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
  `Tournament_ID` int(11) NOT NULL,
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
-- Table structure for table `Venue`
--

DROP TABLE IF EXISTS `Venue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Venue` (
  `Venue_ID` int(11) NOT NULL,
  `Venue_Name` varchar(100) NOT NULL,
  `Location` varchar(100) DEFAULT NULL,
  `Capacity` int(11) DEFAULT NULL,
  PRIMARY KEY (`Venue_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Venue`
--

LOCK TABLES `Venue` WRITE;
/*!40000 ALTER TABLE `Venue` DISABLE KEYS */;
/*!40000 ALTER TABLE `Venue` ENABLE KEYS */;
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
  `Match_ID` int(11) DEFAULT NULL,
  `Inning_Number` int(11) DEFAULT NULL,
  PRIMARY KEY (`over_no`,`bowl_no`),
  KEY `on_strike` (`on_strike`),
  KEY `other_end` (`other_end`),
  KEY `bowler` (`bowler`),
  KEY `fk` (`Match_ID`,`Inning_Number`),
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2024-10-16  9:23:20

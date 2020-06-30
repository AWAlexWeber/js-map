-- MySQL dump 10.13  Distrib 5.7.30, for Linux (x86_64)
--
-- Host: localhost    Database: dndmap
-- ------------------------------------------------------
-- Server version	5.7.30-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `dndmap`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `dndmap` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `dndmap`;

--
-- Table structure for table `account_table`
--

DROP TABLE IF EXISTS `account_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_table` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(64) NOT NULL,
  `password` varchar(128) NOT NULL,
  `init_date` datetime NOT NULL,
  `account_key` varchar(128) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_table`
--

LOCK TABLES `account_table` WRITE;
/*!40000 ALTER TABLE `account_table` DISABLE KEYS */;
INSERT INTO `account_table` VALUES (5,'Aweber','e6824b1ce2ddac4deac662077c84c175f6634706df19f0209a3538101175cab32239e1babd45412cda88b8efb31f08413be7cdc7a4bf6ecf260e4f2e2cc5098e','2018-09-15 09:30:21','7d9B77kbGpdBIjQLmG9yVglTrFOaPArWNAyVIS6pik01ERM0xVyscTmDzaNoKelyPUtyNzX5UX6yOTymO6O10bEAlsZ6HlExf852I28C0eaP7IbWP0XQbCqw5qDNLik1');
/*!40000 ALTER TABLE `account_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `atlas_table`
--

DROP TABLE IF EXISTS `atlas_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `atlas_table` (
  `atlas_id` int(11) NOT NULL AUTO_INCREMENT,
  `atlas_name` varchar(32) NOT NULL,
  `atlas_width` int(11) DEFAULT NULL,
  `atlas_height` int(11) DEFAULT NULL,
  `categories` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`atlas_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atlas_table`
--

LOCK TABLES `atlas_table` WRITE;
/*!40000 ALTER TABLE `atlas_table` DISABLE KEYS */;
INSERT INTO `atlas_table` VALUES (0,'Terra',10000,6923,'{\n	\"city\" : {\n		\"0\" : \"Capital\",\n		\"1\" : \"Greater\",\n		\"2\" : \"Lesser\"\n	},\n	\"land\" : {	},\n	\"terrain\" : {\n		\"0\" : \"Greater\",\n		\"1\" : \"Lesser\"\n	},\n	\"label\": {\n		\"0\": \"Greater\",\n		\"1\": \"Lesser\"\n	}\n}');
/*!40000 ALTER TABLE `atlas_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city_table`
--

DROP TABLE IF EXISTS `city_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `city_table` (
  `city_id` int(11) NOT NULL AUTO_INCREMENT,
  `position_x` int(11) DEFAULT NULL,
  `position_y` int(11) DEFAULT NULL,
  `title` varchar(64) DEFAULT NULL,
  `location_category` varchar(45) DEFAULT NULL,
  `type_category` varchar(45) DEFAULT NULL,
  `icon` varchar(64) DEFAULT NULL,
  `atlas_id` int(11) NOT NULL,
  `land_id` int(11) NOT NULL,
  `time_set` mediumblob,
  PRIMARY KEY (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city_table`
--

LOCK TABLES `city_table` WRITE;
/*!40000 ALTER TABLE `city_table` DISABLE KEYS */;
INSERT INTO `city_table` VALUES (5,3889,1786,'Xiayang',NULL,'city_yuan_capitals','1',0,1,NULL),(6,3806,3467,'Kayn Cove',NULL,'city_yuan_greater','2',0,1,NULL),(7,4020,2899,'Baywatch',NULL,'city_yuan_greater','2',0,1,NULL),(8,3102,3141,'Xohan City',NULL,'city_yuan_greater','2',0,1,NULL),(9,3041,3048,'Last Hope',NULL,'city_yuan_lesser','3',0,1,NULL),(10,3249,3514,'Ridio City',NULL,'city_yuan_greater','2',0,1,NULL),(11,5773,2160,'Martins Rock',NULL,'city_elvania_capitals','1',0,2,NULL),(12,7725,2154,'Petrasul',NULL,'city_elvania_capitals','1',0,2,NULL),(13,7474,1954,'Okannah',NULL,'city_elvania_capitals','1',0,2,NULL),(14,7780,1980,'Zed',NULL,'city_elvania_greater','2',0,2,NULL),(15,7135,2457,'Desmond',NULL,'city_elvania_greater','2',0,2,NULL),(16,6859,1985,'Karth',NULL,'city_elvania_greater','2',0,2,NULL),(17,6751,1852,'Lesma',NULL,'city_elvania_greater','2',0,2,NULL),(18,7057,1472,'Vilicipiet',NULL,'city_elvania_greater','2',0,2,NULL),(19,6144,1976,'Corvillias Cove',NULL,'city_elvania_lesser','3',0,2,NULL),(20,6621,1580,'Zar-Gothia',NULL,'city_elvania_lesser','3',0,2,NULL),(21,5586,1374,'Helmstown',NULL,'city_elvania_lesser','3',0,2,NULL),(22,3072,3521,'Derisia',NULL,'city_yuan_lesser','3',0,1,NULL),(23,2996,3505,'Laembar Town',NULL,'city_yuan_lesser','3',0,1,NULL),(24,2986,3419,'Maerza',NULL,'city_yuan_lesser','3',0,1,NULL),(25,2947,3357,'Oakland West',NULL,'city_yuan_lesser','3',0,1,NULL),(26,3069,3358,'Oakland East',NULL,'city_yuan_lesser','3',0,1,NULL),(27,2405,2353,'Esten Mines',NULL,'city_yuan_lesser','3',0,1,NULL),(28,2279,2354,'Esten',NULL,'city_yuan_lesser','3',0,1,NULL),(29,2214,2464,'Illaedar',NULL,'city_yuan_lesser','3',0,1,NULL),(30,2307,2287,'The Gutter',NULL,'city_yuan_lesser','3',0,1,NULL),(31,2310,2186,'Weirtown',NULL,'city_yuan_lesser','3',0,1,NULL),(32,3423,1309,'Melkcross',NULL,'city_misc_greater','2',0,5,NULL),(33,3164,1384,'FelVindria',NULL,'city_misc_greater','2',0,5,NULL),(34,3026,1247,'Melkroth',NULL,'city_misc_capitals','1',0,5,NULL),(35,6023,2436,'Fort Martin',NULL,'city_elvania_lesser','3',0,2,NULL),(36,5909,2260,'Willshire',NULL,'city_elvania_lesser','3',0,2,NULL),(37,5798,2234,'Linemell',NULL,'city_elvania_lesser','3',0,2,NULL),(38,5987,2166,'Goldfields',NULL,'city_elvania_greater','2',0,2,NULL),(39,2699,2787,'Lights of Syrinix',NULL,'city_yuan_lesser','3',0,1,NULL),(40,2722,2751,'Mistfalls Town',NULL,'city_yuan_lesser','3',0,1,NULL),(41,6705,1978,'ZarThkul',NULL,'city_yuan_lesser','3',0,2,NULL),(42,8661,1593,'Äiu',NULL,'city_ainuria_capitals','1',0,6,NULL),(43,4973,5020,'Darlan Harbor',NULL,'city_valdrimm_greater','2',0,9,_binary '[[2017,21999]]');
/*!40000 ALTER TABLE `city_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ico_table`
--

DROP TABLE IF EXISTS `ico_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ico_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ico_title` varchar(16) NOT NULL,
  `ico_path` varchar(64) NOT NULL,
  `ico_description` varchar(128) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '-1',
  `scale` float DEFAULT NULL,
  `font_scale` int(11) DEFAULT NULL,
  `default_type` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COMMENT='List of all available icons';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ico_table`
--

LOCK TABLES `ico_table` WRITE;
/*!40000 ALTER TABLE `ico_table` DISABLE KEYS */;
INSERT INTO `ico_table` VALUES (1,'Diamond Filled','ico_diamond_small_filled.png','A filled diamond for important cities',-1,1.2,18,'city_capitals'),(2,'Square Filled','ico_square_small_filled.png','A filled square for large cities',-1,0.7,16,'city_greater'),(3,'Circle Filled','ico_circle_small_filled.png','A filled circle for small cities',-1,0.4,14,'city_lesser'),(4,'Default Terrain','ico_terrain.png','Default icon for terrain',-1,1,15,'terrain_greater'),(5,'Lesser Terrain','ico_terrain.png','Default icon for terrain',-1,0.8,14,'terrain_lesser'),(6,'Label Greater','ico_terrain.png','Default icon for labels',-1,1.2,32,'label_greater');
/*!40000 ALTER TABLE `ico_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `label_table`
--

DROP TABLE IF EXISTS `label_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `label_table` (
  `label_id` int(11) NOT NULL AUTO_INCREMENT,
  `position_x` int(11) DEFAULT NULL,
  `position_y` int(11) DEFAULT NULL,
  `title` varchar(64) DEFAULT NULL,
  `location_category` varchar(45) DEFAULT NULL,
  `type_category` varchar(45) DEFAULT NULL,
  `icon` varchar(64) DEFAULT NULL,
  `atlas_id` int(11) NOT NULL,
  `land_id` int(11) NOT NULL,
  `time_set` mediumblob,
  PRIMARY KEY (`label_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `label_table`
--

LOCK TABLES `label_table` WRITE;
/*!40000 ALTER TABLE `label_table` DISABLE KEYS */;
INSERT INTO `label_table` VALUES (1,5550,5402,'Isle of Ru',NULL,'label_valdrimm_greater','6',0,9,_binary '[[2017,50000]]'),(2,3600,5889,'Ponterra',NULL,'label_ponterra_greater','6',0,12,_binary '[[2018,50000]]'),(3,2238,5799,'The Godlands',NULL,'label_godlands_greater','6',0,7,_binary '[[2018,50000]]');
/*!40000 ALTER TABLE `label_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `land_table`
--

DROP TABLE IF EXISTS `land_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `land_table` (
  `land_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `land_image_source` varchar(128) NOT NULL,
  `x1` int(11) NOT NULL,
  `y1` int(11) NOT NULL,
  `x2` int(11) NOT NULL,
  `y2` int(11) NOT NULL,
  `atlas_id` int(11) NOT NULL,
  `time_set` mediumblob,
  PRIMARY KEY (`land_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1 COMMENT='x1 = top left corner X exactly\nx2 = X1 + width\ny1 = bottom left Y height\ny2 = Y1 + Height';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `land_table`
--

LOCK TABLES `land_table` WRITE;
/*!40000 ALTER TABLE `land_table` DISABLE KEYS */;
INSERT INTO `land_table` VALUES (1,'Yuan','assets/img/Map_Yuan.png',1695,2891,4217,5480,0,_binary '[[2015,50000]]'),(2,'Elvania','assets/img/Map_Elvania.png',5107,4274,7959,5922,0,_binary '[[1443,50000]]'),(3,'Choria','assets/img/Map_Choria.png',945,1869,2477,3330,0,_binary '[[2016,50000]]'),(4,'Full','assets/img/Map_Full.png',0,0,10000,6923,0,NULL),(5,'Orion','assets/img/Map_Orion.png',2678,5449,3783,5923,0,_binary '[[2015,50000]]'),(6,'Ainuria','assets/img/Map_Ainuria.png',7834,4491,9470,6525,0,_binary '[[0,50000]]'),(7,'Godlands','assets/img/Map_Godlands.png',1737,1112,3398,2383,0,_binary '[[0,50000]]'),(8,'Fallenlands','assets/img/Map_Faella.png',417,745,1787,2164,0,_binary '[[29252,50000]]'),(9,'Valdrimm','assets/img/Map_Valdrimm.png',2853,1534,8276,3234,0,_binary '[[1902,50000]]'),(10,'Okathrel','assets/img/Map_Okathrel.png',2367,2123,3661,3417,0,_binary '[[2017,16252]]'),(11,'Arcanium','assets/img/Map_Arcanium.png',3494,2490,6255,4681,0,_binary '[[2020,3549]]'),(12,'Ponterra','assets/img/Map_Ponterra.png',2928,989,4630,2212,0,_binary '[[21999,50000]]'),(13,'Bora','assets/img/Map_Bora.png',104,3756,1845,6877,0,_binary '[[2018,50000]]'),(14,'Melkroth','assets/img/Map_Melkroth.png',6627,0,10000,2360,0,_binary '[[29999,50000]]');
/*!40000 ALTER TABLE `land_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `terrain_table`
--

DROP TABLE IF EXISTS `terrain_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `terrain_table` (
  `terrain_id` int(11) NOT NULL AUTO_INCREMENT,
  `position_x` int(11) DEFAULT NULL,
  `position_y` int(11) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `location_category` varchar(45) DEFAULT NULL,
  `type_category` varchar(45) DEFAULT NULL,
  `icon` varchar(64) DEFAULT NULL,
  `atlas_id` int(11) NOT NULL,
  `land_id` int(11) NOT NULL,
  `time_set` mediumblob,
  PRIMARY KEY (`terrain_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `terrain_table`
--

LOCK TABLES `terrain_table` WRITE;
/*!40000 ALTER TABLE `terrain_table` DISABLE KEYS */;
INSERT INTO `terrain_table` VALUES (1,7897,1430,'Mt Mornicus',NULL,'terrain_elvania_greater','4',0,2,_binary '[[500, 15000]]'),(2,6131,1819,'The Shadowed Tears',NULL,'terrain_elvania_greater','4',0,2,NULL),(3,6351,1663,'The White Spine',NULL,'terrain_elvania_greater','4',0,2,NULL),(4,2959,3157,'Xohan Desert',NULL,'terrain_yuan_greater','4',0,1,NULL),(5,3027,2803,'Xohan Badlands',NULL,'terrain_yuan_lesser','4',0,1,NULL),(6,6920,1937,'Pyramid of Karth',NULL,'terrain_elvania_lesser','4',0,2,NULL),(7,5627,1355,'Helms Fingers',NULL,'terrain_elvania_greater','4',0,2,NULL),(8,6079,2100,'Southbay Forests',NULL,'terrain_elvania_lesser','4',0,2,NULL),(9,7461,1743,'Magnasilvan',NULL,'terrain_elvania_greater','4',0,2,NULL),(10,3019,3404,'Airom',NULL,'terrain_yuan_lesser','4',0,1,NULL),(11,6390,1219,'Elvania Northsea',NULL,'terrain_elvania_greater','4',0,2,NULL),(12,6773,1587,'Zar-Gothia Valley',NULL,'terrain_elvania_lesser','4',0,2,NULL),(13,6534,2921,'Northern Greater Basin',NULL,'terrain_elvania_greater','4',0,2,NULL),(14,7351,2091,'Swamps of Sorrow',NULL,'terrain_elvania_lesser','4',0,2,NULL),(15,6766,2166,'Sands of Karth',NULL,'terrain_elvania_lesser','4',0,2,NULL),(16,6763,1815,'Mt. Lesma',NULL,'terrain_elvania_lesser','4',0,2,NULL),(17,5858,2324,'The Graycliffs',NULL,'terrain_elvania_lesser','4',0,2,NULL),(18,5199,1144,'Isle of Pavdar',NULL,'terrain_elvania_greater','4',0,2,NULL),(19,2777,2771,'The Misty Lake',NULL,'terrain_yuan_lesser','4',0,1,NULL),(20,6788,1961,'The Deadlands',NULL,'terrain_elvania_lesser','4',0,2,NULL),(21,6945,2050,'City of Erulio',NULL,'terrain_elvania_lesser','4',0,2,NULL),(22,5024,2900,'Island of Velinia',NULL,'terrain_yuan_greater','4',0,1,NULL),(23,4651,4922,'Bay of Bithcay',NULL,'terrain_valdrimm_greater','4',0,9,NULL),(24,3552,4928,'Artegian Waterlands',NULL,'terrain_ponterra_greater','4',0,12,_binary '[[2018,50000]]'),(25,5071,4527,'Ashai Grandlake',NULL,'terrain_valdrimm_greater','4',0,9,_binary '[[2017,50000]]'),(26,4371,5302,'Pozian Sea',NULL,'terrain_ponterra_lesser','4',0,12,_binary '[[2018,50000]]'),(27,3601,5237,'The Red Sea',NULL,'terrain_ponterra_greater','4',0,12,_binary '[[2018,50000]]'),(28,4974,5023,'Darlan Ruins',NULL,'terrain_valdrimm_lesser','5',0,9,_binary '[[21999,50000]]');
/*!40000 ALTER TABLE `terrain_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-30 19:09:41

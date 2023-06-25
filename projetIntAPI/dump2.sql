-- MySQL dump 10.13  Distrib 8.0.32, for macos13.0 (arm64)
--
-- Host: localhost    Database: PROJET_INT
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `affiliationNumber` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` enum('M','F') COLLATE utf8mb4_unicode_ci NOT NULL,
  `ranking` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dateOfBirth` date NOT NULL,
  `mobile` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `street` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postalCode` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `locality` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admins_affiliationnumber_unique` (`affiliationNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blockeds`
--

DROP TABLE IF EXISTS `blockeds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blockeds` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `begin_hour` time NOT NULL,
  `date` date NOT NULL,
  `duration` double(8,2) NOT NULL,
  `reason` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `court_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `blockeds_id_court_id_begin_hour_user_id_unique` (`id`,`court_id`,`begin_hour`,`user_id`),
  KEY `blockeds_court_id_foreign` (`court_id`),
  KEY `blockeds_user_id_foreign` (`user_id`),
  CONSTRAINT `blockeds_court_id_foreign` FOREIGN KEY (`court_id`) REFERENCES `courts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `blockeds_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blockeds`
--

LOCK TABLES `blockeds` WRITE;
/*!40000 ALTER TABLE `blockeds` DISABLE KEYS */;
/*!40000 ALTER TABLE `blockeds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ageMin` int NOT NULL,
  `ageMax` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_id_name_unique` (`id`,`name`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` (`id`, `name`, `ageMin`, `ageMax`, `created_at`, `updated_at`) VALUES (10,'C15-1',10,15,'2023-06-24 17:25:37','2023-06-24 17:25:37'),(11,'B-4/6',4,6,'2023-06-24 17:27:08','2023-06-24 17:27:08'),(12,'B-2/6',2,6,'2023-06-24 17:27:12','2023-06-24 17:27:12'),(13,'B-15.4',15,15,'2023-06-24 17:27:18','2023-06-24 17:27:18'),(14,'B-15.2',15,15,'2023-06-24 17:27:24','2023-06-24 17:27:24'),(15,'B-15.1',15,15,'2023-06-24 17:27:30','2023-06-24 17:27:30'),(16,'B15',15,15,'2023-06-24 17:27:36','2023-06-24 17:27:36'),(17,'B+2/6',2,6,'2023-06-24 17:27:42','2023-06-24 17:27:42'),(18,'C15',15,15,'2023-06-24 17:27:58','2023-06-24 17:27:58'),(19,'C15.1',15,15,'2023-06-24 17:28:07','2023-06-24 17:28:07'),(20,'C15.2',15,15,'2023-06-24 17:28:12','2023-06-24 17:28:12'),(21,'C15.3',15,15,'2023-06-24 17:28:16','2023-06-24 17:28:16'),(22,'C15.4',15,15,'2023-06-24 17:28:21','2023-06-24 17:28:21'),(23,'C30',30,30,'2023-06-24 17:28:27','2023-06-24 17:28:27'),(24,'N.C',0,0,'2023-06-24 17:28:36','2023-06-24 17:28:36'),(25,'C30.1',30,30,'2023-06-24 17:28:49','2023-06-24 17:28:49'),(26,'C30.2',30,30,'2023-06-24 17:28:54','2023-06-24 17:28:54'),(27,'C30.3',30,30,'2023-06-24 17:29:01','2023-06-24 17:29:01'),(28,'C30.4',30,30,'2023-06-24 17:29:08','2023-06-24 17:29:08'),(29,'C30.5',30,30,'2023-06-24 17:29:13','2023-06-24 17:29:13');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_user`
--

DROP TABLE IF EXISTS `category_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_user` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `category_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_user_id_user_id_category_id_unique` (`id`,`user_id`,`category_id`),
  KEY `category_user_user_id_foreign` (`user_id`),
  KEY `category_user_category_id_foreign` (`category_id`),
  CONSTRAINT `category_user_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `category_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_user`
--

LOCK TABLES `category_user` WRITE;
/*!40000 ALTER TABLE `category_user` DISABLE KEYS */;
INSERT INTO `category_user` (`id`, `user_id`, `category_id`, `created_at`, `updated_at`) VALUES (102,67,12,NULL,NULL),(103,84,12,NULL,NULL),(104,85,11,NULL,NULL),(105,86,11,NULL,NULL),(106,87,11,NULL,NULL);
/*!40000 ALTER TABLE `category_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courts`
--

DROP TABLE IF EXISTS `courts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courts`
--

LOCK TABLES `courts` WRITE;
/*!40000 ALTER TABLE `courts` DISABLE KEYS */;
INSERT INTO `courts` (`id`, `number`, `created_at`, `updated_at`) VALUES (1,'11','2023-04-26 18:23:54','2023-06-25 05:49:18'),(4,'10','2023-06-20 17:10:35','2023-06-20 17:10:35'),(7,'1','2023-06-20 17:11:37','2023-06-20 17:11:37'),(8,'14','2023-06-21 17:46:43','2023-06-21 17:46:43'),(9,'2','2023-06-25 05:49:30','2023-06-25 05:49:30');
/*!40000 ALTER TABLE `courts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `affiliationNumber` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` enum('M','F') COLLATE utf8mb4_unicode_ci NOT NULL,
  `ranking` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dateOfBirth` date NOT NULL,
  `mobile` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `street` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postalCode` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `locality` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `members_affiliationnumber_unique` (`affiliationNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` (`id`, `affiliationNumber`, `lastName`, `firstName`, `gender`, `ranking`, `dateOfBirth`, `mobile`, `email`, `password`, `status`, `street`, `postalCode`, `locality`, `created_at`, `updated_at`) VALUES (1,'0556565656','Enfoirax','John','F','A+','1990-01-01','1234567890','john.doe@email.com','$2y$10$NnkNSd6T1W2yinT.HFLxmum/IdE3RIdqL9KQCHrYuVBv0lR2s5r3G','Active','123 Main St','12345','City1',NULL,'2023-06-13 17:45:47'),(2,'000000090','Enfoirax','John','F','A+','1990-01-01','1234567890','john.doe@email.com','$2y$10$zkv/IOAitBYZ8ha/2cmz8OIRSzfzzEA/xHn2d5w/OV6X1iB.d88AC','Active','123 Main St','12345','City1',NULL,'2023-06-13 17:47:02'),(3,'003','Brown','Michael','M','O+','1978-09-30','4567890123','michael.brown@email.com','password3','Active','789 Elm Rd','54321','City3',NULL,NULL),(4,'004','Johnson','Emily','F','AB-','1995-03-12','7890123456','emily.johnson@email.com','password4','Active','567 Pine St','98765','City4',NULL,NULL),(5,'005','Lee','David','M','B+','1982-11-20','8901234567','david.lee@email.com','password5','Inactive','890 Maple Ave','45678','City5',NULL,NULL),(6,'006','Taylor','Olivia','F','O-','1998-07-05','9012345678','olivia.taylor@email.com','password6','Active','678 Cedar Rd','23456','City6',NULL,NULL),(7,'007','Garcia','Daniel','M','AB+','1973-04-18','0123456789','daniel.garcia@email.com','password7','Inactive','234 Birch St','78901','City7',NULL,NULL),(8,'008','Martinez','Sophia','F','A-','1989-08-25','1234567890','sophia.martinez@email.com','password8','Active','456 Oak Ave','34567','City8',NULL,NULL),(9,'009','Chen','William','M','B+','1996-02-09','2345678901','william.chen@email.com','password9','Inactive','678 Elm Rd','90123','City9',NULL,NULL),(10,'010','Wang','Isabella','F','O+','1980-12-31','3456789012','isabella.wang@email.com','password10','Active','890 Pine St','45678','City10',NULL,NULL);
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_reset_tokens_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1),(5,'2023_04_22_134011_create_members_table',1),(6,'2023_04_22_162736_create_admins_table',1),(7,'2023_04_26_170736_create_categories_table',1),(8,'2023_04_26_170744_create_courts_table',1),(9,'2023_04_26_171338_create_table_asso_reserve',1),(10,'2023_04_27_184136_create_table_asso_category_member',1),(11,'2023_06_16_171520_create_table_asso_blocked',2),(12,'2023_06_22_194025_add_has_paid_dues',3),(13,'2023_06_22_194058_add_has_paid_dues',4),(14,'2023_06_22_194828_add_has_paid_dues',5),(15,'2023_06_24_110422_make_email_unique_in_users_table',6);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `starting_hour` time NOT NULL,
  `ending_hour` time NOT NULL,
  `date` date NOT NULL,
  `user1_id` bigint unsigned NOT NULL,
  `user2_id` bigint unsigned NOT NULL,
  `user3_id` bigint unsigned DEFAULT NULL,
  `user4_id` bigint unsigned DEFAULT NULL,
  `court_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reservations_id_court_id_date_starting_hour_unique` (`id`,`court_id`,`date`,`starting_hour`),
  KEY `reservations_court_id_foreign` (`court_id`),
  KEY `reservations_user1_id_foreign` (`user1_id`),
  KEY `reservations_user2_id_foreign` (`user2_id`),
  KEY `reservations_user3_id_foreign` (`user3_id`),
  KEY `reservations_user4_id_foreign` (`user4_id`),
  CONSTRAINT `reservations_court_id_foreign` FOREIGN KEY (`court_id`) REFERENCES `courts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reservations_user1_id_foreign` FOREIGN KEY (`user1_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reservations_user2_id_foreign` FOREIGN KEY (`user2_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reservations_user3_id_foreign` FOREIGN KEY (`user3_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reservations_user4_id_foreign` FOREIGN KEY (`user4_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` (`id`, `starting_hour`, `ending_hour`, `date`, `user1_id`, `user2_id`, `user3_id`, `user4_id`, `court_id`, `created_at`, `updated_at`) VALUES (88,'09:00:00','10:00:00','2023-06-22',67,84,NULL,NULL,4,'2023-06-24 17:14:02','2023-06-24 17:14:02'),(90,'09:00:00','11:00:00','2023-06-22',84,85,86,87,7,'2023-06-25 06:07:00','2023-06-25 06:07:00'),(91,'11:00:00','12:00:00','2023-06-22',84,86,NULL,NULL,4,'2023-06-25 07:03:57','2023-06-25 07:03:57'),(92,'11:00:00','12:00:00','2023-06-22',84,86,NULL,NULL,4,'2023-06-25 07:03:57','2023-06-25 07:03:57'),(93,'09:00:00','10:00:00','2023-06-22',84,85,NULL,NULL,1,'2023-06-25 07:17:21','2023-06-25 07:17:21'),(94,'09:00:00','10:00:00','2023-06-22',84,85,NULL,NULL,8,'2023-06-25 07:18:02','2023-06-25 07:18:02'),(95,'09:00:00','10:00:00','2023-06-29',84,85,NULL,NULL,4,'2023-06-25 09:18:14','2023-06-25 09:18:14'),(96,'09:00:00','10:00:00','2023-06-30',67,84,NULL,NULL,4,'2023-06-25 09:48:55','2023-06-25 09:48:55');
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `affiliationNumber` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` enum('M','F') COLLATE utf8mb4_unicode_ci NOT NULL,
  `ranking` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dateOfBirth` date NOT NULL,
  `mobile` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `street` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postalCode` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `locality` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `hasPaidDues` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_affiliationnumber_unique` (`affiliationNumber`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `affiliationNumber`, `lastName`, `firstName`, `gender`, `ranking`, `dateOfBirth`, `mobile`, `email`, `password`, `status`, `street`, `postalCode`, `locality`, `isAdmin`, `created_at`, `updated_at`, `hasPaidDues`) VALUES (67,'2300001','Klein','Laurent','M','Beginner','1996-06-16','0498843317','john.doe@email.com','$2y$10$WrRLP.3olg5pdllfXWes4e7Tc86WcqhuxSQzFMzYdXB9O6K/SnHz2','Active','Rue Raymond','4800','Verviers',1,'2023-06-22 16:17:00','2023-06-25 05:55:26',1),(84,'2300068','Slim','Shady','M','Beginner','1996-06-16','0498843317','slim@email.com','$2y$10$U8S4C28G/EygxbYlCdTtFupVGPQd7OBsTEVbuF859yJiNPlnIsofO','Active','Rue Raymond','4800','Verviers',0,'2023-06-24 17:11:44','2023-06-24 17:13:23',1),(85,'2300085','Johnny','Sins','M','Beginner','1996-06-20','0498843317','johnny.sins@email.com','$2y$10$7WVPR32yMubM75rStTeHxOsuDC4Ivqdy.h7lDBwZGElByY7XwzabW','Active','Rue Raymond','4800','Verviers',0,'2023-06-24 17:12:25','2023-06-25 10:09:04',1),(86,'2300086','Ray','Charles','M','Beginner','1996-06-16','0498843317','eay.charlie@email.com','$2y$10$aSiWDskJ85wiK7XBlLFzxeoHpA/FvdAwovDJ15HvNBgmTxuqVez8G','Active','Rue Raymond','4800','Verviers',0,'2023-06-25 06:05:01','2023-06-25 06:06:21',1),(87,'2300087','Travis','Scott','M','Beginner','1996-06-16','0498843317','travis@email.com','$2y$10$3zxv8XYcGtc4o8fY4/ydj.bAJ1moNW/nH46mHm92/ziJSDpozEXLO','Active','Rue Raymond','4800','Verviers',0,'2023-06-25 06:05:59','2023-06-25 06:06:24',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-25 14:18:22

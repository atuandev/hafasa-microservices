-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.4.0 - MySQL Community Server - GPL
-- Server OS:                    Linux
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for hafasa_user_db
CREATE DATABASE IF NOT EXISTS `hafasa_user_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hafasa_user_db`;

-- Dumping structure for table hafasa_user_db.addresses
CREATE TABLE IF NOT EXISTS `addresses` (
  `id` varchar(255) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `receiver_name` varchar(255) DEFAULT NULL,
  `receiver_phone` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1fa36y2oqhao3wgg2rw1pi459` (`user_id`),
  CONSTRAINT `FK1fa36y2oqhao3wgg2rw1pi459` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table hafasa_user_db.addresses: ~2 rows (approximately)
DELETE FROM `addresses`;
INSERT INTO `addresses` (`id`, `created_at`, `updated_at`, `address`, `receiver_name`, `receiver_phone`, `user_id`) VALUES
	('00864ac4-9b20-4f67-a56a-21cf8fb0a748', '2024-11-30 10:37:03.673998', '2024-11-30 10:37:03.674057', '34/8b Tân Xuân 5', 'Tuan Anh', '0982728717', '268a4722-2abf-483a-a58b-ef41dc5d7537'),
	('53a09f78-70cb-4547-ab3f-dbe2d78a9038', '2024-11-27 20:30:33.603955', '2024-11-27 20:30:33.603955', 'Quận 12, HCM', 'Boi boi', '0928123121', '9b1c2041-348d-4cb4-98e5-bbf229c4a17f');

-- Dumping structure for table hafasa_user_db.invalidated_tokens
CREATE TABLE IF NOT EXISTS `invalidated_tokens` (
  `id` varchar(255) NOT NULL,
  `expiry_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table hafasa_user_db.invalidated_tokens: ~0 rows (approximately)
DELETE FROM `invalidated_tokens`;

-- Dumping structure for table hafasa_user_db.permissions
CREATE TABLE IF NOT EXISTS `permissions` (
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table hafasa_user_db.permissions: ~2 rows (approximately)
DELETE FROM `permissions`;
INSERT INTO `permissions` (`name`, `description`) VALUES
	('USER_ADD', 'Add user'),
	('USER_DELETE', 'Delete user');

-- Dumping structure for table hafasa_user_db.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table hafasa_user_db.roles: ~2 rows (approximately)
DELETE FROM `roles`;
INSERT INTO `roles` (`name`, `description`) VALUES
	('ADMIN', 'Admin role'),
	('USER', 'User role');

-- Dumping structure for table hafasa_user_db.roles_permissions
CREATE TABLE IF NOT EXISTS `roles_permissions` (
  `role_name` varchar(255) NOT NULL,
  `permissions_name` varchar(255) NOT NULL,
  PRIMARY KEY (`role_name`,`permissions_name`),
  KEY `FK9u1xpvjxbdnkca024o6fyr7uu` (`permissions_name`),
  CONSTRAINT `FK6nw4jrj1tuu04j9rk7xwfssd6` FOREIGN KEY (`role_name`) REFERENCES `roles` (`name`),
  CONSTRAINT `FK9u1xpvjxbdnkca024o6fyr7uu` FOREIGN KEY (`permissions_name`) REFERENCES `permissions` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table hafasa_user_db.roles_permissions: ~0 rows (approximately)
DELETE FROM `roles_permissions`;

-- Dumping structure for table hafasa_user_db.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(255) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `avatar` text,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` enum('ACTIVE','DISABLED') DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table hafasa_user_db.users: ~3 rows (approximately)
DELETE FROM `users`;
INSERT INTO `users` (`id`, `created_at`, `updated_at`, `avatar`, `email`, `name`, `password`, `status`, `username`) VALUES
	('0d42394b-35ac-4b8f-9e96-a513388d007d', '2024-12-01 20:16:50.723267', '2024-12-01 20:16:50.723267', 'https://ui-avatars.com/api/?background=random&rounded=true&bold=true&name=anh+tuan', 'tuan@gmail.com', 'anh tuan', '$2a$10$0syVww3PJqxeSe3BdBMs8eY4p19fTOsJzDtFEg4Uw1.IaGcEIiJ7W', 'ACTIVE', 'anhtuan'),
	('268a4722-2abf-483a-a58b-ef41dc5d7537', '2024-11-29 12:17:43.055830', '2024-11-30 10:35:36.371551', 'https://ui-avatars.com/api/?background=random&rounded=true&bold=true&name=Son+Tung', 'sontung@gmail.com', 'Son Tung', '$2a$10$yrggAneP6/iNd2pTEGgy/uf6Xvh1eP5silSsixip6dU6eD3TPB05i', 'ACTIVE', 'sontung'),
	('9b1c2041-348d-4cb4-98e5-bbf229c4a17f', '2024-11-25 14:23:09.381710', '2025-01-18 21:01:14.503400', 'https://ui-avatars.com/api/?background=random&rounded=true&bold=true&name=Anh+Tuan', 'atuandev@gmail.com', 'Nguyen Phan Anh Tuan', '$2a$10$5U/0HJEUWVX6jaZ85k8lQ.E4V1roKSXuD1S.i8/eoH75CyVFO2Gpa', 'ACTIVE', 'admin');

-- Dumping structure for table hafasa_user_db.users_roles
CREATE TABLE IF NOT EXISTS `users_roles` (
  `user_id` varchar(255) NOT NULL,
  `roles_name` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`,`roles_name`),
  KEY `FKmi9sfx618v14gm89cyw408hqu` (`roles_name`),
  CONSTRAINT `FK2o0jvgh89lemvvo17cbqvdxaa` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKmi9sfx618v14gm89cyw408hqu` FOREIGN KEY (`roles_name`) REFERENCES `roles` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table hafasa_user_db.users_roles: ~3 rows (approximately)
DELETE FROM `users_roles`;
INSERT INTO `users_roles` (`user_id`, `roles_name`) VALUES
	('9b1c2041-348d-4cb4-98e5-bbf229c4a17f', 'ADMIN'),
	('0d42394b-35ac-4b8f-9e96-a513388d007d', 'USER'),
	('268a4722-2abf-483a-a58b-ef41dc5d7537', 'USER');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

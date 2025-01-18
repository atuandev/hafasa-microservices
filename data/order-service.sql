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


-- Dumping database structure for hafasa_order_db
CREATE DATABASE IF NOT EXISTS `hafasa_order_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hafasa_order_db`;

-- Dumping structure for table hafasa_order_db.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` varchar(255) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `order_status` enum('CANCELLED','CONFIRMED','DELIVERED','PENDING','SHIPPING') DEFAULT NULL,
  `payment_method` enum('COD','VN_PAY') DEFAULT NULL,
  `receiver_name` varchar(255) DEFAULT NULL,
  `receiver_phone` varchar(255) DEFAULT NULL,
  `total` double DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`),
  CONSTRAINT `FK32ql8ubntj5uh44ph9659tiih` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table hafasa_order_db.orders: ~13 rows (approximately)
DELETE FROM `orders`;
INSERT INTO `orders` (`id`, `created_at`, `updated_at`, `address`, `order_status`, `payment_method`, `receiver_name`, `receiver_phone`, `total`, `user_id`) VALUES
	('12a5547e-17af-4c37-9f6c-e820eada42cc', '2024-11-30 10:37:26.223350', '2024-11-30 10:37:26.223414', '34/8b Tân Xuân 5', 'PENDING', 'COD', 'Tuan Anh', '0982728717', 1865000, '268a4722-2abf-483a-a58b-ef41dc5d7537'),
	('18f8e983-7f03-40eb-bd37-966048f2d339', '2024-12-01 09:19:49.272047', '2024-12-01 09:19:49.272047', '34/8b Tân Xuân 5', 'PENDING', 'COD', 'Tuan Anh', '0982728717', 195500, '268a4722-2abf-483a-a58b-ef41dc5d7537'),
	('2c35fd3c-e1d6-4211-a748-907d173ff6d9', '2024-11-30 11:55:46.439005', '2024-11-30 11:55:46.439043', '34/8b Tân Xuân 5', 'PENDING', 'COD', 'Tuan Anh', '0982728717', 130000, '268a4722-2abf-483a-a58b-ef41dc5d7537'),
	('3f46ac1d-a79b-4c31-b508-bb252c503215', '2024-12-01 09:31:33.200210', '2024-12-01 09:31:33.200210', '34/8b Tân Xuân 5', 'PENDING', 'COD', 'Tuan Anh', '0982728717', 239250, '268a4722-2abf-483a-a58b-ef41dc5d7537'),
	('4d672733-2ee6-42b9-b19d-170c24de99db', '2024-11-29 19:09:15.763199', '2024-11-29 19:09:15.763199', 'Quận 12, HCM', 'PENDING', 'COD', 'Boi boi', '0928123121', 350000, '9b1c2041-348d-4cb4-98e5-bbf229c4a17f'),
	('74ae155e-2c75-4c64-8577-e235f77d4dc2', '2024-11-29 18:41:42.267977', '2024-11-29 19:05:35.351630', 'HCM', 'CONFIRMED', 'COD', 'Son Tung', '0908765654', 255000, '9b1c2041-348d-4cb4-98e5-bbf229c4a17f'),
	('8b87b99d-40e8-4e07-a276-c7a828e86dd8', '2024-11-28 18:24:08.288821', '2024-11-28 18:24:08.288821', 'HCM', 'PENDING', 'COD', 'Anh Tuấn', '0908765654', 255000, '9b1c2041-348d-4cb4-98e5-bbf229c4a17f'),
	('93accc61-eb40-4526-b766-c03ee32d3b84', '2024-11-30 10:59:09.290396', '2024-11-30 10:59:09.290490', '34/8b Tân Xuân 5', 'PENDING', 'COD', 'Tuan Anh', '0982728717', 230000, '268a4722-2abf-483a-a58b-ef41dc5d7537'),
	('9a176167-9ba2-489d-8eb7-86ed3822349b', '2024-12-11 22:06:22.372370', '2024-12-11 22:06:22.372780', 'HCM', 'PENDING', 'COD', 'Anh Tuấn', '0908765654', 255000, '9b1c2041-348d-4cb4-98e5-bbf229c4a17f'),
	('b878ae17-536a-4ba1-ab6a-8015c7eb80fe', '2024-11-29 12:18:32.156944', '2024-11-29 12:18:32.156944', 'HCM', 'PENDING', 'COD', 'Son Tung', '0908765654', 255000, '9b1c2041-348d-4cb4-98e5-bbf229c4a17f'),
	('cb9fd4ae-e8a6-4481-bf8c-3f27047af9f0', '2024-11-28 18:22:52.275573', '2024-11-28 18:22:52.275573', 'HCM', 'PENDING', 'COD', 'Anh Tuấn', '0908765654', 255000, '9b1c2041-348d-4cb4-98e5-bbf229c4a17f'),
	('d527cabe-f773-427b-99e8-5abfd8f790b7', '2024-12-11 22:14:32.896072', '2024-12-11 22:14:32.896072', 'HCM', 'PENDING', 'COD', 'Anh Tuấn', '0908765654', 380000, '9b1c2041-348d-4cb4-98e5-bbf229c4a17f'),
	('d925df43-b1fd-4eaa-828b-c6aad2a5a8c1', '2024-12-11 22:15:50.410647', '2024-12-11 22:15:50.410647', 'HCM', 'PENDING', 'COD', 'Anh Tuấn', '0908765654', 380000, '9b1c2041-348d-4cb4-98e5-bbf229c4a17f');

-- Dumping structure for table hafasa_order_db.order_details
CREATE TABLE IF NOT EXISTS `order_details` (
  `id` varchar(255) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `book_id` varchar(255) DEFAULT NULL,
  `order_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjqe04yonp6a52rhbf2y0m03qw` (`book_id`),
  KEY `FKjyu2qbqt8gnvno9oe9j2s2ldk` (`order_id`),
  CONSTRAINT `FKjqe04yonp6a52rhbf2y0m03qw` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `FKjyu2qbqt8gnvno9oe9j2s2ldk` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table hafasa_order_db.order_details: ~23 rows (approximately)
DELETE FROM `order_details`;
INSERT INTO `order_details` (`id`, `created_at`, `updated_at`, `price`, `quantity`, `book_id`, `order_id`) VALUES
	('0b43f0b1-857a-4993-9797-d9a1db04cdcb', '2024-11-29 12:18:32.408533', '2024-11-29 12:18:32.408533', 105000, 1, 'bf1346f5-1253-4327-88f6-ff0bcff4a259', 'b878ae17-536a-4ba1-ab6a-8015c7eb80fe'),
	('0d311593-a9af-43f7-99be-9b96e36c0c28', '2024-11-30 10:37:26.296532', '2024-11-30 10:37:26.296597', 350000, 5, '71383a12-b01d-4803-9302-a07d1dc9e99a', '12a5547e-17af-4c37-9f6c-e820eada42cc'),
	('0dd8bab1-d07e-4953-bd3f-12e135abe43a', '2024-12-11 22:14:32.952526', '2024-12-11 22:14:32.952645', 170000, 1, 'ff0b4555-743e-49df-9f9f-1abdd998419b', 'd527cabe-f773-427b-99e8-5abfd8f790b7'),
	('1d10f188-a012-4ecd-b584-e1a7b4ac969a', '2024-12-11 22:15:50.452977', '2024-12-11 22:15:50.452977', 170000, 1, 'ff0b4555-743e-49df-9f9f-1abdd998419b', 'd925df43-b1fd-4eaa-828b-c6aad2a5a8c1'),
	('26cbdbf5-407a-4504-b796-e17b5a11f44f', '2024-12-01 09:19:49.389964', '2024-12-01 09:19:49.389964', 97750, 2, '0a3366a6-fe74-4452-83c8-3750cd1d0cd4', '18f8e983-7f03-40eb-bd37-966048f2d339'),
	('27fb9c6e-a19b-43a2-b41e-8f0b624f18b6', '2024-11-29 19:09:15.894537', '2024-11-29 19:09:15.894537', 115000, 2, '0a3366a6-fe74-4452-83c8-3750cd1d0cd4', '4d672733-2ee6-42b9-b19d-170c24de99db'),
	('32fd00a8-bd48-41ac-8e7f-86616289505f', '2024-12-01 09:31:33.367017', '2024-12-01 09:31:33.367017', 109250, 1, '0a3366a6-fe74-4452-83c8-3750cd1d0cd4', '3f46ac1d-a79b-4c31-b508-bb252c503215'),
	('40dc285d-77ba-4467-b874-9732c1f39edc', '2024-11-28 18:22:52.473709', '2024-11-28 18:22:52.473709', 150000, 1, 'ff0b4555-743e-49df-9f9f-1abdd998419b', 'cb9fd4ae-e8a6-4481-bf8c-3f27047af9f0'),
	('41bb3600-b539-4417-bdb5-b3307c77da33', '2024-11-28 18:24:08.532792', '2024-11-28 18:24:08.532792', 105000, 1, 'bf1346f5-1253-4327-88f6-ff0bcff4a259', '8b87b99d-40e8-4e07-a276-c7a828e86dd8'),
	('483260f7-1296-40e2-b23d-e0d5b153476a', '2024-11-29 18:41:42.488035', '2024-11-29 18:41:42.488035', 105000, 1, 'bf1346f5-1253-4327-88f6-ff0bcff4a259', '74ae155e-2c75-4c64-8577-e235f77d4dc2'),
	('61ca7768-09ab-4dea-b836-84fa21943228', '2024-11-30 11:55:46.528265', '2024-11-30 11:55:46.528314', 130000, 1, 'bf1346f5-1253-4327-88f6-ff0bcff4a259', '2c35fd3c-e1d6-4211-a748-907d173ff6d9'),
	('64fb57be-2b09-4934-89d1-053fe8a87257', '2024-12-11 22:15:50.458735', '2024-12-11 22:15:50.458735', 105000, 2, 'bf1346f5-1253-4327-88f6-ff0bcff4a259', 'd925df43-b1fd-4eaa-828b-c6aad2a5a8c1'),
	('6b3f2add-6923-4f4e-be32-5a4ea14c1cd2', '2024-12-11 22:06:22.378952', '2024-12-11 22:06:22.378952', 150000, 1, 'ff0b4555-743e-49df-9f9f-1abdd998419b', '9a176167-9ba2-489d-8eb7-86ed3822349b'),
	('6bbf7a8c-97e2-4837-be30-62eab592845e', '2024-11-29 12:18:32.307500', '2024-11-29 12:18:32.308015', 150000, 1, 'ff0b4555-743e-49df-9f9f-1abdd998419b', 'b878ae17-536a-4ba1-ab6a-8015c7eb80fe'),
	('6cc02802-1ed1-4257-8471-4d99bee76e78', '2024-11-29 18:41:42.405552', '2024-11-29 18:41:42.405552', 150000, 1, 'ff0b4555-743e-49df-9f9f-1abdd998419b', '74ae155e-2c75-4c64-8577-e235f77d4dc2'),
	('83fbcf2b-29ba-4e29-82b8-6a65133e5cda', '2024-12-01 09:31:33.302219', '2024-12-01 09:31:33.302219', 130000, 1, 'bf1346f5-1253-4327-88f6-ff0bcff4a259', '3f46ac1d-a79b-4c31-b508-bb252c503215'),
	('8cf751c2-27a5-44b3-9c2d-93b98fc4453f', '2024-12-11 22:06:22.387830', '2024-12-11 22:06:22.388277', 105000, 1, 'bf1346f5-1253-4327-88f6-ff0bcff4a259', '9a176167-9ba2-489d-8eb7-86ed3822349b'),
	('8ef7e9c1-ac9e-4392-80e3-0c8fca8c1c32', '2024-11-30 10:59:09.363871', '2024-11-30 10:59:09.363916', 115000, 2, '0a3366a6-fe74-4452-83c8-3750cd1d0cd4', '93accc61-eb40-4526-b766-c03ee32d3b84'),
	('9ead1f5e-3567-42a3-b53c-f287a3ab6b59', '2024-11-30 10:37:26.379983', '2024-11-30 10:37:26.380037', 115000, 1, '0a3366a6-fe74-4452-83c8-3750cd1d0cd4', '12a5547e-17af-4c37-9f6c-e820eada42cc'),
	('a7e42a95-aa9f-4cac-b419-8e2b5b76a69a', '2024-12-11 22:14:32.959422', '2024-12-11 22:14:32.959422', 105000, 2, 'bf1346f5-1253-4327-88f6-ff0bcff4a259', 'd527cabe-f773-427b-99e8-5abfd8f790b7'),
	('b0520673-95d1-48c6-8751-c2502415b69d', '2024-11-28 18:22:52.574927', '2024-11-28 18:22:52.574927', 105000, 1, 'bf1346f5-1253-4327-88f6-ff0bcff4a259', 'cb9fd4ae-e8a6-4481-bf8c-3f27047af9f0'),
	('c11ce571-ba1c-495f-ab4a-af6ba95feb5a', '2024-11-29 19:09:15.981103', '2024-11-29 19:09:15.981103', 120000, 1, '6be191e1-7151-4824-ac3f-cf347d297287', '4d672733-2ee6-42b9-b19d-170c24de99db'),
	('c8964ab3-066a-4036-80ca-8415f942b2d5', '2024-11-28 18:24:08.415461', '2024-11-28 18:24:08.415461', 150000, 1, 'ff0b4555-743e-49df-9f9f-1abdd998419b', '8b87b99d-40e8-4e07-a276-c7a828e86dd8');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

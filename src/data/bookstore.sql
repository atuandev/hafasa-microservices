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


-- Dumping database structure for bookstore
CREATE DATABASE IF NOT EXISTS `bookstore` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bookstore`;

-- Dumping structure for table bookstore.addresses
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

-- Dumping data for table bookstore.addresses: ~2 rows (approximately)
DELETE FROM `addresses`;
INSERT INTO `addresses` (`id`, `created_at`, `updated_at`, `address`, `receiver_name`, `receiver_phone`, `user_id`) VALUES
	('00864ac4-9b20-4f67-a56a-21cf8fb0a748', '2024-11-30 10:37:03.673998', '2024-11-30 10:37:03.674057', '34/8b Tân Xuân 5', 'Tuan Anh', '0982728717', '268a4722-2abf-483a-a58b-ef41dc5d7537'),
	('53a09f78-70cb-4547-ab3f-dbe2d78a9038', '2024-11-27 20:30:33.603955', '2024-11-27 20:30:33.603955', 'Quận 12, HCM', 'Boi boi', '0928123121', '9b1c2041-348d-4cb4-98e5-bbf229c4a17f');

-- Dumping structure for table bookstore.books
CREATE TABLE IF NOT EXISTS `books` (
  `id` varchar(255) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `description` text,
  `import_price` double DEFAULT NULL,
  `is_featured` bit(1) DEFAULT NULL,
  `is_new` bit(1) DEFAULT NULL,
  `pages` int DEFAULT NULL,
  `price` double DEFAULT NULL,
  `publish_year` int DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `sold` int DEFAULT NULL,
  `status` enum('ACTIVE','DISABLED','DRAFT') DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `thumbnail` text NOT NULL,
  `title` varchar(255) NOT NULL,
  `weight` int DEFAULT NULL,
  `category_id` varchar(255) DEFAULT NULL,
  `discount_id` varchar(255) DEFAULT NULL,
  `publisher_id` varchar(255) DEFAULT NULL,
  `review_count` int DEFAULT NULL,
  `review_star` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK67hmc2c9xvynx28p9f1wl6prb` (`slug`),
  KEY `FKleqa3hhc0uhfvurq6mil47xk0` (`category_id`),
  KEY `FKfkk1y5u1mu5gar2c9epeuaji4` (`discount_id`),
  KEY `FKayy5edfrqnegqj3882nce6qo8` (`publisher_id`),
  CONSTRAINT `FKayy5edfrqnegqj3882nce6qo8` FOREIGN KEY (`publisher_id`) REFERENCES `publishers` (`id`),
  CONSTRAINT `FKfkk1y5u1mu5gar2c9epeuaji4` FOREIGN KEY (`discount_id`) REFERENCES `discounts` (`id`),
  CONSTRAINT `FKleqa3hhc0uhfvurq6mil47xk0` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table bookstore.books: ~14 rows (approximately)
DELETE FROM `books`;
INSERT INTO `books` (`id`, `created_at`, `updated_at`, `author`, `description`, `import_price`, `is_featured`, `is_new`, `pages`, `price`, `publish_year`, `size`, `slug`, `sold`, `status`, `stock`, `thumbnail`, `title`, `weight`, `category_id`, `discount_id`, `publisher_id`, `review_count`, `review_star`) VALUES
	('0a3366a6-fe74-4452-83c8-3750cd1d0cd4', '2024-11-27 22:42:29.373885', '2024-12-22 20:16:29.666745', 'Fumio Sasaki', 'Fumio Sasaki giới thiệu cách tối giản cuộc sống để hạnh phúc hơn.', 95000, b'0', b'1', 300, 115000, 2021, '21 x 14.5 x 2 cm', 'loi-song-toi-gian-cua-nguoi-nhat', 12, 'ACTIVE', 100, 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_240804_1.jpg', 'Lối Sống Tối Giản Của Người Nhật', 420, '0c5249aa-ef4e-4354-b578-72e123420e63', 'b55608cb-284f-4c6c-b4ad-20db451fb536', '1ead17a2-b1b3-4ebc-a934-4d6c7768e78e', 4, 4.75),
	('11eb2555-34a8-41b8-a0d8-041331c5a48f', '2024-11-27 22:42:02.541914', '2024-11-27 22:42:02.542717', 'Stephen R. Covey', 'Stephen R. Covey hướng dẫn bạn cách phát triển bản thân và đạt thành công bền vững.', 190000, b'1', b'1', 420, 230000, 2021, '22 x 15 x 2 cm', '7-thoi-quen-hieu-qua', 3, 'ACTIVE', 100, 'https://cdn0.fahasa.com/media/catalog/product/8/9/8935280400733.jpg', '7 Thói Quen Hiệu Quả', 500, 'aff839ef-70cb-418f-b500-d83ecb15e576', 'ceffbc44-79e1-4e16-938c-6ce2d4576b20', '714c3e12-62b9-43f1-b63f-023420e4228a', 0, 0),
	('186beedc-bd41-4d30-aefe-90b42bfe9fe7', '2024-11-27 22:42:11.727181', '2024-11-27 22:42:11.727181', 'Nguyễn Nhật Ánh', 'Nguyễn Nhật Ánh kể câu chuyện tuổi thơ trong sáng, bình yên và đậm chất quê hương.', 65000, b'0', b'0', 378, 80000, 2018, '18.5 x 12.5 x 1.8 cm', 'toi-thay-hoa-vang-tren-co-xanh', 20, 'ACTIVE', 100, 'https://cdn0.fahasa.com/media/catalog/product/n/n/nna-hvtcx.jpg', 'Tôi Thấy Hoa Vàng Trên Cỏ Xanh', 300, '4b37a61a-84c9-43ce-906f-46686543e9cc', 'ceffbc44-79e1-4e16-938c-6ce2d4576b20', 'ec90e568-c831-4652-8324-6a38937c9a83', 2, 0),
	('2a48914e-e2f0-47ee-9f7d-4a0c8d75b270', '2024-11-27 22:41:47.285305', '2024-11-27 22:41:47.285305', 'Yuval Noah Harari', 'Yuval Noah Harari kể lại lịch sử nhân loại một cách sáng tạo và cuốn hút.', 200000, b'1', b'0', 512, 250000, 2020, '23 x 15 x 3 cm', 'sapiens-luoc-su-loai-nguoi', 2, 'ACTIVE', 100, 'https://cdn0.fahasa.com/media/flashmagazine/images/page_images/sapiens_luoc_su_loai_nguoi/2023_03_21_16_35_44_1-390x510.jpg', 'Sapiens: Lược Sử Loài Người', 600, 'b36c7ed7-d6f1-4dc4-8998-33f5528f7a29', 'ceffbc44-79e1-4e16-938c-6ce2d4576b20', '664d2d60-35f6-40fd-a5a5-a22b53062e40', 0, 0),
	('39d6be7c-b2ff-4680-88a1-517a22af6cf0', '2024-11-27 22:41:54.368716', '2024-11-27 22:41:54.368716', 'Tony Buổi Sáng', 'Tập hợp những câu chuyện đời thường hài hước và bài học cuộc sống từ Tony Buổi Sáng.', 85000, b'0', b'0', 280, 110000, 2019, '20 x 14 x 1.5 cm', 'ca-phe-cung-tony', 10, 'ACTIVE', 100, 'https://cdn0.fahasa.com/media/catalog/product/8/9/8934974180548.jpg', 'Cà Phê Cùng Tony', 350, '6bbe45ee-db1c-4727-9703-9ed73d00a5e6', 'b55608cb-284f-4c6c-b4ad-20db451fb536', 'ec90e568-c831-4652-8324-6a38937c9a83', 0, 0),
	('54f2c395-6d30-4795-93d3-d3e3bb3b241d', '2024-11-27 22:41:36.253524', '2024-11-27 22:41:36.253524', 'Dale Carnegie', 'Cuốn sách kỹ năng sống kinh điển giúp bạn thành công trong giao tiếp và quản lý mối quan hệ.', 105000, b'1', b'1', 320, 135000, 2022, '20.5 x 14 x 2.5 cm', 'dac-nhan-tam', 7, 'ACTIVE', 100, 'https://cdn0.fahasa.com/media/catalog/product/8/9/8935270704704.jpg', 'Đắc Nhân Tâm', 400, 'aff839ef-70cb-418f-b500-d83ecb15e576', 'ceffbc44-79e1-4e16-938c-6ce2d4576b20', '972b43a7-e3b2-4a8a-ad47-8c90ed53ba16', 0, 0),
	('6be191e1-7151-4824-ac3f-cf347d297287', '2024-11-27 22:41:21.497671', '2024-11-29 19:09:15.935008', 'Paulo Coelho', 'Tác phẩm nổi tiếng của Paulo Coelho về hành trình tìm kiếm ước mơ và ý nghĩa cuộc sống.', 95000, b'0', b'1', 228, 120000, 2021, '20 x 13.5 x 2 cm', 'nha-gia-kim', 6, 'ACTIVE', 100, 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_36793.jpg', 'Nhà Giả Kim', 300, '9e7d752e-8c9e-4666-a2a0-367ede84f09d', 'ceffbc44-79e1-4e16-938c-6ce2d4576b20', 'a300003a-5c47-4df7-a591-0bdf9142a8b5', 0, 0),
	('71383a12-b01d-4803-9302-a07d1dc9e99a', '2024-11-27 22:42:34.907707', '2024-11-30 10:37:26.273144', 'Victor Hugo', 'Victor Hugo kể câu chuyện cảm động về nhân đạo và công lý.', 300000, b'1', b'0', 2054, 390000, 2017, '21 x 14 x 10.5 cm\r\n', 'nhung-nguoi-khon-kho', 6, 'ACTIVE', 100, 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_229206.jpg', 'Những Người Khốn Khổ', 2220, '4b37a61a-84c9-43ce-906f-46686543e9cc', 'ceffbc44-79e1-4e16-938c-6ce2d4576b20', 'a300003a-5c47-4df7-a591-0bdf9142a8b5', 0, 0),
	('7802e89f-5f17-472a-ab9b-8f26962054dd', '2024-11-26 16:07:51.259041', '2024-11-26 16:07:51.259041', 'Jeffrey Archer', 'Jeffrey Archer là nhà văn người Anh và cũng là một chính trị gia. Ông từng là một thành viên của Quốc hội và Phó Chủ tịch Đảng Bảo thủ.', 150000, b'1', b'1', 768, 180000, 2024, '20.5 x 13.5 x 3 cm', 'hai-so-phan-bia-cung-tai-ban-2024', 0, 'ACTIVE', 100, 'https://cdn0.fahasa.com/media/catalog/product/h/s/hsp-bia-cung---xuat-in-goc-b1_1.jpg', 'Hai Số Phận - Bìa Cứng (Tái Bản 2024)', 685, '4b37a61a-84c9-43ce-906f-46686543e9cc', 'b55608cb-284f-4c6c-b4ad-20db451fb536', 'a300003a-5c47-4df7-a591-0bdf9142a8b5', 0, 0),
	('7a3fae04-a30a-4557-9600-b58238fe4f34', '2024-11-26 15:33:02.362021', '2024-11-26 15:33:02.362021', 'Jeffrey Archer', 'Jeffrey Archer là nhà văn người Anh và cũng là một chính trị gia. Ông từng là một thành viên của Quốc hội và Phó Chủ tịch Đảng Bảo thủ.', 150000, b'1', b'1', 768, 178000, 2023, '20.5 x 13.5 x 3 cm', 'hai-so-phan-bia-cung-tai-ban-2023', 0, 'ACTIVE', 100, 'https://cdn0.fahasa.com/media/catalog/product/h/s/hsp-bia-cung---xuat-in-goc-b1_1.jpg', 'Hai Số Phận - Bìa Cứng (Tái Bản 2023)', 685, '4b37a61a-84c9-43ce-906f-46686543e9cc', 'b55608cb-284f-4c6c-b4ad-20db451fb536', 'a300003a-5c47-4df7-a591-0bdf9142a8b5', 0, 0),
	('8ce1d18b-a767-4cb2-83a5-ac97661d50a2', '2024-11-26 16:08:05.825175', '2024-11-26 16:08:05.825731', 'Jeffrey Archer', 'Jeffrey Archer là nhà văn người Anh và cũng là một chính trị gia. Ông từng là một thành viên của Quốc hội và Phó Chủ tịch Đảng Bảo thủ.', 150000, b'1', b'1', 768, 177000, 2022, '20.5 x 13.5 x 3 cm', 'hai-so-phan-bia-cung-tai-ban-2022', 0, 'ACTIVE', 100, 'https://cdn0.fahasa.com/media/catalog/product/h/s/hsp-bia-cung---xuat-in-goc-b1_1.jpg', 'Hai Số Phận - Bìa Cứng (Tái Bản 2022)', 685, '4b37a61a-84c9-43ce-906f-46686543e9cc', 'b55608cb-284f-4c6c-b4ad-20db451fb536', 'a300003a-5c47-4df7-a591-0bdf9142a8b5', 0, 0),
	('bf1346f5-1253-4327-88f6-ff0bcff4a259', '2024-11-27 22:42:21.241832', '2024-12-11 22:15:50.491402', 'Fukuzawa Yukichi', 'Fukuzawa Yukichi khuyến khích tư duy độc lập và học hỏi không ngừng.', 105000, b'1', b'0', 248, 130000, 2019, '19 x 13 x 2 cm', 'khuyen-hoc', 19, 'ACTIVE', 96, 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_214482_1.jpg', 'Khuyến Học', 400, '671dbce1-9a7b-484a-a016-2332d50d55bb', 'ceffbc44-79e1-4e16-938c-6ce2d4576b20', '1066c347-337f-47f8-8fa8-41d425cdefcc', 0, 0),
	('d534202f-1ac0-4d99-8992-0a55bfed5411', '2024-11-26 16:08:54.017397', '2024-12-12 21:15:11.096693', 'Jeffrey Archer', 'Jeffrey Archer là nhà văn người Anh và cũng là một chính trị gia. Ông từng là một thành viên của Quốc hội và Phó Chủ tịch Đảng Bảo thủ.', 150000, b'1', b'1', 768, 176000, 2019, '20.5 x 13.5 x 3 cm', 'hai-so-phan-bia-cung-tai-ban-2019', 0, 'ACTIVE', 100, 'https://cdn0.fahasa.com/media/catalog/product/h/s/hsp-bia-cung---xuat-in-goc-b1_1.jpg', 'Hai Số Phận - Bìa Cứng (Tái Bản 2019)', 685, '4b37a61a-84c9-43ce-906f-46686543e9cc', 'ceffbc44-79e1-4e16-938c-6ce2d4576b20', 'a300003a-5c47-4df7-a591-0bdf9142a8b5', 0, 0),
	('ff0b4555-743e-49df-9f9f-1abdd998419b', '2024-11-26 16:08:10.977203', '2024-12-11 22:15:50.468296', 'Jeffrey Archer', 'Jeffrey Archer là nhà văn người Anh và cũng là một chính trị gia. Ông từng là một thành viên của Quốc hội và Phó Chủ tịch Đảng Bảo thủ.', 150000, b'1', b'1', 768, 175000, 2021, '20.5 x 13.5 x 3 cm', 'hai-so-phan-bia-cung-tai-ban-2021', 10, 'ACTIVE', 198, 'https://cdn0.fahasa.com/media/catalog/product/h/s/hsp-bia-cung---xuat-in-goc-b1_1.jpg', 'Hai Số Phận - Bìa Cứng (Tái Bản 2021)', 685, '4b37a61a-84c9-43ce-906f-46686543e9cc', 'ceffbc44-79e1-4e16-938c-6ce2d4576b20', 'a300003a-5c47-4df7-a591-0bdf9142a8b5', 0, 0);

-- Dumping structure for table bookstore.book_images
CREATE TABLE IF NOT EXISTS `book_images` (
  `id` varchar(255) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `url` text,
  `book_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcnpy06tjmrsjisjf2bqpuvvbl` (`book_id`),
  CONSTRAINT `FKcnpy06tjmrsjisjf2bqpuvvbl` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table bookstore.book_images: ~14 rows (approximately)
DELETE FROM `book_images`;
INSERT INTO `book_images` (`id`, `created_at`, `updated_at`, `url`, `book_id`) VALUES
	('0f01ef11-7d01-412f-966a-d3d2826f399a', '2024-11-26 15:33:02.387839', '2024-11-26 15:33:02.387839', 'https://cdn0.fahasa.com/media/catalog/product/h/s/hsp-bia-cung---xuat-in-goc-b1_1.jpg', '7a3fae04-a30a-4557-9600-b58238fe4f34'),
	('110c1840-9473-4fda-8718-6aa2a4786a6c', '2024-11-27 22:42:11.734024', '2024-11-27 22:42:11.734024', 'https://cdn0.fahasa.com/media/catalog/product/n/n/nna-hvtcx.jpg', '186beedc-bd41-4d30-aefe-90b42bfe9fe7'),
	('324909ca-fa5a-459f-ac0d-208eeaffcde3', '2024-11-27 22:41:21.539801', '2024-11-27 22:41:21.539801', 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_36793.jpg', '6be191e1-7151-4824-ac3f-cf347d297287'),
	('38a6f6c8-1c0e-4301-a25b-db5e00a75746', '2024-11-26 16:08:05.832709', '2024-11-26 16:08:05.832709', 'https://cdn0.fahasa.com/media/catalog/product/h/s/hsp-bia-cung---xuat-in-goc-b1_1.jpg', '8ce1d18b-a767-4cb2-83a5-ac97661d50a2'),
	('3dc875aa-a7ef-4319-ae08-ead258594c40', '2024-11-27 22:42:21.248203', '2024-11-27 22:42:21.248712', 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_214482_1.jpg', 'bf1346f5-1253-4327-88f6-ff0bcff4a259'),
	('5b6d773a-ce94-436c-8baf-af2f12db4b00', '2024-11-26 16:08:10.986231', '2024-11-26 16:08:10.986231', 'https://cdn0.fahasa.com/media/catalog/product/h/s/hsp-bia-cung---xuat-in-goc-b1_1.jpg', 'ff0b4555-743e-49df-9f9f-1abdd998419b'),
	('7b6053ca-4128-4e71-bb5b-6b6a05ccf880', '2024-11-27 22:42:02.552355', '2024-11-27 22:42:02.552355', 'https://cdn0.fahasa.com/media/catalog/product/8/9/8935280400733.jpg', '11eb2555-34a8-41b8-a0d8-041331c5a48f'),
	('9370056a-bb3d-41b1-8098-0f2b76e74cef', '2024-11-27 22:42:34.914165', '2024-11-27 22:42:34.914165', 'https://cdn0.fahasa.com/media/catalog/product/8/9/8935086840252.jpg', '71383a12-b01d-4803-9302-a07d1dc9e99a'),
	('9eda7133-6a0a-4995-a5ac-466e7f56f414', '2024-11-27 22:42:29.396999', '2024-11-27 22:42:29.396999', 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_240804_1.jpg', '0a3366a6-fe74-4452-83c8-3750cd1d0cd4'),
	('bf28f003-9016-44cc-bd36-678cb02de219', '2024-11-26 16:07:51.271819', '2024-11-26 16:07:51.271819', 'https://cdn0.fahasa.com/media/catalog/product/h/s/hsp-bia-cung---xuat-in-goc-b1_1.jpg', '7802e89f-5f17-472a-ab9b-8f26962054dd'),
	('d5c6eed7-28b4-43d0-ad8c-f184cad500a1', '2024-11-27 22:41:54.406896', '2024-11-27 22:41:54.406896', 'https://cdn0.fahasa.com/media/catalog/product/8/9/8934974180548.jpg', '39d6be7c-b2ff-4680-88a1-517a22af6cf0'),
	('e432283e-7421-4898-bcbb-169a5bfa6324', '2024-11-27 22:41:47.297634', '2024-11-27 22:41:47.297721', 'https://cdn0.fahasa.com/media/flashmagazine/images/page_images/sapiens_luoc_su_loai_nguoi/2023_03_21_16_35_44_1-390x510.jpg', '2a48914e-e2f0-47ee-9f7d-4a0c8d75b270'),
	('e8081f28-4286-4f40-a8c6-e3649a0f0951', '2024-11-26 16:08:54.054109', '2024-11-26 16:08:54.054109', 'https://cdn0.fahasa.com/media/catalog/product/h/s/hsp-bia-cung---xuat-in-goc-b1_1.jpg', 'd534202f-1ac0-4d99-8992-0a55bfed5411'),
	('edc397e2-3761-4234-b14f-d8c943529b0c', '2024-11-27 22:41:36.259130', '2024-11-27 22:41:36.259130', 'https://cdn0.fahasa.com/media/catalog/product/8/9/8935270704704.jpg', '54f2c395-6d30-4795-93d3-d3e3bb3b241d');

-- Dumping structure for table bookstore.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` varchar(255) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `description` text,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKoul14ho7bctbefv8jywp5v3i2` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table bookstore.categories: ~8 rows (approximately)
DELETE FROM `categories`;
INSERT INTO `categories` (`id`, `created_at`, `updated_at`, `description`, `name`, `slug`) VALUES
	('0c5249aa-ef4e-4354-b578-72e123420e63', '2024-11-27 22:35:54.165530', '2024-11-27 22:35:54.165530', NULL, 'Phong Cách Sống', 'phong-cach-song'),
	('4b37a61a-84c9-43ce-906f-46686543e9cc', '2024-12-08 18:58:43.987201', '2024-12-08 18:58:43.987201', NULL, 'Tiểu thuyết', 'tieu-thuyet'),
	('671dbce1-9a7b-484a-a016-2332d50d55bb', '2024-11-27 22:34:55.050878', '2024-11-27 22:34:55.050878', NULL, 'Giáo Dục', 'giao-duc'),
	('6bbe45ee-db1c-4727-9703-9ed73d00a5e6', '2024-11-27 22:32:56.265017', '2024-11-27 22:32:56.265460', NULL, 'Truyện Ngắn', 'truyen-ngan'),
	('9e7d752e-8c9e-4666-a2a0-367ede84f09d', '2024-11-27 22:15:05.630498', '2024-11-27 22:15:05.630498', 'Văn Học', 'Văn Học', 'van-hoc'),
	('aff839ef-70cb-418f-b500-d83ecb15e576', '2024-11-27 22:05:07.000700', '2024-11-27 22:05:07.000700', 'Kỹ Năng Sống', 'Kỹ Năng Sống', 'ky-nang-song'),
	('b36c7ed7-d6f1-4dc4-8998-33f5528f7a29', '2024-11-27 22:31:47.008374', '2024-11-27 22:31:47.008374', NULL, 'Lịch Sử', 'lich-su'),
	('c5de0c4f-7419-4c93-9aea-ac1c9e6da444', '2024-12-08 18:48:28.231746', '2024-12-08 18:48:28.231746', 'Truyền thuyết', 'Truyền thuyết', 'thuyen-thuyet');

-- Dumping structure for table bookstore.discounts
CREATE TABLE IF NOT EXISTS `discounts` (
  `id` varchar(255) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `percent` int DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKbc29q3wh0lqhy0k84bx3afk08` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table bookstore.discounts: ~3 rows (approximately)
DELETE FROM `discounts`;
INSERT INTO `discounts` (`id`, `created_at`, `updated_at`, `code`, `end_date`, `name`, `percent`, `start_date`) VALUES
	('257d2d0e-7839-487c-851d-93a9d51ae3c3', '2024-12-08 20:03:02.736584', '2024-12-08 21:46:36.643766', '12THANG12', '2024-12-12', '12 tháng 12', 12, '2024-12-08'),
	('b55608cb-284f-4c6c-b4ad-20db451fb536', '2024-12-01 09:20:52.000000', '2024-12-01 09:20:56.000000', 'HELLO', '2024-12-07', 'Xin chào thành viên mới', 5, '2024-12-01'),
	('ceffbc44-79e1-4e16-938c-6ce2d4576b20', '2024-11-30 21:08:21.000000', '2024-11-30 21:08:21.000000', 'BLACKFRIDAY', '2024-12-30', 'Black Friday', 15, '2024-11-20');

-- Dumping structure for table bookstore.invalidated_tokens
CREATE TABLE IF NOT EXISTS `invalidated_tokens` (
  `id` varchar(255) NOT NULL,
  `expiry_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table bookstore.invalidated_tokens: ~0 rows (approximately)
DELETE FROM `invalidated_tokens`;

-- Dumping structure for table bookstore.orders
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

-- Dumping data for table bookstore.orders: ~13 rows (approximately)
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

-- Dumping structure for table bookstore.order_details
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

-- Dumping data for table bookstore.order_details: ~25 rows (approximately)
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

-- Dumping structure for table bookstore.permissions
CREATE TABLE IF NOT EXISTS `permissions` (
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table bookstore.permissions: ~2 rows (approximately)
DELETE FROM `permissions`;
INSERT INTO `permissions` (`name`, `description`) VALUES
	('USER_ADD', 'Add user'),
	('USER_DELETE', 'Delete user');

-- Dumping structure for table bookstore.publishers
CREATE TABLE IF NOT EXISTS `publishers` (
  `id` varchar(255) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `description` text,
  `image` text,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK439cob4187h6rodiq6n7rg518` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table bookstore.publishers: ~7 rows (approximately)
DELETE FROM `publishers`;
INSERT INTO `publishers` (`id`, `created_at`, `updated_at`, `address`, `description`, `image`, `name`, `slug`, `status`) VALUES
	('1066c347-337f-47f8-8fa8-41d425cdefcc', '2024-11-27 22:35:17.151596', '2024-11-27 22:35:17.151739', 'Tầng 4, Tòa nhà Bộ Công Thương, số 655 Phạm Văn Đồng, quận Bắc Từ Liêm, Hà Nội', NULL, NULL, 'NXB Công Thương', 'nxb-cong-thuong', b'1'),
	('1ead17a2-b1b3-4ebc-a934-4d6c7768e78e', '2024-11-27 22:36:25.244177', '2024-11-27 22:36:25.244177', 'Số 65 Nguyễn Du, Hà Nội', NULL, NULL, 'NXB Hội Nhà Văn', 'nxb-hoi-nha-van', b'1'),
	('664d2d60-35f6-40fd-a5a5-a22b53062e40', '2024-11-27 22:32:24.367719', '2024-11-27 22:32:24.367719', '46 Trần Hưng Đạo, Hàng Bài, Hoàn Kiếm, Hà Nội', NULL, NULL, 'NXB Thế Giới', 'nxb-the-gioi', b'1'),
	('714c3e12-62b9-43f1-b63f-023420e4228a', '2024-11-27 22:33:54.583855', '2024-11-27 22:33:54.583855', '75 Giảng Võ, Đống Đa, Hà Nội', NULL, NULL, 'NXB Lao Động', 'nxb-lao-dong', b'1'),
	('972b43a7-e3b2-4a8a-ad47-8c90ed53ba16', '2024-11-27 22:30:39.116859', '2024-12-12 21:20:51.169644', 'Tầng 1 - Tòa nhà VUSTA - 53 Nguyễn Du - Quận Hai Bà Trưng - Hà Nội - Việt Nam', 'Nhà xuất bản Tri thức là nhà xuất bản Việt Nam thành lập vào tháng 9 năm 2005 trực thuộc Liên hiệp các Hội Khoa học và Kỹ thuật Việt Nam (VUSTA).', NULL, 'NXB Tri thức', 'nxb-tri-thuc', b'1'),
	('a300003a-5c47-4df7-a591-0bdf9142a8b5', '2024-12-12 22:32:29.062879', '2024-12-12 22:32:29.063879', '18 Nguyễn Trường Tộ, phường Trúc Bạch, quận Ba Đình, thành phố Hà Nội ', 'Ra đời trong những ngày tháng khói lửa của cuộc kháng chiến chống Pháp, trưởng thành qua các thời kỳ đấu tranh giải phóng dân tộc và công cuộc xây dựng Tổ quốc XHCN, hơn 70 năm qua, NXB Văn học luôn đồng hành cùng những biến động của đất nước, hoà chung nhịp thở của đời sống nhân dân và phong trào văn nghệ cả nước.', NULL, 'NXB Văn học', 'nxb-van-hoc', b'1'),
	('ec90e568-c831-4652-8324-6a38937c9a83', '2024-11-27 22:33:22.454568', '2024-12-12 21:16:31.104198', '161B Lý Chính Thắng, Phường Võ Thị Sáu, Quận 3, Hồ Chí Minh', 'Năm năm sau ngày đất nước thống nhất, phong trào thanh thiếu nhi thành phố đã có những bước phát triển vượt bậc cả về số lượng và chất lượng, công việc giáo dục thanh thiếu nhi cần thêm nhiều tài liệu thiết thực, bổ ích, phù hợp với yêu cầu phát triển của địa phương trong tình hình mới, được sự quan tâm lãnh đạo và chỉ đạo của Thành ủy, một số cán bộ Đoàn tâm huyết với việc giáo dục thanh thiếu nhi qua các xuất bản phẩm của Thành đoàn được phân công chuẩn bị lực lượng để thành lập một NXB, trước mắt là in sách phục vụ cho phong trào thiếu nhi thành phố. Trên tinh thần đó, ngày 24-3-1981 UBND TP HCM đã ký quyết định thành lập Nhà xuất bản Măng Non trực thuộc Thành đoàn TP.HCM.', NULL, 'NXB Trẻ', 'nxb-tre', b'1');

-- Dumping structure for table bookstore.reviews
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` varchar(255) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `comment` text,
  `rating` int NOT NULL,
  `status` enum('ACTIVE','DISABLED','PENDING') DEFAULT NULL,
  `book_id` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6a9k6xvev80se5rreqvuqr7f9` (`book_id`),
  KEY `FKcgy7qjc1r99dp117y9en6lxye` (`user_id`),
  CONSTRAINT `FK6a9k6xvev80se5rreqvuqr7f9` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `FKcgy7qjc1r99dp117y9en6lxye` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table bookstore.reviews: ~1 rows (approximately)
DELETE FROM `reviews`;
INSERT INTO `reviews` (`id`, `created_at`, `updated_at`, `comment`, `rating`, `status`, `book_id`, `user_id`) VALUES
	('1f9c1483-e9b9-40ed-a345-2abd377618d5', '2024-12-22 20:16:29.650883', '2024-12-22 20:16:29.650883', 'Qua xuat sac', 5, 'ACTIVE', '0a3366a6-fe74-4452-83c8-3750cd1d0cd4', '9b1c2041-348d-4cb4-98e5-bbf229c4a17f'),
	('70ae1b33-a090-4fe2-bd62-9bdafa334e84', '2024-12-22 20:16:16.704255', '2024-12-22 20:16:16.704255', 'Qua xuat sac', 5, 'ACTIVE', '0a3366a6-fe74-4452-83c8-3750cd1d0cd4', '9b1c2041-348d-4cb4-98e5-bbf229c4a17f'),
	('c5aceedd-29c3-4aaf-a552-c108c4aef4f0', '2024-12-22 20:15:55.210122', '2024-12-22 20:15:55.210122', 'Qua xuat sac', 5, 'ACTIVE', '0a3366a6-fe74-4452-83c8-3750cd1d0cd4', '9b1c2041-348d-4cb4-98e5-bbf229c4a17f'),
	('ca5cebfa-184d-4b3d-b7dd-35447a7df9c3', '2024-12-22 20:16:08.676679', '2024-12-22 20:16:08.676679', 'Qua xuat sac', 4, 'ACTIVE', '0a3366a6-fe74-4452-83c8-3750cd1d0cd4', '9b1c2041-348d-4cb4-98e5-bbf229c4a17f');

-- Dumping structure for table bookstore.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table bookstore.roles: ~2 rows (approximately)
DELETE FROM `roles`;
INSERT INTO `roles` (`name`, `description`) VALUES
	('ADMIN', 'Admin role'),
	('USER', 'User role');

-- Dumping structure for table bookstore.roles_permissions
CREATE TABLE IF NOT EXISTS `roles_permissions` (
  `role_name` varchar(255) NOT NULL,
  `permissions_name` varchar(255) NOT NULL,
  PRIMARY KEY (`role_name`,`permissions_name`),
  KEY `FK9u1xpvjxbdnkca024o6fyr7uu` (`permissions_name`),
  CONSTRAINT `FK6nw4jrj1tuu04j9rk7xwfssd6` FOREIGN KEY (`role_name`) REFERENCES `roles` (`name`),
  CONSTRAINT `FK9u1xpvjxbdnkca024o6fyr7uu` FOREIGN KEY (`permissions_name`) REFERENCES `permissions` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table bookstore.roles_permissions: ~0 rows (approximately)
DELETE FROM `roles_permissions`;

-- Dumping structure for table bookstore.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(255) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `avatar` text,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` enum('ACTIVE','DISABLED') DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table bookstore.users: ~3 rows (approximately)
DELETE FROM `users`;
INSERT INTO `users` (`id`, `created_at`, `updated_at`, `avatar`, `email`, `name`, `password`, `status`, `username`) VALUES
	('0d42394b-35ac-4b8f-9e96-a513388d007d', '2024-12-01 20:16:50.723267', '2024-12-01 20:16:50.723267', 'https://ui-avatars.com/api/?background=random&rounded=true&bold=true&name=anh+tuan', 'tuan@gmail.com', 'anh tuan', '$2a$10$0syVww3PJqxeSe3BdBMs8eY4p19fTOsJzDtFEg4Uw1.IaGcEIiJ7W', 'ACTIVE', 'anhtuan'),
	('268a4722-2abf-483a-a58b-ef41dc5d7537', '2024-11-29 12:17:43.055830', '2024-11-30 10:35:36.371551', 'https://ui-avatars.com/api/?background=random&rounded=true&bold=true&name=Son+Tung', 'sontung@gmail.com', 'Son Tung', '$2a$10$yrggAneP6/iNd2pTEGgy/uf6Xvh1eP5silSsixip6dU6eD3TPB05i', 'ACTIVE', 'sontung'),
	('9b1c2041-348d-4cb4-98e5-bbf229c4a17f', '2024-11-25 14:23:09.381710', '2024-12-23 15:28:49.892460', 'https://ui-avatars.com/api/?background=random&rounded=true&bold=true&name=Anh+Tuan', 'atuandev@gmail.com', 'Nguyen Phan Anh Tuan', '$2a$10$dTo9vuSZZMo5k6NFqu8nPOdCuvoIbNMZuldAouO28asrPtyk74aki', 'ACTIVE', 'admin');

-- Dumping structure for table bookstore.users_roles
CREATE TABLE IF NOT EXISTS `users_roles` (
  `user_id` varchar(255) NOT NULL,
  `roles_name` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`,`roles_name`),
  KEY `FKmi9sfx618v14gm89cyw408hqu` (`roles_name`),
  CONSTRAINT `FK2o0jvgh89lemvvo17cbqvdxaa` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKmi9sfx618v14gm89cyw408hqu` FOREIGN KEY (`roles_name`) REFERENCES `roles` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table bookstore.users_roles: ~2 rows (approximately)
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

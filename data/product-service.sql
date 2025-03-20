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


-- Dumping database structure for hafasa_product_db
CREATE DATABASE IF NOT EXISTS `hafasa_product_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hafasa_product_db`;

-- Dumping structure for table hafasa_product_db.books
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

-- Dumping data for table hafasa_product_db.books: ~15 rows (approximately)
DELETE FROM `books`;
INSERT INTO `books` (`id`, `created_at`, `updated_at`, `author`, `description`, `import_price`, `is_featured`, `is_new`, `pages`, `price`, `publish_year`, `size`, `slug`, `sold`, `status`, `stock`, `thumbnail`, `title`, `weight`, `category_id`, `discount_id`, `publisher_id`, `review_count`, `review_star`) VALUES
	('0a3366a6-fe74-4452-83c8-3750cd1d0cd4', '2024-11-27 22:42:29.373885', '2024-12-22 20:16:29.666745', 'Fumio Sasaki', 'Fumio Sasaki giới thiệu cách tối giản cuộc sống để hạnh phúc hơn.', 95000, b'0', b'1', 300, 115000, 2021, '21 x 14.5 x 2', 'loi-song-toi-gian-cua-nguoi-nhat', 12, 'ACTIVE', 100, 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677728/bookstore/mjyv2gthzezjssspn4pu.jpg', 'Lối Sống Tối Giản Của Người Nhật', 420, '0c5249aa-ef4e-4354-b578-72e123420e63', 'b55608cb-284f-4c6c-b4ad-20db451fb536', '1ead17a2-b1b3-4ebc-a934-4d6c7768e78e', 4, 4.75),
	('11eb2555-34a8-41b8-a0d8-041331c5a48f', '2024-11-27 22:42:02.541914', '2024-11-27 22:42:02.542717', 'Stephen R. Covey', 'Stephen R. Covey hướng dẫn bạn cách phát triển bản thân và đạt thành công bền vững.', 190000, b'1', b'1', 420, 230000, 2021, '22 x 15 x 2', '7-thoi-quen-hieu-qua', 3, 'ACTIVE', 100, 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677705/bookstore/l823jy1k6vmshapw616r.jpg', '7 Thói Quen Hiệu Quả', 500, 'aff839ef-70cb-418f-b500-d83ecb15e576', 'ceffbc44-79e1-4e16-938c-6ce2d4576b20', '714c3e12-62b9-43f1-b63f-023420e4228a', 0, 0),
	('186beedc-bd41-4d30-aefe-90b42bfe9fe7', '2024-11-27 22:42:11.727181', '2024-11-27 22:42:11.727181', 'Nguyễn Nhật Ánh', 'Nguyễn Nhật Ánh kể câu chuyện tuổi thơ trong sáng, bình yên và đậm chất quê hương.', 65000, b'0', b'0', 378, 80000, 2018, '18.5 x 12.5 x 1.8', 'toi-thay-hoa-vang-tren-co-xanh', 20, 'ACTIVE', 100, 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677646/bookstore/bsxe6ev8ibkoemfwf8hw.jpg', 'Tôi Thấy Hoa Vàng Trên Cỏ Xanh', 300, '4b37a61a-84c9-43ce-906f-46686543e9cc', 'ceffbc44-79e1-4e16-938c-6ce2d4576b20', 'ec90e568-c831-4652-8324-6a38937c9a83', 2, 0),
	('2a48914e-e2f0-47ee-9f7d-4a0c8d75b270', '2024-11-27 22:41:47.285305', '2024-11-27 22:41:47.285305', 'Yuval Noah Harari', 'Yuval Noah Harari kể lại lịch sử nhân loại một cách sáng tạo và cuốn hút.', 200000, b'1', b'0', 512, 250000, 2020, '23 x 15 x 3', 'sapiens-luoc-su-loai-nguoi', 2, 'ACTIVE', 100, 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677619/bookstore/wkwisfy6as588sk9yo8i.jpg', 'Sapiens: Lược Sử Loài Người', 600, 'b36c7ed7-d6f1-4dc4-8998-33f5528f7a29', 'ceffbc44-79e1-4e16-938c-6ce2d4576b20', '664d2d60-35f6-40fd-a5a5-a22b53062e40', 0, 0),
	('39d6be7c-b2ff-4680-88a1-517a22af6cf0', '2024-11-27 22:41:54.368716', '2024-11-27 22:41:54.368716', 'Tony Buổi Sáng', 'Tập hợp những câu chuyện đời thường hài hước và bài học cuộc sống từ Tony Buổi Sáng.', 85000, b'0', b'0', 280, 110000, 2019, '20 x 14 x 1.5', 'ca-phe-cung-tony', 10, 'ACTIVE', 100, 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677584/bookstore/jf13ob9k65udqxj0okmo.jpg', 'Cà Phê Cùng Tony', 350, '6bbe45ee-db1c-4727-9703-9ed73d00a5e6', 'b55608cb-284f-4c6c-b4ad-20db451fb536', 'ec90e568-c831-4652-8324-6a38937c9a83', 0, 0),
	('4213ab15-0c79-44e5-beef-abb31813b16c', '2025-03-11 14:52:26.707870', '2025-03-11 14:56:54.613474', 'Peter Lynch, John Rothchild', 'Peter Lynch là nhà quản lý tài chính số 1 ở Mỹ. Quan điểm của ông là: Tất cả các nhà đầu tư trung bình đều có thể trở thành những chuyên gia hàng đầu trong lĩnh vực của họ và họ có thể chọn được những cổ phiếu hời nhất không kém gì các chuyên gia đầu tư trên Phố Wall chỉ bằng việc thực hiện một cuộc điều tra nhỏ.', 140000, b'0', b'1', 572, 160000, 2021, '20.5 x 13 x 5', 'tren-djinh-pho-wall-tai-ban-2021', 0, 'DRAFT', 100, 'https://res.cloudinary.com/dimer1lki/image/upload/v1741679432/image_230105_xnepax.jpg', 'Trên Đỉnh Phố Wall (Tái Bản 2021)', 350, '671dbce1-9a7b-484a-a016-2332d50d55bb', NULL, '714c3e12-62b9-43f1-b63f-023420e4228a', 0, 0),
	('54f2c395-6d30-4795-93d3-d3e3bb3b241d', '2024-11-27 22:41:36.253524', '2024-11-27 22:41:36.253524', 'Dale Carnegie', 'Cuốn sách kỹ năng sống kinh điển giúp bạn thành công trong giao tiếp và quản lý mối quan hệ.', 105000, b'1', b'1', 320, 135000, 2022, '20.5 x 14 x 2.5', 'dac-nhan-tam', 7, 'ACTIVE', 100, 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677532/bookstore/lk420rlnqpuqrjnpmk5m.jpg', 'Đắc Nhân Tâm', 400, 'aff839ef-70cb-418f-b500-d83ecb15e576', 'ceffbc44-79e1-4e16-938c-6ce2d4576b20', '972b43a7-e3b2-4a8a-ad47-8c90ed53ba16', 0, 0),
	('6be191e1-7151-4824-ac3f-cf347d297287', '2024-11-27 22:41:21.497671', '2024-11-29 19:09:15.935008', 'Paulo Coelho', 'Tác phẩm nổi tiếng của Paulo Coelho về hành trình tìm kiếm ước mơ và ý nghĩa cuộc sống.', 95000, b'0', b'1', 228, 120000, 2021, '20 x 13.5 x 2', 'nha-gia-kim', 6, 'ACTIVE', 100, 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677501/bookstore/fkn29euzlhreumsco5d7.jpg', 'Nhà Giả Kim', 300, '9e7d752e-8c9e-4666-a2a0-367ede84f09d', 'ceffbc44-79e1-4e16-938c-6ce2d4576b20', 'a300003a-5c47-4df7-a591-0bdf9142a8b5', 0, 0),
	('71383a12-b01d-4803-9302-a07d1dc9e99a', '2024-11-27 22:42:34.907707', '2024-11-30 10:37:26.273144', 'Victor Hugo', 'Victor Hugo kể câu chuyện cảm động về nhân đạo và công lý.', 300000, b'1', b'0', 2054, 390000, 2017, '21 x 14 x 10.5\r\n', 'nhung-nguoi-khon-kho', 6, 'ACTIVE', 100, 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677122/bookstore/ohhz83zw7aayxrixqenh.jpg', 'Những Người Khốn Khổ', 2220, '4b37a61a-84c9-43ce-906f-46686543e9cc', 'ceffbc44-79e1-4e16-938c-6ce2d4576b20', 'a300003a-5c47-4df7-a591-0bdf9142a8b5', 0, 0),
	('7802e89f-5f17-472a-ab9b-8f26962054dd', '2024-11-26 16:07:51.259041', '2024-11-26 16:07:51.259041', 'Jeffrey Archer', 'Jeffrey Archer là nhà văn người Anh và cũng là một chính trị gia. Ông từng là một thành viên của Quốc hội và Phó Chủ tịch Đảng Bảo thủ.', 150000, b'1', b'1', 768, 180000, 2024, '20.5 x 13.5 x 3', 'hai-so-phan-bia-cung-tai-ban-2024', 0, 'ACTIVE', 100, 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677395/bookstore/vymzm6gi35psv7zb5dsf.jpg', 'Hai Số Phận - Bìa Cứng (Tái Bản 2024)', 685, '4b37a61a-84c9-43ce-906f-46686543e9cc', 'b55608cb-284f-4c6c-b4ad-20db451fb536', 'a300003a-5c47-4df7-a591-0bdf9142a8b5', 0, 0),
	('7a3fae04-a30a-4557-9600-b58238fe4f34', '2024-11-26 15:33:02.362021', '2024-11-26 15:33:02.362021', 'Jeffrey Archer', 'Jeffrey Archer là nhà văn người Anh và cũng là một chính trị gia. Ông từng là một thành viên của Quốc hội và Phó Chủ tịch Đảng Bảo thủ.', 150000, b'1', b'1', 768, 178000, 2023, '20.5 x 13.5 x 3', 'hai-so-phan-bia-cung-tai-ban-2023', 0, 'ACTIVE', 100, 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677395/bookstore/vymzm6gi35psv7zb5dsf.jpg', 'Hai Số Phận - Bìa Cứng (Tái Bản 2023)', 685, '4b37a61a-84c9-43ce-906f-46686543e9cc', 'b55608cb-284f-4c6c-b4ad-20db451fb536', 'a300003a-5c47-4df7-a591-0bdf9142a8b5', 0, 0),
	('8ce1d18b-a767-4cb2-83a5-ac97661d50a2', '2024-11-26 16:08:05.825175', '2024-11-26 16:08:05.825731', 'Jeffrey Archer', 'Jeffrey Archer là nhà văn người Anh và cũng là một chính trị gia. Ông từng là một thành viên của Quốc hội và Phó Chủ tịch Đảng Bảo thủ.', 150000, b'1', b'1', 768, 177000, 2022, '20.5 x 13.5 x 3', 'hai-so-phan-bia-cung-tai-ban-2022', 0, 'ACTIVE', 100, 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677395/bookstore/vymzm6gi35psv7zb5dsf.jpg', 'Hai Số Phận - Bìa Cứng (Tái Bản 2022)', 685, '4b37a61a-84c9-43ce-906f-46686543e9cc', 'b55608cb-284f-4c6c-b4ad-20db451fb536', 'a300003a-5c47-4df7-a591-0bdf9142a8b5', 0, 0),
	('bf1346f5-1253-4327-88f6-ff0bcff4a259', '2024-11-27 22:42:21.241832', '2024-12-11 22:15:50.491402', 'Fukuzawa Yukichi', 'Fukuzawa Yukichi khuyến khích tư duy độc lập và học hỏi không ngừng.', 105000, b'1', b'0', 248, 130000, 2019, '19 x 13 x 2', 'khuyen-hoc', 19, 'ACTIVE', 96, 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677449/bookstore/aiz034cpvd1bbkpn3utg.jpg', 'Khuyến Học', 400, '671dbce1-9a7b-484a-a016-2332d50d55bb', 'ceffbc44-79e1-4e16-938c-6ce2d4576b20', '1066c347-337f-47f8-8fa8-41d425cdefcc', 0, 0),
	('d534202f-1ac0-4d99-8992-0a55bfed5411', '2024-11-26 16:08:54.017397', '2025-03-11 15:05:38.484577', 'Jeffrey Archer', 'Jeffrey Archer là nhà văn người Anh và cũng là một chính trị gia. Ông từng là một thành viên của Quốc hội và Phó Chủ tịch Đảng Bảo thủ.', 150000, b'1', b'1', 768, 176000, 2019, '20.5 x 13.5 x 3', 'hai-so-phan-bia-cung-tai-ban-2019', 0, 'DISABLED', 100, 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677395/bookstore/vymzm6gi35psv7zb5dsf.jpg', 'Hai Số Phận - Bìa Cứng (Tái Bản 2019)', 685, '4b37a61a-84c9-43ce-906f-46686543e9cc', 'ceffbc44-79e1-4e16-938c-6ce2d4576b20', 'a300003a-5c47-4df7-a591-0bdf9142a8b5', 0, 0),
	('ff0b4555-743e-49df-9f9f-1abdd998419b', '2024-11-26 16:08:10.977203', '2024-12-11 22:15:50.468296', 'Jeffrey Archer', 'Jeffrey Archer là nhà văn người Anh và cũng là một chính trị gia. Ông từng là một thành viên của Quốc hội và Phó Chủ tịch Đảng Bảo thủ.', 150000, b'1', b'1', 768, 175000, 2021, '20.5 x 13.5 x 3', 'hai-so-phan-bia-cung-tai-ban-2021', 10, 'ACTIVE', 198, 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677395/bookstore/vymzm6gi35psv7zb5dsf.jpg', 'Hai Số Phận - Bìa Cứng (Tái Bản 2021)', 685, '4b37a61a-84c9-43ce-906f-46686543e9cc', 'ceffbc44-79e1-4e16-938c-6ce2d4576b20', 'a300003a-5c47-4df7-a591-0bdf9142a8b5', 0, 0);

-- Dumping structure for table hafasa_product_db.book_images
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

-- Dumping data for table hafasa_product_db.book_images: ~16 rows (approximately)
DELETE FROM `book_images`;
INSERT INTO `book_images` (`id`, `created_at`, `updated_at`, `url`, `book_id`) VALUES
	('0f01ef11-7d01-412f-966a-d3d2826f399a', '2024-11-26 15:33:02.387839', '2024-11-26 15:33:02.387839', 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677395/bookstore/vymzm6gi35psv7zb5dsf.jpg', '7a3fae04-a30a-4557-9600-b58238fe4f34'),
	('110c1840-9473-4fda-8718-6aa2a4786a6c', '2024-11-27 22:42:11.734024', '2024-11-27 22:42:11.734024', 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677646/bookstore/bsxe6ev8ibkoemfwf8hw.jpg', '186beedc-bd41-4d30-aefe-90b42bfe9fe7'),
	('324909ca-fa5a-459f-ac0d-208eeaffcde3', '2024-11-27 22:41:21.539801', '2024-11-27 22:41:21.539801', 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677501/bookstore/fkn29euzlhreumsco5d7.jpg', '6be191e1-7151-4824-ac3f-cf347d297287'),
	('38a6f6c8-1c0e-4301-a25b-db5e00a75746', '2024-11-26 16:08:05.832709', '2024-11-26 16:08:05.832709', 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677395/bookstore/vymzm6gi35psv7zb5dsf.jpg', '8ce1d18b-a767-4cb2-83a5-ac97661d50a2'),
	('3dc875aa-a7ef-4319-ae08-ead258594c40', '2024-11-27 22:42:21.248203', '2024-11-27 22:42:21.248712', 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677449/bookstore/aiz034cpvd1bbkpn3utg.jpg', 'bf1346f5-1253-4327-88f6-ff0bcff4a259'),
	('5b6d773a-ce94-436c-8baf-af2f12db4b00', '2024-11-26 16:08:10.986231', '2024-11-26 16:08:10.986231', 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677395/bookstore/vymzm6gi35psv7zb5dsf.jpg', 'ff0b4555-743e-49df-9f9f-1abdd998419b'),
	('6bd41055-e948-49ef-ac63-c609e853e403', '2025-03-11 15:20:26.939264', '2025-03-11 15:20:26.939264', 'https://res.cloudinary.com/dimer1lki/image/upload/v1741679432/image_230105_xnepax.jpg', '4213ab15-0c79-44e5-beef-abb31813b16c'),
	('7b6053ca-4128-4e71-bb5b-6b6a05ccf880', '2024-11-27 22:42:02.552355', '2024-11-27 22:42:02.552355', 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677705/bookstore/l823jy1k6vmshapw616r.jpg', '11eb2555-34a8-41b8-a0d8-041331c5a48f'),
	('9370056a-bb3d-41b1-8098-0f2b76e74cef', '2024-11-27 22:42:34.914165', '2024-11-27 22:42:34.914165', 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677122/bookstore/ohhz83zw7aayxrixqenh.jpg', '71383a12-b01d-4803-9302-a07d1dc9e99a'),
	('9eda7133-6a0a-4995-a5ac-466e7f56f414', '2024-11-27 22:42:29.396999', '2024-11-27 22:42:29.396999', 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677728/bookstore/mjyv2gthzezjssspn4pu.jpg', '0a3366a6-fe74-4452-83c8-3750cd1d0cd4'),
	('bbfa3e6f-b356-462c-8671-9805cdaacf61', '2025-03-11 15:05:38.459551', '2025-03-11 15:05:38.459551', 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677395/bookstore/vymzm6gi35psv7zb5dsf.jpg', 'd534202f-1ac0-4d99-8992-0a55bfed5411'),
	('bf28f003-9016-44cc-bd36-678cb02de219', '2024-11-26 16:07:51.271819', '2024-11-26 16:07:51.271819', 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677395/bookstore/vymzm6gi35psv7zb5dsf.jpg', '7802e89f-5f17-472a-ab9b-8f26962054dd'),
	('d5c6eed7-28b4-43d0-ad8c-f184cad500a1', '2024-11-27 22:41:54.406896', '2024-11-27 22:41:54.406896', 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677584/bookstore/jf13ob9k65udqxj0okmo.jpg', '39d6be7c-b2ff-4680-88a1-517a22af6cf0'),
	('e432283e-7421-4898-bcbb-169a5bfa6324', '2024-11-27 22:41:47.297634', '2024-11-27 22:41:47.297721', 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677619/bookstore/wkwisfy6as588sk9yo8i.jpg', '2a48914e-e2f0-47ee-9f7d-4a0c8d75b270'),
	('edc397e2-3761-4234-b14f-d8c943529b0c', '2024-11-27 22:41:36.259130', '2024-11-27 22:41:36.259130', 'https://res.cloudinary.com/dimer1lki/image/upload/v1741677532/bookstore/lk420rlnqpuqrjnpmk5m.jpg', '54f2c395-6d30-4795-93d3-d3e3bb3b241d'),
	('fbe96b5c-66da-47af-afec-766cebbf4273', '2025-03-11 15:20:26.853953', '2025-03-11 15:20:26.853953', 'https://res.cloudinary.com/dimer1lki/image/upload/v1741681218/2021_07_03_09_55_24_1-390x510_tkrpvo.jpg', '4213ab15-0c79-44e5-beef-abb31813b16c');

-- Dumping structure for table hafasa_product_db.categories
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

-- Dumping data for table hafasa_product_db.categories: ~8 rows (approximately)
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

-- Dumping structure for table hafasa_product_db.discounts
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

-- Dumping data for table hafasa_product_db.discounts: ~3 rows (approximately)
DELETE FROM `discounts`;
INSERT INTO `discounts` (`id`, `created_at`, `updated_at`, `code`, `end_date`, `name`, `percent`, `start_date`) VALUES
	('257d2d0e-7839-487c-851d-93a9d51ae3c3', '2024-12-08 20:03:02.736584', '2024-12-08 21:46:36.643766', '12THANG12', '2024-12-12', '12 tháng 12', 12, '2024-12-08'),
	('b55608cb-284f-4c6c-b4ad-20db451fb536', '2024-12-01 09:20:52.000000', '2024-12-01 09:20:56.000000', 'HELLO', '2024-12-07', 'Xin chào thành viên mới', 5, '2024-12-01'),
	('ceffbc44-79e1-4e16-938c-6ce2d4576b20', '2024-11-30 21:08:21.000000', '2024-11-30 21:08:21.000000', 'BLACKFRIDAY', '2024-12-30', 'Black Friday', 15, '2024-11-20');

-- Dumping structure for table hafasa_product_db.publishers
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

-- Dumping data for table hafasa_product_db.publishers: ~7 rows (approximately)
DELETE FROM `publishers`;
INSERT INTO `publishers` (`id`, `created_at`, `updated_at`, `address`, `description`, `image`, `name`, `slug`, `status`) VALUES
	('1066c347-337f-47f8-8fa8-41d425cdefcc', '2024-11-27 22:35:17.151596', '2024-11-27 22:35:17.151739', 'Tầng 4, Tòa nhà Bộ Công Thương, số 655 Phạm Văn Đồng, quận Bắc Từ Liêm, Hà Nội', NULL, NULL, 'NXB Công Thương', 'nxb-cong-thuong', b'1'),
	('1ead17a2-b1b3-4ebc-a934-4d6c7768e78e', '2024-11-27 22:36:25.244177', '2024-11-27 22:36:25.244177', 'Số 65 Nguyễn Du, Hà Nội', NULL, NULL, 'NXB Hội Nhà Văn', 'nxb-hoi-nha-van', b'1'),
	('664d2d60-35f6-40fd-a5a5-a22b53062e40', '2024-11-27 22:32:24.367719', '2024-11-27 22:32:24.367719', '46 Trần Hưng Đạo, Hàng Bài, Hoàn Kiếm, Hà Nội', NULL, NULL, 'NXB Thế Giới', 'nxb-the-gioi', b'1'),
	('714c3e12-62b9-43f1-b63f-023420e4228a', '2024-11-27 22:33:54.583855', '2024-11-27 22:33:54.583855', '75 Giảng Võ, Đống Đa, Hà Nội', NULL, NULL, 'NXB Lao Động', 'nxb-lao-dong', b'1'),
	('972b43a7-e3b2-4a8a-ad47-8c90ed53ba16', '2024-11-27 22:30:39.116859', '2024-12-12 21:20:51.169644', 'Tầng 1 - Tòa nhà VUSTA - 53 Nguyễn Du - Quận Hai Bà Trưng - Hà Nội - Việt Nam', 'Nhà xuất bản Tri thức là nhà xuất bản Việt Nam thành lập vào tháng 9 năm 2005 trực thuộc Liên hiệp các Hội Khoa học và Kỹ thuật Việt Nam (VUSTA).', NULL, 'NXB Tri thức', 'nxb-tri-thuc', b'1'),
	('a300003a-5c47-4df7-a591-0bdf9142a8b5', '2024-12-12 22:32:29.062879', '2024-12-12 22:32:29.063879', '18 Nguyễn Trường Tộ, phường Trúc Bạch, quận Ba Đình, thành phố Hà Nội ', 'Ra đời trong những ngày tháng khói lửa của cuộc kháng chiến chống Pháp, trưởng thành qua các thời kỳ đấu tranh giải phóng dân tộc và công cuộc xây dựng Tổ quốc XHCN, hơn 70 năm qua, NXB Văn học luôn đồng hành cùng những biến động của đất nước, hoà chung nhịp thở của đời sống nhân dân và phong trào văn nghệ cả nước.', NULL, 'NXB Văn học', 'nxb-van-hoc', b'1'),
	('ec90e568-c831-4652-8324-6a38937c9a83', '2024-11-27 22:33:22.454568', '2024-12-12 21:16:31.104198', '161B Lý Chính Thắng, Phường Võ Thị Sáu, Quận 3, Hồ Chí Minh', 'Năm năm sau ngày đất nước thống nhất, phong trào thanh thiếu nhi thành phố đã có những bước phát triển vượt bậc cả về số lượng và chất lượng, công việc giáo dục thanh thiếu nhi cần thêm nhiều tài liệu thiết thực, bổ ích, phù hợp với yêu cầu phát triển của địa phương trong tình hình mới, được sự quan tâm lãnh đạo và chỉ đạo của Thành ủy, một số cán bộ Đoàn tâm huyết với việc giáo dục thanh thiếu nhi qua các xuất bản phẩm của Thành đoàn được phân công chuẩn bị lực lượng để thành lập một NXB, trước mắt là in sách phục vụ cho phong trào thiếu nhi thành phố. Trên tinh thần đó, ngày 24-3-1981 UBND TP HCM đã ký quyết định thành lập Nhà xuất bản Măng Non trực thuộc Thành đoàn TP.HCM.', NULL, 'NXB Trẻ', 'nxb-tre', b'1');

-- Dumping structure for table hafasa_product_db.reviews
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

-- Dumping data for table hafasa_product_db.reviews: ~4 rows (approximately)
DELETE FROM `reviews`;
INSERT INTO `reviews` (`id`, `created_at`, `updated_at`, `comment`, `rating`, `status`, `book_id`, `user_id`) VALUES
	('1f9c1483-e9b9-40ed-a345-2abd377618d5', '2024-12-22 20:16:29.650883', '2024-12-22 20:16:29.650883', 'Qua xuat sac', 5, 'ACTIVE', '0a3366a6-fe74-4452-83c8-3750cd1d0cd4', '9b1c2041-348d-4cb4-98e5-bbf229c4a17f'),
	('70ae1b33-a090-4fe2-bd62-9bdafa334e84', '2024-12-22 20:16:16.704255', '2024-12-22 20:16:16.704255', 'Qua xuat sac', 5, 'ACTIVE', '0a3366a6-fe74-4452-83c8-3750cd1d0cd4', '9b1c2041-348d-4cb4-98e5-bbf229c4a17f'),
	('c5aceedd-29c3-4aaf-a552-c108c4aef4f0', '2024-12-22 20:15:55.210122', '2024-12-22 20:15:55.210122', 'Qua xuat sac', 5, 'ACTIVE', '0a3366a6-fe74-4452-83c8-3750cd1d0cd4', '9b1c2041-348d-4cb4-98e5-bbf229c4a17f'),
	('ca5cebfa-184d-4b3d-b7dd-35447a7df9c3', '2024-12-22 20:16:08.676679', '2024-12-22 20:16:08.676679', 'Qua xuat sac', 4, 'ACTIVE', '0a3366a6-fe74-4452-83c8-3750cd1d0cd4', '9b1c2041-348d-4cb4-98e5-bbf229c4a17f');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

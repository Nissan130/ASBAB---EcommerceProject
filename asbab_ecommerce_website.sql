-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 27, 2025 at 07:13 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `asbab_ecommerce_website`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`id`, `user_id`, `product_id`, `quantity`, `added_at`) VALUES
(3, 3, 21, 1, '2024-11-30 08:47:22'),
(4, 3, 23, 1, '2024-11-30 08:49:06');

-- --------------------------------------------------------

--
-- Table structure for table `favorite_items`
--

CREATE TABLE `favorite_items` (
  `favorite_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favorite_items`
--

INSERT INTO `favorite_items` (`favorite_id`, `product_id`, `user_id`) VALUES
(4, 20, 1),
(6, 2, 5),
(7, 8, 5),
(8, 5, 3),
(9, 3, 5),
(10, 13, 5),
(15, 15, 5),
(16, 20, 3),
(18, 23, 5),
(19, 23, 8);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `product_id_qty` varchar(255) NOT NULL,
  `products_title` varchar(255) NOT NULL,
  `total_quantity` int(11) NOT NULL,
  `total_price_amount` int(11) NOT NULL,
  `shipping_address` text NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `payment_status` varchar(100) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `transaction_id`, `product_id_qty`, `products_title`, `total_quantity`, `total_price_amount`, `shipping_address`, `payment_method`, `payment_status`, `order_date`) VALUES
(1, 8, 'REF1733655015752', '[Product_ID:23, Qty:1]', '[Asus VY229HF 21.45 Inch FHD Display HDMI VGA Eye Care Gaming Monitor]', 1, 14120, '{\"name\":\"Md. Nissan Ali\",\"mobile_number\":\"01771337896\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', 'Cash on Delivery', 'Paid', '2024-12-08 10:50:15'),
(2, 8, 'REF1733655086805', '[Product_ID:22, Qty:1]', '[HP ProBook 450 G9 | 2022 Model | 15.6-inch FHD Display Laptop Silver ( i5-1235U, 8GB, 512GB, Intel )]', 1, 89910, '{\"name\":\"Nisho Ahmed\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', 'Cash on Delivery', 'Paid', '2024-12-08 10:51:26'),
(3, 8, 'REF1733709163570', '[Product_ID:21, Qty:1] [Product_ID:23, Qty:1]', '[Corsair HS50 Pro Stereo 3.5mm Gaming Headphone (Carbon)] [Asus VY229HF 21.45 Inch FHD Display HDMI VGA Eye Care Gaming Monitor]', 2, 18370, '{\"name\":\"Nisho Ahmed\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', 'Cash on Delivery', 'Paid', '2024-12-09 01:52:43'),
(4, 8, 'REF1733709218040', '[Product_ID:24, Qty:1]', '[BDCOM P1501DS 1GE EPON ONU]', 1, 1210, '{\"name\":\"Md. Nissan Ali\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', 'Online Payment', 'Paid', '2024-12-09 01:53:50'),
(7, 8, 'REF1733709402064', '[Product_ID:23, Qty:1]', '[Asus VY229HF 21.45 Inch FHD Display HDMI VGA Eye Care Gaming Monitor]', 1, 14120, '{\"name\":\"Md. Nissan Ali\",\"mobile_number\":\"01771337896\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', 'Online Payment', 'Paid', '2024-12-09 01:56:58'),
(8, 8, 'REF1733709785332', '[Product_ID:28, Qty:1]', '[Epson EcoTank L3210 (A4) Multifunction InkTank Printer #C11CJ68501/C11CJ68506]', 1, 18010, '{\"name\":\"Md. Nissan Ali\",\"mobile_number\":\"01771337896\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', 'Online Payment', 'Paid', '2024-12-09 02:03:16'),
(9, 8, 'REF1733709845639', '[Product_ID:28, Qty:1]', '[Acer Nitro 5 AN515 | 2023 Model | 15.6 inch 165Hz 100% sRGB Display Gaming Laptop ( R5-7535HS, 8GB, 512GB, RTX 3050 4GB, W11 )] [HP ProBook 450 G9 | 2022 Model | 15.6-inch FHD Display Laptop Silver ( i5-1235U, 8GB, 512GB, Intel )]', 2, 204810, '{\"name\":\"Md. Nissan Ali\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', 'Online Payment', 'Paid', '2024-12-09 02:04:16'),
(10, 8, 'REF1733709882640', '[Product_ID:22, Qty:1]', '[HP ProBook 450 G9 | 2022 Model | 15.6-inch FHD Display Laptop Silver ( i5-1235U, 8GB, 512GB, Intel )]', 1, 89910, '{\"name\":\"Md. Nissan Ali\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', 'Cash on Delivery', 'Paid', '2024-12-09 02:04:42'),
(11, 8, 'REF1734258167895', '[Product_ID:23, Qty:1]', '[Asus VY229HF 21.45 Inch FHD Display HDMI VGA Eye Care Gaming Monitor]', 1, 14120, '{\"name\":\"Nisho Ahmed\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', 'Cash on Delivery', 'Paid', '2024-12-15 10:22:47'),
(12, 8, 'REF1734258305212', '[Product_ID:29, Qty:1]', '[Keychron K2 Version 2 (84%) || Hot Swappable || Per Key RGB Backlight Mechanical Keyboard]', 1, 10510, '{\"name\":\"Md. Nissan Ali\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', 'Online Payment', 'Paid', '2024-12-15 10:25:19'),
(13, 5, 'REF1735109252606', '[Product_ID:19, Qty:1]', '[Naviforce 9208 L – Silver Green]', 1, 2360, '{\"name\":\"Md. Nissan Ali\",\"mobile_number\":\"01771337896\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', 'Online Payment', 'Paid', '2024-12-25 06:47:40'),
(14, 5, 'REF1735399164755', '[Product_ID:22, Qty:1]', '[HP ProBook 450 G9 | 2022 Model | 15.6-inch FHD Display Laptop Silver ( i5-1235U, 8GB, 512GB, Intel )]', 1, 89910, '{\"name\":\"Md. Nissan Ali\",\"mobile_number\":\"01771337896\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', 'Online Payment', 'Paid', '2024-12-28 15:20:04'),
(15, 5, 'REF1735399258575', '[Product_ID:19, Qty:1]', '[Naviforce 9208 L – Silver Green]', 1, 2360, '{\"name\":\"Md. Nissan Ali\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', 'Cash on Delivery', 'Paid', '2024-12-28 15:20:58');

-- --------------------------------------------------------

--
-- Table structure for table `pending_orders`
--

CREATE TABLE `pending_orders` (
  `order_id` int(11) NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `products_id_qty` varchar(255) NOT NULL,
  `products_title` varchar(255) NOT NULL,
  `total_amount` int(11) NOT NULL,
  `total_quantity` int(11) NOT NULL,
  `shipping_address` varchar(255) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pending_orders`
--

INSERT INTO `pending_orders` (`order_id`, `transaction_id`, `user_id`, `products_id_qty`, `products_title`, `total_amount`, `total_quantity`, `shipping_address`, `order_date`) VALUES
(1, 'REF1732294234888', 5, '[Product_ID:5, Qty:1] [Product_ID:4, Qty:1] [Product_ID:2, Qty:1] [Product_ID:13, Qty:1]', '[A4TECH OP-620D 2X USB Optical Mouse] [Saregama Carvaan - Hindi - (5000 Song, Radio, Bluetooth, Aux) Oak Wood Brown Portable Music Player With Remote Control & Adapter (No Warranty)] [Huion H420 Professional Drawing Graphic Tablet & Signature Pad] [men sp', 19900, 4, '{\"name\":\"Md. Nissan Ali\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', '2024-11-22 16:50:35'),
(2, 'REF1732295719962', 5, '[Product_ID:10, Qty:1]', '[Rapoo NK2600 Spill- Resistant Wired Black Keyboard with Bangla]', 760, 1, '{\"name\":\"Md. Nissan Ali\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', '2024-11-22 17:15:20'),
(3, 'REF1732295808657', 1, '[Product_ID:5, Qty:1] [Product_ID:18, Qty:1] [Product_ID:1, Qty:1]', '[A4TECH OP-620D 2X USB Optical Mouse] [Dell Alienware X16 R1 | 2023 Model | 16.0″ QHD+ 240Hz Display Gaming Laptop ( I9-13900Hk, 32GB, 1TB SSD, RTX 4080 12GB, W11 )] [HP 15s-eq2330AU AMD Ryzen 3 5300U 8GB RAM, 512GB SSD 15.6 Inch FHD Display Natural Silve', 464590, 3, '{\"name\":\"Md. Nissan Ali\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', '2024-11-22 17:16:49'),
(4, 'REF1732296028397', 1, '[Product_ID:5, Qty:1]', '[A4TECH OP-620D 2X USB Optical Mouse]', 490, 1, '{\"name\":\"Md. Nissan Ali\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', '2024-11-22 17:20:28'),
(5, 'REF1732302521799', 1, '[Product_ID:3, Qty:1]', '[Canon EOS 4000D Digital SLR Camera Body with EF-S 18-55mm 1:3.5-5.6 III Lens]', 43010, 1, '{\"name\":\"Md. Nissan Ali\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', '2024-11-22 19:08:42'),
(6, 'REF1732305514767', 1, '[Product_ID:5, Qty:1]', '[A4TECH OP-620D 2X USB Optical Mouse]', 490, 1, '{\"name\":\"Md. Nissan Ali\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', '2024-11-22 19:58:35'),
(7, 'REF1732305869964', 1, '[Product_ID:5, Qty:1]', '[A4TECH OP-620D 2X USB Optical Mouse]', 490, 1, '{\"name\":\"Md. Nissan Ali\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', '2024-11-22 20:04:31'),
(8, 'REF1732306094216', 1, '[Product_ID:5, Qty:1]', '[A4TECH OP-620D 2X USB Optical Mouse]', 490, 1, '{\"name\":\"Md. Nissan Ali\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', '2024-11-22 20:08:14'),
(9, 'REF1732355549128', 5, '[Product_ID:4, Qty:1]', '[Saregama Carvaan - Hindi - (5000 Song, Radio, Bluetooth, Aux) Oak Wood Brown Portable Music Player With Remote Control & Adapter (No Warranty)]', 16560, 1, '{\"name\":\"Md. Nissan Ali\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', '2024-11-23 09:52:29'),
(10, 'REF1732356513613', 3, '[Product_ID:10, Qty:1] [Product_ID:7, Qty:1]', '[Rapoo NK2600 Spill- Resistant Wired Black Keyboard with Bangla] [Micropack M-105 Silent Pink Wired Optical Mouse]', 1110, 2, '{\"name\":\"Md. Nissan Ali\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', '2024-11-23 10:08:33'),
(11, 'REF1732356536334', 3, '[Product_ID:10, Qty:1] [Product_ID:7, Qty:1]', '[Rapoo NK2600 Spill- Resistant Wired Black Keyboard with Bangla] [Micropack M-105 Silent Pink Wired Optical Mouse]', 1110, 2, '{\"name\":\"Md. Nissan Ali\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', '2024-11-23 10:08:56'),
(12, 'REF1732366468801', 5, '[Product_ID:20, Qty:1]', '[Colmi P28 Plus Silver Bluetooth Calling Smart Watch #6M]', 2360, 1, '{\"name\":\"Md. Nissan Ali\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', '2024-11-23 12:54:29'),
(13, 'REF1732446863403', 5, '[Product_ID:20, Qty:2]', '[Colmi P28 Plus Silver Bluetooth Calling Smart Watch #6M]', 4710, 2, '{\"name\":\"Md. Nissan Ali\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', '2024-11-24 11:14:23'),
(14, 'REF1732451880002', 5, '[Product_ID:20, Qty:1] [Product_ID:19, Qty:1]', '[Colmi P28 Plus Silver Bluetooth Calling Smart Watch #6M] [Naviforce 9208 L – Silver Green]', 4710, 2, '{\"name\":\"Nisho Ahmed\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', '2024-11-24 12:38:00'),
(15, 'REF1732476464115', 1, '[Product_ID:20, Qty:1]', '[Colmi P28 Plus Silver Bluetooth Calling Smart Watch #6M]', 2360, 1, '{\"name\":\"Nisho Ahmed\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', '2024-11-24 19:27:44'),
(16, 'REF1732476540421', 1, '[Product_ID:20, Qty:1]', '[Colmi P28 Plus Silver Bluetooth Calling Smart Watch #6M]', 2360, 1, '{\"name\":\"Nisho Ahmed\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', '2024-11-24 19:29:00'),
(17, 'REF1732476997300', 1, '[Product_ID:19, Qty:1]', '[Naviforce 9208 L – Silver Green]', 2360, 1, '{\"name\":\"Nisho Ahmed\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', '2024-11-24 19:36:37'),
(18, 'REF1732518400123', 5, '[Product_ID:8, Qty:1] [Product_ID:20, Qty:1] [Product_ID:15, Qty:1]', '[Chuwi HeroBook Pro Intel CDC N4020 8GB RAM 256GB SSD 14.1 Inch FHD IPS Display Grey Laptop] [Colmi P28 Plus Silver Bluetooth Calling Smart Watch #6M] [KSC \"KHATUSHYAM COLLECTION\" Red Pu For Women Handheld Bag]', 32280, 3, '{\"name\":\"Nisho Ahmed\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', '2024-11-25 07:06:40'),
(19, 'REF1732518474139', 5, '[Product_ID:8, Qty:1] [Product_ID:20, Qty:1] [Product_ID:15, Qty:1]', '[Chuwi HeroBook Pro Intel CDC N4020 8GB RAM 256GB SSD 14.1 Inch FHD IPS Display Grey Laptop] [Colmi P28 Plus Silver Bluetooth Calling Smart Watch #6M] [KSC \"KHATUSHYAM COLLECTION\" Red Pu For Women Handheld Bag]', 32280, 3, '{\"name\":\"Nisho Ahmed\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', '2024-11-25 07:07:54'),
(20, 'REF1732560997895', 3, '[Product_ID:20, Qty:1]', '[Colmi P28 Plus Silver Bluetooth Calling Smart Watch #6M]', 2360, 1, '{\"name\":\"Nisho Ahmed\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', '2024-11-25 18:56:38'),
(21, 'REF1732598680546', 3, '[Product_ID:5, Qty:1]', '[A4TECH OP-620D 2X USB Optical Mouse]', 490, 1, '{\"name\":\"Nisho Ahmed\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', '2024-11-26 05:24:41'),
(22, 'REF1732621732417', 3, '[Product_ID:5, Qty:2]', '[A4TECH OP-620D 2X USB Optical Mouse]', 970, 2, '{\"name\":\"Nisho Ahmed\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', '2024-11-26 11:48:53'),
(23, 'REF1732887277031', 3, '[Product_ID:19, Qty:1]', '[Naviforce 9208 L – Silver Green]', 2360, 1, '{\"name\":\"Nisho Ahmed\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', '2024-11-29 13:34:37'),
(24, 'REF1732956585235', 5, '[Product_ID:23, Qty:1]', '[Asus VY229HF 21.45 Inch FHD Display HDMI VGA Eye Care Gaming Monitor]', 14120, 1, '{\"name\":\"Nisho Ahmed\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', '2024-11-30 08:49:45'),
(25, 'REF1732956736558', 5, '[Product_ID:23, Qty:1]', '[Asus VY229HF 21.45 Inch FHD Display HDMI VGA Eye Care Gaming Monitor]', 14120, 1, '{\"name\":\"Nisho Ahmed\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', '2024-11-30 08:52:16'),
(26, 'REF1733223066589', 5, '[Product_ID:3, Qty:6]', '[Canon EOS 4000D Digital SLR Camera Body with EF-S 18-55mm 1:3.5-5.6 III Lens]', 240010, 6, '{\"name\":\"Nisho Ahmed\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', '2024-12-03 10:51:07'),
(27, 'REF1733499870919', 5, '[Product_ID:22, Qty:3] [Product_ID:23, Qty:2]', '[HP ProBook 450 G9 | 2022 Model | 15.6-inch FHD Display Laptop Silver ( i5-1235U, 8GB, 512GB, Intel )] [Asus VY229HF 21.45 Inch FHD Display HDMI VGA Eye Care Gaming Monitor]', 297930, 5, '{\"name\":\"Nisho Ahmed\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', '2024-12-06 15:44:32'),
(28, 'REF1733500423164', 8, '[Product_ID:23, Qty:2] [Product_ID:22, Qty:1]', '[Asus VY229HF 21.45 Inch FHD Display HDMI VGA Eye Care Gaming Monitor] [HP ProBook 450 G9 | 2022 Model | 15.6-inch FHD Display Laptop Silver ( i5-1235U, 8GB, 512GB, Intel )]', 118130, 3, '{\"name\":\"Nisho Ahmed\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', '2024-12-06 15:53:43'),
(29, 'REF1733500454047', 8, '[Product_ID:23, Qty:2] [Product_ID:22, Qty:1]', '[Asus VY229HF 21.45 Inch FHD Display HDMI VGA Eye Care Gaming Monitor] [HP ProBook 450 G9 | 2022 Model | 15.6-inch FHD Display Laptop Silver ( i5-1235U, 8GB, 512GB, Intel )]', 118130, 3, '{\"name\":\"Nisho Ahmed\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', '2024-12-06 15:54:14'),
(30, 'REF1733639578273', 8, '[Product_ID:23, Qty:1]', '[Asus VY229HF 21.45 Inch FHD Display HDMI VGA Eye Care Gaming Monitor]', 14120, 1, '{\"name\":\"Nisho Ahmed\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', '2024-12-08 06:32:58'),
(31, 'REF1733641575403', 8, '[Product_ID:23, Qty:1]', '[Asus VY229HF 21.45 Inch FHD Display HDMI VGA Eye Care Gaming Monitor]', 14120, 1, '{\"name\":\"Nisho Ahmed\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', '2024-12-08 07:06:15'),
(32, 'REF1733644153862', 8, '[Product_ID:22, Qty:1] [Product_ID:28, Qty:1] [Product_ID:20, Qty:1] [Product_ID:4, Qty:1] [Product_ID:5, Qty:1] [Product_ID:25, Qty:1] [Product_ID:21, Qty:1]', '[HP ProBook 450 G9 | 2022 Model | 15.6-inch FHD Display Laptop Silver ( i5-1235U, 8GB, 512GB, Intel )] [Epson EcoTank L3210 (A4) Multifunction InkTank Printer #C11CJ68501/C11CJ68506] [Colmi P28 Plus Silver Bluetooth Calling Smart Watch #6M] [Saregama Carv', 132010, 7, '{\"name\":\"Nisho Ahmed\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', '2024-12-08 07:49:14'),
(33, 'REF1733646173428', 8, '[Product_ID:22, Qty:1] [Product_ID:28, Qty:1] [Product_ID:20, Qty:1] [Product_ID:4, Qty:1] [Product_ID:5, Qty:1]', '[HP ProBook 450 G9 | 2022 Model | 15.6-inch FHD Display Laptop Silver ( i5-1235U, 8GB, 512GB, Intel )] [Epson EcoTank L3210 (A4) Multifunction InkTank Printer #C11CJ68501/C11CJ68506] [Colmi P28 Plus Silver Bluetooth Calling Smart Watch #6M] [Saregama Carv', 127140, 5, '{\"name\":\"Md. Nissan Ali\",\"mobile_number\":\"01771337896\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', '2024-12-08 08:22:53'),
(34, 'REF1733651481238', 8, '[Product_ID:21, Qty:1] [Product_ID:5, Qty:1]', '[Corsair HS50 Pro Stereo 3.5mm Gaming Headphone (Carbon)] [A4TECH OP-620D 2X USB Optical Mouse]', 4740, 2, '{\"name\":\"Nisho Ahmed\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', '2024-12-08 09:51:21'),
(35, 'REF1733651502849', 8, '[Product_ID:21, Qty:1] [Product_ID:5, Qty:1]', '[Corsair HS50 Pro Stereo 3.5mm Gaming Headphone (Carbon)] [A4TECH OP-620D 2X USB Optical Mouse]', 4740, 2, '{\"name\":\"Nisho Ahmed\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', '2024-12-08 09:51:43'),
(36, 'REF1733653145478', 8, '[Product_ID:20, Qty:1]', '[Colmi P28 Plus Silver Bluetooth Calling Smart Watch #6M]', 2210, 1, '{\"name\":\"Md. Nissan Ali\",\"mobile_number\":\"01771337896\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', '2024-12-08 10:19:06'),
(37, 'REF1733653304240', 8, '[Product_ID:20, Qty:1] [Product_ID:21, Qty:1]', '[Colmi P28 Plus Silver Bluetooth Calling Smart Watch #6M] [Corsair HS50 Pro Stereo 3.5mm Gaming Headphone (Carbon)]', 6460, 2, '{\"name\":\"Md. Nissan Ali\",\"mobile_number\":\"01771337896\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', '2024-12-08 10:21:44'),
(38, 'REF1733709218040', 8, '[Product_ID:24, Qty:1]', '[BDCOM P1501DS 1GE EPON ONU]', 1210, 1, '{\"name\":\"Md. Nissan Ali\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', '2024-12-09 01:53:38'),
(39, 'REF1733709402064', 8, '[Product_ID:23, Qty:1]', '[Asus VY229HF 21.45 Inch FHD Display HDMI VGA Eye Care Gaming Monitor]', 14120, 1, '{\"name\":\"Md. Nissan Ali\",\"mobile_number\":\"01771337896\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', '2024-12-09 01:56:42'),
(40, 'REF1733709683793', 8, '[Product_ID:28, Qty:1]', '[Epson EcoTank L3210 (A4) Multifunction InkTank Printer #C11CJ68501/C11CJ68506]', 18010, 1, '{\"name\":\"Md. Nissan Ali\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', '2024-12-09 02:01:23'),
(41, 'REF1733709785332', 8, '[Product_ID:28, Qty:1]', '[Epson EcoTank L3210 (A4) Multifunction InkTank Printer #C11CJ68501/C11CJ68506]', 18010, 1, '{\"name\":\"Md. Nissan Ali\",\"mobile_number\":\"01771337896\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', '2024-12-09 02:03:05'),
(42, 'REF1733709845639', 8, '[Product_ID:30, Qty:1] [Product_ID:22, Qty:1]', '[Acer Nitro 5 AN515 | 2023 Model | 15.6 inch 165Hz 100% sRGB Display Gaming Laptop ( R5-7535HS, 8GB, 512GB, RTX 3050 4GB, W11 )] [HP ProBook 450 G9 | 2022 Model | 15.6-inch FHD Display Laptop Silver ( i5-1235U, 8GB, 512GB, Intel )]', 204810, 2, '{\"name\":\"Md. Nissan Ali\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', '2024-12-09 02:04:05'),
(43, 'REF1734258265039', 8, '[Product_ID:29, Qty:1]', '[Keychron K2 Version 2 (84%) || Hot Swappable || Per Key RGB Backlight Mechanical Keyboard]', 10510, 1, '{\"name\":\"Md. Nissan Ali\",\"mobile_number\":\"01771337896\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', '2024-12-15 10:24:25'),
(44, 'REF1734258305212', 8, '[Product_ID:29, Qty:1]', '[Keychron K2 Version 2 (84%) || Hot Swappable || Per Key RGB Backlight Mechanical Keyboard]', 10510, 1, '{\"name\":\"Md. Nissan Ali\",\"mobile_number\":\"01771337896\",\"address\":\"Monnafer Mor-1234\",\"city\":\"Rajshahi\",\"postalCode\":\"6311\",\"country\":\"Bangladesh\"}', '2024-12-15 10:25:05'),
(45, 'REF1735109040670', 5, '[Product_ID:19, Qty:1]', '[Naviforce 9208 L – Silver Green]', 2360, 1, '{\"name\":\"Md. Nissan Ali\",\"mobile_number\":\"01771337896\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', '2024-12-25 06:44:02'),
(46, 'REF1735109252606', 5, '[Product_ID:19, Qty:1]', '[Naviforce 9208 L – Silver Green]', 2360, 1, '{\"name\":\"Md. Nissan Ali\",\"mobile_number\":\"01771337896\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', '2024-12-25 06:47:32'),
(47, 'REF1735399112872', 5, '[Product_ID:22, Qty:1]', '[HP ProBook 450 G9 | 2022 Model | 15.6-inch FHD Display Laptop Silver ( i5-1235U, 8GB, 512GB, Intel )]', 89910, 1, '{\"name\":\"Md. Nissan Ali\",\"mobile_number\":\"01771337896\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', '2024-12-28 15:18:32'),
(48, 'REF1735399164755', 5, '[Product_ID:22, Qty:1]', '[HP ProBook 450 G9 | 2022 Model | 15.6-inch FHD Display Laptop Silver ( i5-1235U, 8GB, 512GB, Intel )]', 89910, 1, '{\"name\":\"Md. Nissan Ali\",\"mobile_number\":\"01771337896\",\"address\":\"Rajshahi\",\"city\":\"Rahshahi\",\"postalCode\":\"1234\",\"country\":\"Bangladesh\"}', '2024-12-28 15:19:25');

-- --------------------------------------------------------

--
-- Table structure for table `product_list`
--

CREATE TABLE `product_list` (
  `product_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `product_keyword` varchar(255) NOT NULL,
  `product_short_description` longtext NOT NULL,
  `product_full_description` longtext NOT NULL,
  `old_price` decimal(10,2) NOT NULL,
  `new_price` decimal(10,2) NOT NULL,
  `category` varchar(100) NOT NULL,
  `sub_category` varchar(100) NOT NULL,
  `product_brand` varchar(255) NOT NULL,
  `discount` decimal(5,2) DEFAULT NULL,
  `main_image` varchar(255) NOT NULL,
  `other_images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`other_images`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_list`
--

INSERT INTO `product_list` (`product_id`, `title`, `product_keyword`, `product_short_description`, `product_full_description`, `old_price`, `new_price`, `category`, `sub_category`, `product_brand`, `discount`, `main_image`, `other_images`, `created_at`, `updated_at`) VALUES
(3, 'Canon EOS 4000D Digital SLR Camera Body with EF-S 18-55mm 1:3.5-5.6 III Lens', 'canon camera, camera, electronics', '<p>The Canon EOS 4000D Digital SLR Camera, paired with the versatile EF-S 18-55mm f/3.5-5.6 III Lens, is an ideal entry-level DSLR for capturing stunning photos and Full HD videos. With an intuitive interface, built-in Wi-Fi for easy sharing, and a lightweight design, it’s perfect for beginners and enthusiasts.</p>', '<p>The <strong>Canon EOS 4000D Digital SLR Camera</strong> with <strong>EF-S 18-55mm f/3.5-5.6 III Lens</strong> offers a seamless entry into DSLR photography. Equipped with an 18MP APS-C CMOS sensor and DIGIC 4+ image processor, it delivers sharp, vibrant images even in low-light conditions. The camera supports <strong>Full HD video recording</strong>, allowing you to create cinematic-quality footage with ease.</p><p>The EF-S 18-55mm lens provides a flexible zoom range suitable for a variety of scenarios, from landscapes to portraits. Its lightweight design and <strong>Scene Intelligent Auto mode</strong> make it beginner-friendly, while built-in <strong>Wi-Fi connectivity</strong> ensures quick sharing of your memories via the Canon Camera Connect app.</p><p>With features like <strong>optical viewfinder shooting</strong>, a <strong>9-point autofocus system</strong>, and creative filters, the Canon EOS 4000D empowers photographers to capture moments with precision and artistic flair. Whether you’re stepping into photography or upgrading from a compact camera, this DSLR offers incredible value and performance.</p>', 46330.00, 40000.00, 'Electronics & Gadgets', 'Cameras', 'Canoon', 5.00, 'uploads\\images\\1732819062204-dslr_camera5.webp', '[\"uploads\\\\images\\\\1732819062205-dslr_camera2.webp\",\"uploads\\\\images\\\\1732819062209-dslr_camera4.webp\",\"uploads\\\\images\\\\1732819062211-dslr_camera1.webp\"]', '2024-10-11 06:26:43', '2024-11-28 18:37:42'),
(4, 'Saregama Carvaan - Hindi - (5000 Song, Radio, Bluetooth, Aux) Oak Wood Brown Portable Music Player With Remote Control & Adapter (No Warranty)', 'Music Player, Saregama Carvaan Music Player', '<p>Saregama Carvaan Hindi - Oak Wood Brown is a portable music player pre-loaded with 5000 evergreen Hindi songs. Featuring Bluetooth, AUX, and FM/AM radio, it offers a seamless music experience. Comes with a remote control and adapter for easy operation.</p>', '<p>The Saregama Carvaan Hindi - Oak Wood Brown is a premium portable music player designed for music lovers who cherish timeless classics. Pre-loaded with 5000 evergreen Hindi songs, it spans legends like Kishore Kumar, Lata Mangeshkar, and R.D. Burman, categorized by moods and themes for effortless navigation. With Bluetooth and AUX connectivity, you can play your personal collection from a smartphone or other devices.</p><p><br></p><p>This retro-styled player includes FM/AM radio to tune into live broadcasts and a remote control for convenient operation. Its oak wood brown finish adds elegance, blending vintage charm with modern functionality. The package includes an adapter for easy charging. <strong>Note:</strong> This model comes without warranty, making it a cost-effective choice for music enthusiasts seeking simplicity and nostalgia.</p>', 17990.00, 16550.00, 'Electronics & Gadgets', 'Music Player', 'Canoon', 6.00, 'uploads\\images\\1732819394068-musics_player1.webp', '[\"uploads\\\\images\\\\1732819394069-mu.webp\",\"uploads\\\\images\\\\1732819394069-musics_player3.webp\",\"uploads\\\\images\\\\1732819394069-musics_player4.webp\"]', '2024-10-11 06:32:35', '2024-11-28 18:43:14'),
(5, 'A4TECH OP-620D 2X USB Optical Mouse', 'mouse, A4tech mouse', 'The A4TECH OP-620D 2X USB Optical Mouse offers smooth and precise control with dual USB connectivity, making it ideal for both desktop and laptop users. Its ergonomic design ensures comfort for extended use, while the optical sensor provides accurate tracking on various surfaces.', 'The A4TECH OP-620D 2X USB Optical Mouse is designed for users seeking reliable and responsive performance. With dual USB connectivity, it easily supports both USB 2.0 and 3.0 ports, ensuring broad compatibility with a range of devices, from desktops to laptops. The optical sensor delivers precise tracking with smooth cursor movement, even on non-traditional surfaces, making it perfect for everyday tasks and light gaming.  The mouse’s ergonomic design ensures comfort during extended use, reducing strain on your hand and wrist. Its responsive buttons and scroll wheel provide effortless navigation, enhancing productivity and usability. Whether for work, study, or leisure, the A4TECH OP-620D is an affordable, functional solution for all your computing needs.', 520.00, 480.00, 'electronics', 'Mouse', '', 3.00, 'uploads\\images\\1728666164120-mouse1_1.webp', '[\"uploads\\\\images\\\\1728666164121-mouse1_2.webp\",\"uploads\\\\images\\\\1728666164121-mouse1_3.webp\",\"uploads\\\\images\\\\1728666164122-mouse1_4.webp\",\"uploads\\\\images\\\\1728666164124-mouse1_1.webp\"]', '2024-10-11 17:02:44', '2024-11-23 12:32:53'),
(19, 'Naviforce 9208 L – Silver Green', 'hand watch, watch, silver watch, men watch, Naviforce, Dual Time watch', 'NAVIFORCE NF9208 Business Leather Men Watches Quartz Analog LCD Watch Men Sport Military Waterproof Drop Shipping Wristwatch Male Clock.', 'NAVIFORCE NF9208 PU Leather Dual Time Wrist Watch in Bangladesh\nNAVIFORCE NF9208 Business Leather Men Watches Quartz Analog LCD Watch Men Sport Military Waterproof Drop Shipping Wristwatch Male Clock.\n\nFeatures:\n3ATM waterproof\nEnvironmental\nvaccum \n', 3000.00, 2350.00, 'Electronics & Gadgets', 'Smartwatches', 'Naviforce', 21.00, 'uploads\\images\\1732361038887-hand_watch1_3.jpg', '[\"uploads\\\\images\\\\1732361038889-hand_watch1_1.webp\",\"uploads\\\\images\\\\1732361038889-hand_watch1_2.webp\"]', '2024-11-23 11:23:58', '2024-11-28 13:28:09'),
(20, 'Colmi P28 Plus Silver Bluetooth Calling Smart Watch #6M', 'Colmi, hand watch, digital hand watch, electronics, gadgets, Waterproof watch, Colmi P28 Plus', '<p>The Colmi P28 Plus Silver Bluetooth Calling Smart Watch is a perfect blend of elegance and advanced technology. This smartwatch allows you to stay connected, track your health, and manage your activities effortlessly. Whether you’re a fitness enthusiast o</p>', '<p><strong>Features and Benefits of Colmi P28 Plus: </strong></p><p>Bluetooth Calling: Enjoy the convenience of making and receiving calls directly from your wrist. The Bluetooth calling feature allows you to stay connected without having to pull out your smartphone, making it perfect for busy lifestyles. Comprehensive Health Monitoring: The Colmi P28 Plus comes equipped with essential health tracking features, including heart rate monitoring, sleep tracking, and blood oxygen measurement. </p><p>This ensures you can keep a close eye on your well-being and make informed health decisions. High-Quality Display: Featuring a vibrant display, the smartwatch ensures that all notifications, apps, and health data are presented in clear, bright visuals. The responsive touchscreen allows for easy navigation, enhancing your overall user experience. </p><p><br></p><p>Multiple Sports Modes: Whether you enjoy running, cycling, or any other physical activity, the Colmi P28 Plus supports various sports modes to help you track your performance and achieve your fitness goals. Customizable Watch Faces: With a selection of customizable watch faces, you can easily personalize the look of your smartwatch to suit your style or mood, adding a touch of individuality to your device. </p><p><br></p><p><strong>Specifications</strong>:</p><p><strong>Brand:  </strong>Colmi </p><p><strong>Model: </strong> Colmi P28 Plus </p><p><strong>Use For</strong>:  Male &amp; Female </p><p><strong>Cellular Network</strong>: No </p><p><strong>Sim Card Slot:</strong> No </p><p><strong>Dial Shape:</strong> Square </p><p><strong>Screen/Display Size:</strong> 1.69 Inch </p><p><strong>Display Type:</strong> TFT Display </p><p><strong>Resolution (Pixels): </strong>240 x 280 </p><p><strong>Multitouch:</strong> Full screen touch Always On</p><p><strong>Display:</strong> No RAM &amp; Memory: Unmentioned Camera: No Calling Feature: Yes </p><p><strong>Waterproof:</strong> Yes </p><p><strong>Dustproof:</strong> No </p><p><strong>Shockproof:</strong> No </p><p><strong>Blood Pressure:</strong> No Blood Oxygen: Yes </p><p><strong>Heart Rate:</strong> Yes </p><p><strong>Scrollable Pin/Button:</strong> Yes </p><p><strong>Wi-Fi:</strong> No <strong>Bluetooth:</strong> Yes</p><p><strong>Connectivity Mode</strong>: Bluetooth </p><p><strong>Battery: </strong>235mAh </p><p>Number of Straps: 1 </p><p><strong>Color: </strong>Silver </p><p><strong>Band Color:</strong> Silver </p><p><strong>Warranty Details:</strong> 6 Month (Warranty must be claimed with original box &amp; all accessories)</p>', 2550.00, 2200.00, 'Electronics & Gadgets', 'Smartwatches', 'Colmi', 8.00, 'uploads\\images\\1732820438928-hand_watch2_2.webp', '[\"uploads\\\\images\\\\1732820438929-hand_watch2_1.webp\"]', '2024-11-23 11:41:45', '2024-11-28 19:00:38'),
(21, 'Corsair HS50 Pro Stereo 3.5mm Gaming Headphone (Carbon)', 'headphone, Cospair HS50 headphone, electronics and gadget, airphone, Gaming headphone', '<p><span style=\"color: rgb(119, 119, 119);\">Check The Corsair HS50 Pro Gaming Headset Best Price In BD.&nbsp;</span><strong style=\"color: rgb(119, 119, 119);\"><u>Asbab </u></strong><span style=\"color: rgb(119, 119, 119);\">Ensure That Your Product Is Authentic And of Best Quality.</span></p>', '<p><strong>Color:</strong> Carbon Cable</p><p><strong>Length: </strong>1.8m</p><p><strong>Frequency Range:</strong> 20Hz – 20 KHz</p><p><strong>Impedance:</strong> 32 Ohms @ 1 KHz</p><p><strong>Sensitivity:</strong> 111dB (+/-3dB)</p><p><strong>Input Jack:</strong> 3.5mm</p><p><strong>Connectivity:</strong> Wired</p><p><strong>Fequency:</strong> 100Hz To 10kHz</p><p><strong>Noise Ratio:</strong> Unidirectional</p><p><strong>Noise Cancelling Sensitivity:</strong> 40dB (+/-3dB)</p><p><strong>Others: Microphone Impedance:</strong> 2.0k Ohms</p>', 4300.00, 4250.00, 'Electronics & Gadgets', 'headphones', 'Corsair', 3.00, 'uploads\\images\\1732816087305-headphone1_2.webp', '[\"uploads\\\\images\\\\1732816087306-headphone1_1.webp\",\"uploads\\\\images\\\\1732816087306-headphone1_3.webp\"]', '2024-11-28 13:57:15', '2024-11-28 17:48:07'),
(22, 'HP ProBook 450 G9 | 2022 Model | 15.6-inch FHD Display Laptop Silver ( i5-1235U, 8GB, 512GB, Intel )', 'HP, laptop, hp laptop, electronics', '<ul><li>Intel Core i5-1235U Processor ( up to 4.40 GHz, Core 10, Thread 12, 12MB cache&nbsp;)</li><li>8GB DDR4-3200 MHz RAM (1 x 8 GB), Max: 32GB</li><li>512GB PCIe® NVMe™ SSD</li><li>Intel Iris Xe Graphics</li><li>15.6 inch LED FHD (1920 x 1080) Anti-glare, narrow bezel, Brightness: 400 nits, 72% NTSC Display</li></ul><p><br></p>', '<h3><strong>HP ProBook 450 G9 Ultrabook Laptop - Full Specifications</strong></h3><p><strong>Check the new HP ProBook 450 G9 Ultrabook Laptop</strong> full specifications on our website now! Get the <strong>latest model</strong> of HP ProBook laptops from us at the <strong>best price in Bangladesh (BD)</strong>.</p><p><strong>Check out our entire HP laptop collection </strong></p><h3><strong>Product Details</strong></h3><p><strong>Brand:</strong> HP</p><p><strong>Model:</strong> HP ProBook 450 G9</p><p><strong>Released Year:</strong> 2022</p><p><strong>Model Number:</strong> G9</p><p><strong>Series:</strong> HP Pavilion</p><p><strong>Sub-Series:</strong> Pavilion</p><p><br></p><h3><strong>HP ProBook 450 G9 Full Specifications</strong></h3><p><br></p><p><strong>CPU / Processor: </strong> Intel Core i5-1235U Processor <em>(Up to 4.40 GHz, 10 Cores, 12 Threads, 12MB Cache)</em></p><p><strong>Memory: </strong>8GB DDR4-3200 MHz RAM <em>(1 x 8GB) </em></p><p><strong>Memory Slots: </strong> 2 Slots <em>(Upgradeable)</em></p><p><strong>Storage: </strong>512GB PCIe® NVMe™ SSD <em>(High-speed performance)</em></p><p><strong>Graphics Card:  </strong>Intel Iris Xe Graphics <em>(Integrated GPU)</em></p><p><strong>Display: </strong>15.6-inch LED FHD <em>(1920 x 1080)</em></p><p><strong>Camera: </strong>HD Camera <em>(Ideal for video calls)</em></p><p><strong>Operating System: </strong>FreeDOS <em>(OS customization available)</em></p><p><strong>Audio: </strong>W/4-ohm per speaker <em>(Clear sound quality)</em></p><p><br></p><h3><strong>Warranty</strong></h3><p><strong>3 Years Manufacturer’s Limited Warranty</strong></p><p>This laptop is perfect for professionals seeking <strong>performance, reliability, and modern features</strong>. Don\'t miss out—order now!</p>', 92900.00, 89900.00, 'Electronics & Gadgets', 'Laptops', '', 3.00, 'uploads\\images\\1732826371271-laptop1_1.webp', '[\"uploads\\\\images\\\\1732826371271-laptop1_2.webp\",\"uploads\\\\images\\\\1732826371271-laptop1_3.webp\"]', '2024-11-28 20:30:10', '2024-11-28 20:39:31'),
(23, 'Asus VY229HF 21.45 Inch FHD Display HDMI VGA Eye Care Gaming Monitor', 'monitor, asus monitor, electronics and gadgets, desktop computer', '<ul><li class=\"ql-indent-1\">Display Size (Inch) - 21.45</li><li class=\"ql-indent-1\">Display Resolution - 1920x1080</li><li class=\"ql-indent-1\">Panel Type - IPS</li><li class=\"ql-indent-1\">Refresh Rate (Hz) - 100Hz</li><li class=\"ql-indent-1\">Rotatable - No</li><li class=\"ql-indent-1\">HDMI Port - 1</li></ul>', '<p><strong>Brand: </strong>Asus</p><p><strong>Model: </strong>Asus VY229HF</p><p><strong>Series: </strong>Gaming</p><p><strong>Shape: </strong>Widescreen</p><p><strong>Borderless: </strong>Yes</p><p><strong>Touch Screen: </strong>No</p><p><strong>Display Resolution: </strong>1920x1080</p><p><strong>Refresh Rate (Hz): </strong>100Hz</p><p><strong>Response Time (ms): </strong>1ms (MPRT)</p><p><strong>Horizontal Viewing Angle: </strong>178 Degree</p><p><strong>Vertical Viewing Angle: </strong>178 Degree</p><p><strong>Speaker (Built-in): </strong>No</p><p><strong>Rotatable: </strong>No</p><p><strong>Color: </strong>Black</p><p><strong>Weight (Kg): </strong>2.72 kg</p><p><strong>Warranty Details: </strong>3 Year (Box Mandatory While Claiming)</p>', 13500.00, 14110.00, 'Electronics & Gadgets', 'Computers', 'ASUS', 6.00, 'uploads\\images\\1732827823609-monitor1_1.webp', '[\"uploads\\\\images\\\\1732827823609-monitor1_2.webp\",\"uploads\\\\images\\\\1732827823609-monitor1_3.webp\",\"uploads\\\\images\\\\1732827823609-monitor1_4.webp\",\"uploads\\\\images\\\\1732827823610-monitor1_5.webp\"]', '2024-11-28 20:46:20', '2024-11-28 21:03:43'),
(24, 'BDCOM P1501DS 1GE EPON ONU', 'bdcom onu, onu, electronics', '<h4>Quick Overview</h4><ol><li>PON Interface - 1 x SC/UPC EPON</li><li>PON Port Connector Type - Unmentioned</li></ol><p><br></p>', '<p><strong>Brand: </strong>BDCOM</p><p><strong>Model: </strong>BDCOM P1501DS</p><p><strong>PON Interface: </strong>1 x SC/UPC EPON</p><p><strong>PON Port Connector Type: </strong>Unmentioned</p><p><strong>PON Port Interface Type: </strong>SC/UPC</p><p><strong>Ethernet Interface: </strong>Unmentioned</p><p><strong>Network Management: </strong>Unmentioned</p><p><strong>Power Supply: </strong>Input: 100-240V AC, Output: 12V/0.5A</p><p><strong>Body Material: </strong>Plastic</p><p><strong>Dimension: </strong>80 x 75 x 24mm</p><p><strong>Weight (Kg): </strong>0.1 kg</p><p><strong>Warranty Details: </strong>2 year</p>', 1300.00, 1200.00, 'Electronics & Gadgets', 'onu', 'BODCOM', 5.00, 'uploads\\images\\1732828330031-onu1_1.webp', '[\"uploads\\\\images\\\\1732828330032-onu1_2.webp\"]', '2024-11-28 21:12:10', '2024-11-28 21:12:10'),
(25, 'ZAALIQA Girls Black Handbag', 'hand bag, girls bag, zaaliqa, girls bag', '<p>The ZAALIQA Girls Black Handbag is a stylish and versatile accessory, perfect for everyday use or special occasions. Designed with elegance and functionality in mind, this handbag is ideal for girls who want to add a chic touch to their outfits.</p>', '<p>The ZAALIQA Girls Black Handbag combines timeless style with practical design, making it a must-have accessory for any girl\'s wardrobe. Crafted from durable materials, this handbag features a sleek black finish that complements any outfit, from casual to formal. Its spacious interior provides ample room for essentials like a phone, wallet, makeup, and more, while the sturdy handles and adjustable strap ensure comfortable carrying options. Whether for school, outings, or parties, this handbag offers a perfect blend of fashion and functionality, enhancing confidence and style.</p>', 750.00, 620.00, 'electronics', 'girls-hand-bag', 'Zaaliqa', 5.00, 'uploads\\images\\1733484665123-girls_handbag2_1.webp', '[\"uploads\\\\images\\\\1733484665124-girls_handbag2_2.webp\",\"uploads\\\\images\\\\1733484665128-girls_handbag2_3.webp\"]', '2024-12-06 11:31:05', '2024-12-06 11:31:05'),
(26, 'GESPO Peach Solid Mandarin Collar Half Sleeve Casual T-Shirt', 'tshirt, boys tshirt, men tshirt, fashion, GESPO', '<p><span style=\"color: rgba(0, 0, 0, 0.8);\">Kurta: The kurta is the top piece, which is a long tunic-style garment that can vary in length, sleeve style, and neckline. In this set, it is made from rayon fabric, which is known for its softness, smooth texture, and breathability. Rayon kurta often comes in a variety of prints, patterns, and colors, catering to different tastes and occasio.</span></p>', '<p><strong>Stand Up: </strong>	35″L x 24″W x 37-45″H(front to back wheel)</p><p><strong>Folded (w/o wheels): </strong>	32.5″L x 18.5″W x 16.5″H</p><p><strong>Folded (w/ wheels): </strong>	32.5″L x 24″W x 18.5″H</p><p><strong>Door Pass Through:</strong>	 24</p><p><strong>Frame:</strong>	 Aluminum</p><p><strong>Weight (w/o wheels):</strong>	 20 LBS</p><p><strong>Weight Capacity: </strong>	60 LBS</p><p><strong>Width:</strong>	 24″</p><p><strong>Handle height (ground to handle):</strong> 	37-45″</p><p><strong>Wheels:</strong>	12″ air / wide track slick tread</p><p><strong>Seat back height:</strong>	21.5″</p><p><strong>Head room (inside canopy):</strong>	25″</p><p><strong>Color:</strong>	Black, Blue, Red, White</p><p><strong>Size:</strong>	M, S</p>', 2000.00, 1500.00, 'electronics', 'tshirt', 'GESPO', 7.00, 'uploads\\images\\1733485164946-tshirt2_1.webp', '[\"uploads\\\\images\\\\1733485164946-tshirt2_2.webp\",\"uploads\\\\images\\\\1733485164950-tshirt2_3.webp\",\"uploads\\\\images\\\\1733485164953-tshirt2_4.webp\"]', '2024-12-06 11:39:24', '2024-12-06 11:39:24'),
(27, 'Casio fx-991ES Plus 2nd edition Non Programmable Scientific Calculator #C79', 'Casio, Calculator, Scientific calculator, Electronics, 991ES calculator', '<p>Type - Scientific Calculator</p><p>Display - Dot Matrix Display</p><p>Digit - 10 &amp; 2</p><p>Key - Plastic keys</p><p>Memory - Yes</p><p>Print Speed - No</p>', '<p><strong>Brand:</strong>	Casio</p><p><strong>Model:</strong>	Casio fx-991ES Plus 2nd edition</p><p><strong>Type:</strong>	Scientific Calculator</p><p><strong>Part No:</strong>	C79</p><p><strong>Display:</strong>	Dot Matrix Display</p><p><strong>Digit:</strong>	10 &amp; 2</p><p><strong>Number of Functions:</strong>	417</p><p><strong>Key:</strong>	Plastic keys</p><p><strong>Memory:</strong>	Yes</p><p><strong>Print Speed:</strong>	No</p><p><strong>Dimensions:</strong>	11 x 77 x 162mm</p><p><strong>Weight (Kg):</strong>	95gm</p><p><strong>Color:</strong>	Black</p>', 2330.00, 2200.00, 'Electronics & Gadgets', 'Calculator', 'Casio', 3.00, 'uploads\\images\\1733502452600-calculator1_3.webp', '[\"uploads\\\\images\\\\1733502452601-calculator1_2.webp\",\"uploads\\\\images\\\\1733502452603-calculator1_1.webp\",\"uploads\\\\images\\\\1733502452603-calculator1_4.webp\",\"uploads\\\\images\\\\1733502452604-calculator1_5.webp\"]', '2024-12-06 16:26:10', '2024-12-06 16:27:32'),
(28, 'Epson EcoTank L3210 (A4) Multifunction InkTank Printer #C11CJ68501/C11CJ68506', 'Epson Printer, printer, digital printer, electronics', '<p>Functions - Print, Scan, Copy</p><p>Output Color - Color</p><p>Print Speed (Black) - 10ipm(ISO) (A4), 33ppm(Draft) (A4)</p><p>Print Speed (Color) - 5ipm(ISO) (A4), 15ppm(Draft) (A4)</p><p>Print Paper Size Max. - Legal</p><p>Interface (Built-in) - USB</p><p><br></p>', '<p><strong> Brand</strong>: Epson</p><p> <strong>Model</strong>: Epson EcoTank L3210</p><p> <strong>Series</strong>: EcoTank</p><p> <strong>Type</strong>: Ink Tank</p><p> <strong>Functions</strong>: Print, Scan, Copy</p><p> <strong>Output Color</strong>: Color</p><p> <strong>Print Speed (Black)</strong>: 10ipm (ISO) (A4), 33ppm (Draft) (A4)</p><p> <strong>Print Speed (Color)</strong>: 5ipm (ISO) (A4), 15ppm (Draft) (A4)</p><p> <strong>Printer Resolution (Black)</strong>: 5760 x 1440 dpi</p><p> <strong>Printer Resolution (Color)</strong>: 5760 x 1440 dpi</p><p> <strong>Duplex Print</strong>: Manual</p><p> <strong>Scan Speed</strong>: 11sec (Black), 32sec (Color)</p><p> <strong>Scan Resolution (Pixel)</strong>: 600 x 1200 dpi</p><p> <strong>Scan Paper Size</strong>: A4</p><p> <strong>Duplex Scan</strong>: Manual</p><p> <strong>Copy Speed</strong>: 7ipm (Black), 1.7ipm (Color)</p><p> <strong>Copier Resolution (Black)</strong>: 600 x 600 dpi</p><p> <strong>Copier Resolution (Color)</strong>: 600 x 600 dpi</p><p> <strong>Fax (Transmission) Speed (kbps)</strong>: No</p><p> <strong>Fax Resolution (Pixel)</strong>: No</p><p> <strong>Print Paper Size</strong>: Legal (8.5 x 14.0 Inch), Indian-Legal (215 x 345 mm), 8.5 x 13 inch, Letter, A4, 16K (195 x 270 mm), B5, A5, B6, A6, Hagaki (100 x 148 mm), 5 x 7 inch, 5 x 8 inch, 4 x 6 inch, Envelopes: 10, DL, C6</p><p> <strong>Interface (Built-in)</strong>: USB</p><p> <strong>Mobile Printing</strong>: No</p><p> <strong>Borderless Printing</strong>: Yes, Up to 4R (4 x 6 Inch)</p><p> <strong>Monthly Print Capacity</strong>: 1500 Pages</p><p> <strong>Consumable</strong>: Black Ink Bottle: 4,500 Pages (003), Cyan, Magenta, Yellow Ink Bottles: 7,500 Pages each (003)</p><p> <strong>Ink Tank</strong>: Yes</p><p> <strong>Body Color</strong>: Black</p><p> <strong>Power Source/Power Consumption</strong>: AC 220-240 V, 14.0 W (Operating), 0.4 W (Sleep), 0.2 W (Power off), 4.0 W (Standby)</p><p> <strong>Dimensions</strong>: 375 x 347 x 179mm</p><p> <strong>Weight (Kg)</strong>: 3.9 kg</p><p> <strong>Warranty Details</strong>: 1 Year (Without Adapter) (Box Mandatory While Claiming)</p>', 19210.00, 18000.00, 'Electronics & Gadgets', 'Printer', 'Epson', 12.00, 'uploads\\images\\1733503199635-printer1_1.webp', '[\"uploads\\\\images\\\\1733503199636-printer1_2.webp\",\"uploads\\\\images\\\\1733503199636-printer1_3.webp\",\"uploads\\\\images\\\\1733503199636-printer1_4.webp\"]', '2024-12-06 16:39:59', '2024-12-06 16:39:59'),
(29, 'Keychron K2 Version 2 (84%) || Hot Swappable || Per Key RGB Backlight Mechanical Keyboard', 'keychron, keyboard, electronics', '<ul><li>Model:&nbsp;Keychron K2 Version 2</li><li>Compact design Mechanical Keyboard</li><li>Bluetooth 5.1 Wireless connection / Type-C Cable</li><li>Connect up to 3 devices wirelessly at once</li><li>Inclined bottom frame</li><li>84 Keys but retaining all the essential function keys</li><li>e.g. Page Up/Down, Home, End, and Screen capture</li><li>With N-key rollover (NKRO on wired mode only)</li><li>Gateron pro blue Switch</li><li>No matter what you like, linear, clicky or a little in between</li><li>50 million keystrokes</li><li>18 Types&nbsp;of&nbsp;RGB&nbsp;Backlit</li><li>Wireless and Wired Dual Modes</li></ul><p><br></p>', '<p><strong>Keychron K2 Version 2 (84%) RGB Price in BD</strong>: Check the new mechanical keyboard Keychron K2 Version 2 RGB price in BD and more details from our website. This device refreshes your gaming experience with a portable, tactile design and the largest battery seen in a mechanical keyboard.</p><p><br></p><p><strong>Key Features</strong>:</p><p><br></p><p><strong> Brand</strong>: Keychron</p><p> <strong>Compatible Devices</strong>: Laptop, Smartphone</p><p> <strong>Connectivity Technology</strong>: Bluetooth 5.1 Wireless, Type-C Cable</p><p> <strong>Keyboard Description</strong>: Gaming, Compact Mechanical Keyboard</p><p> <strong>Special Feature</strong>: Per Key RGB Backlight, Ergonomic</p><p> <strong>Color</strong>: Gateron Pro Blue Switch</p><p> <strong>Switch Types</strong>: Linear, Clicky, or Hybrid; Supports 50 Million Keystrokes</p><p> <strong>Number of Keys</strong>: 84 Keys with essential functions (Page Up/Down, Home, End, Screen Capture)</p><p> <strong>N-Key Rollover</strong>: NKRO (on wired mode only)</p><p> <strong>Backlighting Support</strong>: 18 RGB Backlight Modes</p><p> <strong>Style</strong>: Modern</p><p> <strong>Dimensions</strong>: 12.48″L x 5.08″W x 1.57″H</p><p> <strong>Product Warranty</strong>: 1 Year Warranty (Box submission required for claim)</p>', 13500.00, 10500.00, 'Electronics & Gadgets', 'Keyboard', 'Keychron', 10.00, 'uploads\\images\\1733503682372-keyboard2_1.webp', '[\"uploads\\\\images\\\\1733503682373-keyboard2_2.webp\",\"uploads\\\\images\\\\1733503682373-keyboard2_3.webp\"]', '2024-12-06 16:48:02', '2024-12-06 16:48:02'),
(30, 'Acer Nitro 5 AN515 | 2023 Model | 15.6 inch 165Hz 100% sRGB Display Gaming Laptop ( R5-7535HS, 8GB, 512GB, RTX 3050 4GB, W11 )', 'acer, laptop, acer laptop, electronics', '<ul><li>AMD&nbsp;Ryzen 5 7535HS&nbsp;hexa-core Processor</li><li>8GB of DDR5&nbsp;4800Mhz&nbsp;RAM</li><li>512GB SSD PCIe M.2&nbsp;Gen 4</li><li>Nvidia GeForce&nbsp;RTX 3050&nbsp;with 4 GB of dedicated GDDR6 VRAM Graphics Card</li><li>15.6 inch (1920×1080) Full HD&nbsp;165Hz&nbsp;Display&nbsp;<em>100% sRGB</em></li><li>Windows 11</li></ul>', '<p><strong>Acer Nitro 5 Ryzen 5 7535HS Price in BD</strong>: Check the price of the Acer Nitro 5 Ryzen 5 7535HS at Computer Mania BD. Enjoy official warranty and explore the latest 2023 models with full specifications on our website.</p><p><strong> Brand</strong>: Acer</p><p> <strong>Model</strong>: Acer Nitro 5</p><p> <strong>Released Year</strong>: 2023</p><p> <strong>Model Number</strong>: AN515</p><p> <strong>Series</strong>: Nitro</p><p> <strong>Sub-Series</strong>: Acer Nitro</p><p><strong>Acer Nitro 5 Ryzen 5 7535HS Full Specification</strong>:</p><p><strong>CPU/Processor</strong>: AMD Ryzen 5 7535HS Hexa-core Processor</p><p> <strong>Memory</strong>: 8GB DDR5 4800MHz RAM (Slot 2, Expandable up to 32GB)</p><p> <strong>Storage</strong>: 512GB SSD PCIe M.2 Gen 4</p><p> <strong>Graphic Card</strong>: Nvidia GeForce RTX 3050, 4GB GDDR6 Dedicated VRAM</p><p> <strong>Display</strong>: 15.6\" Full HD (1920x1080) 165Hz Display, 100% sRGB</p><p> <strong>Camera</strong>: 720p HD video at 30fps with Temporal Noise Reduction</p><p> <strong>Operating System</strong>: Windows 11</p><p> <strong>Audio &amp; Video</strong>: Stereo Speakers</p><p> <strong>Network/Connectivity</strong>: Wi-Fi 6E (802.11ax), Bluetooth 5.2</p><p> <strong>Keyboard</strong>: RGB Backlit Keyboard with Numeric Keypad and International Language Support</p><p> <strong>Interface</strong>:</p><ul><li>1 x USB 3.2 Gen 1 Port</li><li>USB 3.2 Gen 2 Port with Power-off Charging</li><li>USB 3.2 Gen 2 Port</li><li>1 x USB Type-C Port</li><li>HDMI Port</li></ul><p><strong>Battery</strong>: 57 Wh Li-ion Battery</p><p> <strong>Dimensions</strong>: 360.4 x 271.09 x 25.9/26.9mm</p><p> <strong>Weight</strong>: 2.5 kg</p><p> <strong>Remark</strong>: 2 Years Manufacturer’s Limited Warranty</p>', 124900.00, 114900.00, 'Electronics & Gadgets', 'Laptops', 'ACER', 12.00, 'uploads\\images\\1733504077042-laptop6_3.webp', '[\"uploads\\\\images\\\\1733504077042-laptop6_2.webp\",\"uploads\\\\images\\\\1733504077042-laptop6_1.webp\"]', '2024-12-06 16:53:14', '2024-12-06 16:54:37');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `fullname` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `fullname`, `username`, `email`, `mobile`, `password`) VALUES
(1, 'user1', 'username1', 'user1@gmail.com', '01771337896', '$2a$10$8Mo6DxWqodzkHnSe5/auquBwZtC5OhyCdaDAFLm4QrXLdSC78MmHa'),
(3, 'user3', 'username3', 'user3@gmail.com', '1234567890', '$2a$10$GTKV8CcstgyCCCr/YgWxxOJByUkMjYIZZjgfPGLkTtmyBQs0c1KVW'),
(4, 'user4', 'username4', 'user4@gmail.com', '01609313886', '$2a$10$u0JemWWNgQXhq7GF0GEa9OZ.fM6oeFN6ngtlp9uoa1Qnp/UYxSU4m'),
(5, 'user5', 'username5', 'user5@gmail.com', '01771337896', '$2a$10$PufcE52wgHYyiVr0U6jlC.kM9sNF4KVbyHk7Q0JZtQPlj1sWdomgS'),
(6, 'Md. Nissan Ali', 'nissan130', 'mdnissanali@gmail.com', '01771337896', '$2a$10$iL7CPW8ffEy55yTy.CycrOG231RsThGzsVzCRN1e0g95mPlAZSgFS'),
(7, 'Md. Nissan Ali', 'nissan130', 'mdnissanali130@gmail.com', '01771337896', '$2a$10$hTvD82xF/rC2/K7TTrS.o..c7PIZPZZ.M.g9vsLUOOmpaNA3XinIC'),
(8, 'user6', 'user6', 'user6@gmail.com', '0987654321', '$2a$10$tF2lyNEAiLzppwM9v6Bf4eZschuIT2ozqk4IHjHw2PQnFBnDFiDOO');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `favorite_items`
--
ALTER TABLE `favorite_items`
  ADD PRIMARY KEY (`favorite_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD UNIQUE KEY `transaction_id` (`transaction_id`);

--
-- Indexes for table `pending_orders`
--
ALTER TABLE `pending_orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `product_list`
--
ALTER TABLE `product_list`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `favorite_items`
--
ALTER TABLE `favorite_items`
  MODIFY `favorite_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `pending_orders`
--
ALTER TABLE `pending_orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `product_list`
--
ALTER TABLE `product_list`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product_list` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

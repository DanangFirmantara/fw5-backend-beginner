-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 06 Mar 2022 pada 20.12
-- Versi server: 10.4.14-MariaDB
-- Versi PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vehicle_rent`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `forgot_request`
--

CREATE TABLE `forgot_request` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `code` int(11) NOT NULL,
  `isExpired` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `forgot_request`
--

INSERT INTO `forgot_request` (`id`, `userId`, `code`, `isExpired`, `createdAt`, `updatedAt`) VALUES
(2, 85, 194454, 1, '2022-02-13 21:25:15', '2022-02-13 21:28:01'),
(3, 85, 304006, 1, '2022-02-13 21:25:40', '2022-02-13 21:28:28'),
(4, 85, 496246, 1, '2022-02-13 21:25:57', '2022-02-13 21:28:28'),
(5, 85, 495626, 1, '2022-02-13 21:26:08', '2022-02-13 21:28:28'),
(6, 85, 493856, 1, '2022-02-13 21:26:36', '2022-02-13 21:28:28'),
(7, 85, 594329, 1, '2022-02-13 21:26:49', '2022-02-13 21:28:28'),
(8, 85, 712571, 1, '2022-02-13 21:38:45', '2022-02-13 22:11:22'),
(9, 85, 579698, 1, '2022-02-13 22:43:11', '2022-02-13 22:48:50'),
(10, 85, 753486, 1, '2022-02-13 22:43:19', '2022-02-13 22:48:50'),
(11, 85, 575695, 1, '2022-02-13 22:43:20', '2022-02-13 22:48:50'),
(12, 85, 653877, 1, '2022-02-13 22:43:57', '2022-02-13 22:48:50'),
(13, 85, 261428, 1, '2022-02-13 22:44:16', '2022-02-13 22:48:50'),
(14, 85, 885847, 1, '2022-02-13 22:44:44', '2022-02-13 22:48:50'),
(15, 85, 237485, 1, '2022-02-13 22:49:03', '2022-02-13 22:50:15'),
(16, 85, 498371, 1, '2022-02-13 22:50:24', '2022-02-13 22:50:33'),
(17, 85, 457860, 1, '2022-02-14 00:01:47', '2022-02-14 00:06:48'),
(41, 91, 234841, 1, '2022-03-01 19:49:59', '2022-03-01 20:41:06');

-- --------------------------------------------------------

--
-- Struktur dari tabel `histories`
--

CREATE TABLE `histories` (
  `id` int(11) NOT NULL,
  `rentStartDate` date DEFAULT NULL,
  `rentEndDate` date DEFAULT NULL,
  `prepayment` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `vehicleId` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `histories`
--

INSERT INTO `histories` (`id`, `rentStartDate`, `rentEndDate`, `prepayment`, `userId`, `vehicleId`, `quantity`, `createdAt`, `updatedAt`) VALUES
(3, '2022-02-02', '2022-02-04', 1, NULL, 30, 0, '2022-02-02 15:54:31', '2022-02-02 23:27:38'),
(12, '2022-02-02', '2022-02-04', 1, NULL, 30, 0, '2022-02-02 17:39:18', '2022-02-02 23:27:38'),
(13, '2022-02-02', '2022-02-04', 1, NULL, 30, 0, '2022-02-02 17:53:21', '2022-02-02 23:27:38'),
(21, '2022-01-02', '2022-01-03', 1, NULL, 30, 0, '2022-02-02 22:36:07', '2022-02-02 23:27:38'),
(23, '2022-01-07', '2022-01-08', 1, NULL, 30, 0, '2022-02-06 13:45:56', '2022-02-06 14:52:58'),
(24, '2022-01-07', '2022-01-08', 1, NULL, 47, 0, '2022-02-07 09:53:29', '2022-02-08 22:48:42'),
(25, '2022-01-07', '2022-01-08', 1, NULL, 47, 0, '2022-02-07 09:54:30', '2022-02-08 22:46:49'),
(26, '2022-01-07', '2022-01-08', 1, NULL, 29, 0, '2022-02-08 22:33:49', '2022-02-08 22:42:57'),
(27, '2022-01-07', '2022-01-08', 1, NULL, 29, 0, '2022-02-08 22:51:05', '2022-02-08 22:51:14'),
(35, '2022-03-06', '2022-03-08', 0, 91, 45, 1, '2022-03-06 20:44:10', NULL),
(36, '2022-03-07', '2022-03-08', 0, 91, 69, 1, '2022-03-06 20:44:40', NULL),
(37, '2022-03-02', '2022-03-04', 0, 96, 30, 1, '2022-03-06 20:44:58', NULL),
(38, '2022-03-02', '2022-03-04', 0, 96, 30, 0, '2022-03-06 21:05:59', '2022-03-06 21:45:31'),
(43, '2022-03-02', '2022-03-04', 0, 96, 30, 0, '2022-03-06 21:18:48', '2022-03-06 21:44:23'),
(44, '2022-03-02', '2022-03-04', 0, 96, 30, 3, '2022-03-06 23:04:20', NULL),
(45, '2022-03-08', '2022-03-09', 0, 91, 29, 1, '2022-03-07 00:09:42', NULL),
(46, '2022-03-07', '2022-03-08', 0, 96, 31, 1, '2022-03-07 00:24:17', NULL);

--
-- Trigger `histories`
--
DELIMITER $$
CREATE TRIGGER `TG_RETURN_VEHICLES` AFTER UPDATE ON `histories` FOR EACH ROW BEGIN
UPDATE vehicles SET stock = stock + OLD.quantity
WHERE id = NEW.vehicleId;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `TG_RETURN_VEHICLES_DELETE` AFTER DELETE ON `histories` FOR EACH ROW BEGIN
UPDATE vehicles SET stock = stock + OLD.quantity
WHERE id = OLD.vehicleId;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `TG_UPDATESTATUS_AVAILABLE` AFTER UPDATE ON `histories` FOR EACH ROW BEGIN
UPDATE vehicles SET status = 'Available' WHERE stock != 0;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `TG_UPDATESTATUS_AVAILABLE_DELETE` AFTER DELETE ON `histories` FOR EACH ROW BEGIN
UPDATE vehicles SET status = 'Available' WHERE stock != 0;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `TG_UPDATESTATUS_FULLBOOKED` AFTER INSERT ON `histories` FOR EACH ROW BEGIN
UPDATE vehicles SET status = 'full booked' WHERE stock = 0;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `TG_UPDATESTOCK_VEHICLES` AFTER INSERT ON `histories` FOR EACH ROW BEGIN
UPDATE vehicles SET stock = stock - NEW.quantity 
WHERE id = NEW.vehicleId;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `prepayment`
--

CREATE TABLE `prepayment` (
  `id` int(11) NOT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `prepayment`
--

INSERT INTO `prepayment` (`id`, `status`) VALUES
(1, 'Payment'),
(2, 'invalid payment');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(80) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `password` varchar(80) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `displayName` varchar(255) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `contact`, `password`, `fullName`, `gender`, `address`, `displayName`, `birthDate`, `image`, `createdAt`, `updatedAt`) VALUES
(85, 'hamdi', 'hamdi@gmail.com', '082398767584', '$2b$10$1a87N11JZJx.C73VidOfNOjqXkFZMo3Lbwlqhc1Ksja3rUQCqLZja', NULL, NULL, NULL, NULL, NULL, NULL, '2022-02-13 01:28:26', '2022-02-14 00:06:48'),
(86, 'asgigih', 'gigih@gmail.com', '087627361711', '$2b$10$jUW5O1vum8NfHIjR5sUp4OB8OcxjMzTNHuQdnYRW9J8HcwC2AgsmK', NULL, NULL, NULL, NULL, NULL, NULL, '2022-02-13 01:29:19', NULL),
(88, 'danang', 'danang@gmail.com', '087898439385', '$2b$10$FgsIgBOQPOeVTHyVISYrzONjX2cjlrBeMSrdal2wKN9fAEksbs0c6', 'Danang firmantara', 'Male', 'Padang', 'Danang', '1999-05-09', NULL, '2022-02-13 01:32:21', '2022-02-13 01:35:12'),
(91, 'admin', 'bevad56184@ishop2k.com', '081237844675', '$2b$10$wCIQq83SEkqqmm6fNusboOhFp7PX.9JSqtn.dNJoGpIcDCBCVfxs2', NULL, 'Male', 'bandung', 'Admin', '1999-02-15', NULL, '2022-03-01 19:26:31', '2022-03-05 18:14:46'),
(95, 'dinda', 'dinda@gmail.com', NULL, '$2b$10$Xn56FWUmDwTZqBP5nIJjveO/oRoNE.UkEn9hKOg5llCyWlQpQjAHO', NULL, NULL, NULL, NULL, NULL, NULL, '2022-03-05 11:57:42', NULL),
(96, 'fajri', 'fajri@mail.com', '087898439385', '$2b$10$5G8U4okEmILCDAJUHEQ1q.MXuvNMOYZv6QadGp1XBPOURjZ7dGQdC', 'Fajri saja', 'Male', 'Padang', NULL, NULL, NULL, '2022-03-05 13:08:36', '2022-03-05 17:56:08'),
(97, 'putri', 'putri@mail.com', NULL, '$2b$10$HggkoXlyvl4wJztX8A34KOgqiixndj0hpkgXeZo771D4t3jiKuAY2', NULL, NULL, NULL, NULL, NULL, NULL, '2022-03-05 13:25:36', NULL),
(98, 'joni', 'joni@mail.com', NULL, '$2b$10$cSZ8MVqdmdTbBNDwymlSYenSh8TrNYbobRM4Ut7MmKI4FuaEkwHHy', NULL, NULL, NULL, NULL, NULL, NULL, '2022-03-05 13:31:49', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `category` enum('Car','Motorbike','Bike') DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `status` varchar(80) DEFAULT NULL,
  `stock` int(11) DEFAULT 0,
  `image` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `vehicles`
--

INSERT INTO `vehicles` (`id`, `category`, `name`, `location`, `description`, `price`, `status`, `stock`, `image`, `createdAt`, `updatedAt`) VALUES
(21, 'Bike', 'Fixie', 'Padang', 'Up to 1 Person, return before 4 PM', 20000, 'Available', 4, 'uploads/image-4-2-2022-379929505.png', '2022-02-01 21:15:39', '2022-03-04 20:18:59'),
(29, 'Car', 'Toyota Vellfire', 'Yogyakarta', 'Up to 5 Person, return before 4 PM', 400000, 'Available', 4, 'uploads/image-4-2-2022-334159266.png', '2022-02-01 22:38:41', '2022-03-07 00:09:42'),
(30, 'Car', 'Toyota Alphard', 'Yogyakarta', 'Up to 5 Person, return before 4 PM', 400000, 'Available', 1, 'uploads/image-4-2-2022-839211924.png', '2022-02-01 23:09:57', '2022-03-06 23:04:20'),
(31, 'Car', 'Toyota Fortuner', 'Yogyakarta', 'Up to 5 adult, return before 4 PM', 400000, 'Available', 4, 'uploads/image-4-2-2022-944097651.png', '2022-02-03 20:12:32', '2022-03-07 00:24:17'),
(32, 'Car', 'Toyota Fortuner', 'Jakarta', 'Up to 5 adult, return before 4 PM', 400000, 'Available', 5, 'uploads/image-4-2-2022-887172732.png', '2022-02-03 20:16:38', '2022-03-04 20:10:05'),
(33, 'Car', 'Toyota Fortuner', 'Padang', 'Up to 5 adult, return before 4 PM', 400000, 'Available', 5, 'uploads/image-4-2-2022-4548440.png', '2022-02-03 20:16:45', '2022-03-04 20:10:37'),
(34, 'Car', 'Toyota Alphard', 'Jakarta', 'Up to 5 Person, return before 4 PM', 400000, 'Available', 5, 'uploads/image-4-2-2022-500666015.png', '2022-02-03 20:18:03', '2022-03-04 20:06:23'),
(37, 'Car', 'Honda Brio', 'Yogyakarta', 'Up to 4 adult, return before 4 PM', 300000, 'Available', 5, 'uploads/image-24-1-2022-733470970.png', '2022-02-07 08:41:34', '2022-02-24 20:35:17'),
(38, 'Car', 'Honda Jazz', 'Yogyakarta', 'Up to 4 adult, return before 4 PM', 350000, 'Available', 5, 'uploads/image-4-2-2022-680648005.png', '2022-02-07 08:42:02', '2022-03-04 20:13:21'),
(39, 'Car', 'Daihatsu Xenia', 'Yogyakarta', 'Up to 4 adult, return before 4 PM', 300000, 'Available', 5, 'uploads/image-4-2-2022-371501686.png', '2022-02-07 08:42:32', '2022-03-04 20:16:07'),
(40, 'Bike', 'Fixie', 'Yogyakarta', 'Up to 1 adult, return before 4 PM', 50000, 'Available', 5, 'uploads/image-4-2-2022-92552114.png', '2022-02-07 08:43:37', '2022-03-04 20:19:17'),
(41, 'Bike', 'BMX', 'Yogyakarta', 'Up to 1 adult, return before 4 PM', 50000, 'Available', 5, 'uploads/image-4-2-2022-754005160.png', '2022-02-07 08:47:55', '2022-03-04 20:19:57'),
(42, 'Bike', 'family bike', 'Yogyakarta', 'Up to 2 adult, return before 4 PM', 50000, 'Available', 5, 'uploads/image-4-2-2022-999321599.png', '2022-02-07 08:48:47', '2022-03-04 20:20:27'),
(44, 'Motorbike', 'Honda Beat Street', 'Yogyakarta', 'Up to 2 Person, return before 4 PM', 40000, 'Available', 4, 'uploads/image-14-1-2022-739687107.png', '2022-02-07 08:58:44', '2022-02-14 23:39:00'),
(45, 'Motorbike', 'Honda Scoopy', 'Yogyakarta', 'Up to 2 adult, return before 4 PM', 50000, 'Available', 3, 'uploads/image-4-2-2022-868313119.png', '2022-02-07 08:59:42', '2022-03-06 20:44:10'),
(46, 'Motorbike', 'Yamaha FreeGo', 'Yogyakarta', 'Up to 2 adult, return before 4 PM', 50000, 'Available', 4, 'uploads/image-4-2-2022-67911215.png', '2022-02-07 09:00:52', '2022-03-04 20:18:09'),
(47, 'Motorbike', 'Honda Vario 125', 'Yogyakarta', 'Up to 2 adult, return before 4 PM', 50000, 'Available', 7, 'uploads/image-4-2-2022-960063133.png', '2022-02-07 09:01:31', '2022-03-04 20:07:51'),
(48, 'Car', 'Honda Jazz', 'Jakarta', 'Up to 4 adult, return before 4 PM', 500000, 'Available', 4, 'uploads/image-4-2-2022-727264533.png', '2022-02-08 20:24:11', '2022-03-04 20:13:52'),
(49, 'Car', 'Honda Brio', 'Jakarta', 'Up to 4 adult, return before 4 PM', 300000, 'Available', 4, NULL, '2022-02-08 21:19:06', '2022-02-25 15:51:31'),
(69, 'Motorbike', 'Yamaha Nmax', 'Yogyakarta', 'Up to 2 adult, return before 4 PM', 50000, 'Available', 3, 'uploads/image-14-1-2022-197474077.png', '2022-02-12 23:28:02', '2022-03-06 20:44:40'),
(71, 'Motorbike', 'Yamaha Vixion R', 'Yogyakarta', 'Up to 2 adult, return before 4 PM', 50000, 'Available', 4, 'uploads/image-14-1-2022-941387878.png', '2022-02-14 23:06:05', '2022-02-14 23:42:15');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `forgot_request`
--
ALTER TABLE `forgot_request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `userId_2` (`userId`);

--
-- Indeks untuk tabel `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`,`vehicleId`),
  ADD KEY `vehicleId` (`vehicleId`);

--
-- Indeks untuk tabel `prepayment`
--
ALTER TABLE `prepayment`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `forgot_request`
--
ALTER TABLE `forgot_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT untuk tabel `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT untuk tabel `prepayment`
--
ALTER TABLE `prepayment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT untuk tabel `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `forgot_request`
--
ALTER TABLE `forgot_request`
  ADD CONSTRAINT `forgot_request_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `histories`
--
ALTER TABLE `histories`
  ADD CONSTRAINT `histories_ibfk_1` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `histories_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

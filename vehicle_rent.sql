-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 25 Feb 2022 pada 14.47
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
-- Struktur dari tabel `forget_request`
--

CREATE TABLE `forget_request` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `code` int(11) NOT NULL,
  `isExpired` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `forget_request`
--

INSERT INTO `forget_request` (`id`, `userId`, `code`, `isExpired`, `createdAt`, `updatedAt`) VALUES
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
(24, 90, 820483, 1, '2022-02-14 16:04:50', '2022-02-14 16:18:49'),
(25, 90, 697715, 1, '2022-02-14 23:12:50', '2022-02-14 23:16:22'),
(26, 90, 920678, 1, '2022-02-14 23:16:29', '2022-02-14 23:17:31'),
(27, 90, 260663, 1, '2022-02-14 23:18:44', '2022-02-14 23:21:17'),
(28, 90, 254522, 1, '2022-02-14 23:21:21', '2022-02-14 23:21:57');

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
(11, '2022-02-02', '2022-02-04', 1, NULL, 29, 0, '2022-02-02 17:38:20', '2022-02-02 23:27:38'),
(12, '2022-02-02', '2022-02-04', 1, NULL, 30, 0, '2022-02-02 17:39:18', '2022-02-02 23:27:38'),
(13, '2022-02-02', '2022-02-04', 1, NULL, 30, 0, '2022-02-02 17:53:21', '2022-02-02 23:27:38'),
(16, '2022-01-02', '2022-01-03', 1, NULL, 30, 0, '2022-02-02 22:15:56', '2022-02-02 23:27:38'),
(17, '2022-01-02', '2022-01-03', 1, NULL, 30, 0, '2022-02-02 22:21:39', '2022-02-02 23:27:38'),
(21, '2022-01-02', '2022-01-03', 1, NULL, 30, 0, '2022-02-02 22:36:07', '2022-02-02 23:27:38'),
(23, '2022-01-07', '2022-01-08', 1, NULL, 30, 0, '2022-02-06 13:45:56', '2022-02-06 14:52:58'),
(24, '2022-01-07', '2022-01-08', 1, NULL, 47, 0, '2022-02-07 09:53:29', '2022-02-08 22:48:42'),
(25, '2022-01-07', '2022-01-08', 1, NULL, 47, 0, '2022-02-07 09:54:30', '2022-02-08 22:46:49'),
(26, '2022-01-07', '2022-01-08', 1, NULL, 29, 0, '2022-02-08 22:33:49', '2022-02-08 22:42:57'),
(27, '2022-01-07', '2022-01-08', 1, NULL, 29, 0, '2022-02-08 22:51:05', '2022-02-08 22:51:14');

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
  `status` varchar(80) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `prepayment`
--

INSERT INTO `prepayment` (`id`, `status`) VALUES
(1, 'payment completed'),
(2, 'payment not completed');

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
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `contact`, `password`, `fullName`, `gender`, `address`, `displayName`, `birthDate`, `createdAt`, `updatedAt`) VALUES
(85, 'hamdi', 'hamdi@gmail.com', '082398767584', '$2b$10$1a87N11JZJx.C73VidOfNOjqXkFZMo3Lbwlqhc1Ksja3rUQCqLZja', NULL, NULL, NULL, NULL, NULL, '2022-02-13 01:28:26', '2022-02-14 00:06:48'),
(86, 'asgigih', 'gigih@gmail.com', '087627361711', '$2b$10$jUW5O1vum8NfHIjR5sUp4OB8OcxjMzTNHuQdnYRW9J8HcwC2AgsmK', NULL, NULL, NULL, NULL, NULL, '2022-02-13 01:29:19', NULL),
(88, 'danang', 'danang@gmail.com', '087898439385', '$2b$10$FgsIgBOQPOeVTHyVISYrzONjX2cjlrBeMSrdal2wKN9fAEksbs0c6', 'Danang firmantara', 'Male', 'Padang', 'Danang', '1999-05-09', '2022-02-13 01:32:21', '2022-02-13 01:35:12'),
(90, 'admin', 'gimivig886@plexfirm.com', '082932832345', '$2b$10$DSb5yetOtLL9G4fNgoH6/eP6yfcbrI2QRAJZaXKE66zvnUAu8h7sm', NULL, NULL, NULL, NULL, NULL, '2022-02-14 16:04:43', '2022-02-14 23:21:57');

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
(21, 'Bike', 'Fixie', 'Padang', 'Up to 1 Person, return before 4 PM', 20000, 'Available', 4, NULL, '2022-02-01 21:15:39', '2022-02-25 15:49:06'),
(29, 'Car', 'Toyota Vellfire', 'Yogyakarta', 'Up to 5 Person, return before 4 PM', 400000, 'Available', 5, 'uploads/image-24-1-2022-480753439.png', '2022-02-01 22:38:41', '2022-02-24 21:56:58'),
(30, 'Car', 'Toyota Alphard', 'Yogyakarta', 'Up to 5 Person, return before 4 PM', 400000, 'Available', 5, 'uploads/image-24-1-2022-18442857.png', '2022-02-01 23:09:57', '2022-02-24 20:27:45'),
(31, 'Car', 'Toyota Fortuner', 'Yogyakarta', 'Up to 5 adult, return before 4 PM', 400000, 'Available', 5, 'uploads/image-24-1-2022-656306862.png', '2022-02-03 20:12:32', '2022-02-24 20:28:35'),
(32, 'Car', 'Toyota Fortuner', 'Jakarta', 'Up to 5 adult, return before 4 PM', 400000, 'Available', 5, 'uploads/image-24-1-2022-513878679.png', '2022-02-03 20:16:38', '2022-02-24 20:45:33'),
(33, 'Car', 'Toyota Fortuner', 'Padang', 'Up to 5 adult, return before 4 PM', 400000, 'Available', 5, NULL, '2022-02-03 20:16:45', '2022-02-25 15:49:11'),
(34, 'Car', 'Toyota Alphard', 'Jakarta', 'Up to 5 Person, return before 4 PM', 400000, 'Available', 5, NULL, '2022-02-03 20:18:03', '2022-02-25 15:49:14'),
(37, 'Car', 'Honda Brio', 'Yogyakarta', 'Up to 4 adult, return before 4 PM', 300000, 'Available', 5, 'uploads/image-24-1-2022-733470970.png', '2022-02-07 08:41:34', '2022-02-24 20:35:17'),
(38, 'Car', 'Honda Jazz', 'Yogyakarta', 'Up to 4 adult, return before 4 PM', 350000, 'Available', 5, NULL, '2022-02-07 08:42:02', '2022-02-25 15:51:22'),
(39, 'Car', 'Daihatsu xenia', 'Yogyakarta', 'Up to 4 adult, return before 4 PM', 300000, 'Available', 5, NULL, '2022-02-07 08:42:32', '2022-02-25 15:49:22'),
(40, 'Bike', 'Fixie', 'Yogyakarta', 'Up to 1 adult, return before 4 PM', 50000, 'Available', 5, NULL, '2022-02-07 08:43:37', '2022-02-25 15:49:19'),
(41, 'Bike', 'BMX', 'Yogyakarta', 'Up to 1 adult, return before 4 PM', 50000, 'Available', 5, NULL, '2022-02-07 08:47:55', '2022-02-25 15:51:43'),
(42, 'Bike', 'Family bike', 'Yogyakarta', 'Up to 2 adult, return before 4 PM', 50000, 'Available', 5, NULL, '2022-02-07 08:48:47', '2022-02-25 15:51:45'),
(44, 'Motorbike', 'Honda Beat Street', 'Yogyakarta', 'Up to 2 Person, return before 4 PM', 40000, 'Available', 4, 'uploads/image-14-1-2022-739687107.png', '2022-02-07 08:58:44', '2022-02-14 23:39:00'),
(45, 'Motorbike', 'Honda Scoopy', 'Yogyakarta', 'Up to 2 adult, return before 4 PM', 50000, 'Available', 4, NULL, '2022-02-07 08:59:42', '2022-02-25 15:51:28'),
(46, 'Motorbike', 'Yamaha FreeGo', 'Yogyakarta', 'Up to 2 adult, return before 4 PM', 50000, 'Available', 4, NULL, '2022-02-07 09:00:52', '2022-02-25 15:51:37'),
(47, 'Motorbike', 'Honda Vario 125', 'Yogyakarta', 'Up to 2 adult, return before 4 PM', 50000, 'Available', 7, NULL, '2022-02-07 09:01:31', '2022-02-25 15:51:40'),
(48, 'Car', 'Honda Jazz', 'Jakarta', 'Up to 4 adult, return before 4 PM', 500000, 'Available', 4, NULL, '2022-02-08 20:24:11', '2022-02-25 15:51:25'),
(49, 'Car', 'Honda Brio', 'Jakarta', 'Up to 4 adult, return before 4 PM', 300000, 'Available', 4, NULL, '2022-02-08 21:19:06', '2022-02-25 15:51:31'),
(69, 'Motorbike', 'Yamaha Nmax', 'Yogyakarta', 'Up to 2 adult, return before 4 PM', 50000, 'Available', 4, 'uploads/image-14-1-2022-197474077.png', '2022-02-12 23:28:02', '2022-02-14 23:40:39'),
(71, 'Motorbike', 'Yamaha Vixion R', 'Yogyakarta', 'Up to 2 adult, return before 4 PM', 50000, 'Available', 4, 'uploads/image-14-1-2022-941387878.png', '2022-02-14 23:06:05', '2022-02-14 23:42:15');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `forget_request`
--
ALTER TABLE `forget_request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `userId_2` (`userId`);

--
-- Indeks untuk tabel `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`,`vehicleId`),
  ADD KEY `vehicleId` (`vehicleId`),
  ADD KEY `prepayment` (`prepayment`);

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
-- AUTO_INCREMENT untuk tabel `forget_request`
--
ALTER TABLE `forget_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT untuk tabel `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT untuk tabel `prepayment`
--
ALTER TABLE `prepayment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT untuk tabel `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `forget_request`
--
ALTER TABLE `forget_request`
  ADD CONSTRAINT `forget_request_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `histories`
--
ALTER TABLE `histories`
  ADD CONSTRAINT `histories_ibfk_1` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `histories_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `histories_ibfk_3` FOREIGN KEY (`prepayment`) REFERENCES `prepayment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 08 Feb 2022 pada 10.23
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
-- Database: `vehicle-rent`
--

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
(1, '2022-02-02', '2022-02-04', 1, 67, 29, 0, '2022-02-02 14:22:43', '2022-02-02 23:27:38'),
(3, '2022-02-02', '2022-02-04', 1, 67, 30, 0, '2022-02-02 15:54:31', '2022-02-02 23:27:38'),
(11, '2022-02-02', '2022-02-04', 1, 67, 29, 0, '2022-02-02 17:38:20', '2022-02-02 23:27:38'),
(12, '2022-02-02', '2022-02-04', 1, 67, 30, 0, '2022-02-02 17:39:18', '2022-02-02 23:27:38'),
(13, '2022-02-02', '2022-02-04', 1, 67, 30, 0, '2022-02-02 17:53:21', '2022-02-02 23:27:38'),
(16, '2022-01-02', '2022-01-03', 1, 67, 30, 0, '2022-02-02 22:15:56', '2022-02-02 23:27:38'),
(17, '2022-01-02', '2022-01-03', 1, 67, 30, 0, '2022-02-02 22:21:39', '2022-02-02 23:27:38'),
(21, '2022-01-02', '2022-01-03', 1, 67, 30, 0, '2022-02-02 22:36:07', '2022-02-02 23:27:38'),
(23, '2022-01-07', '2022-01-08', 1, 67, 30, 0, '2022-02-06 13:45:56', '2022-02-06 14:52:58'),
(24, '2022-01-07', '2022-01-08', 1, 67, 47, 1, '2022-02-07 09:53:29', NULL),
(25, '2022-01-07', '2022-01-08', 1, 67, 47, 3, '2022-02-07 09:54:30', NULL);

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
(67, 'gigihas', 'gigih@gmail.com', '087898439385', 'gigih', 'gigih Ariffan s', 'Male', 'Dharmasraya', 'Gigih', '1999-05-09', '2022-02-02 14:17:51', NULL),
(70, 'danangf14', 'danangf14@gmail.com', '087898439385', 'danang', 'Danang Firmantara', 'Male', 'Padang', 'Danang', '1999-05-09', '2022-02-02 14:17:51', '2022-02-06 12:05:16'),
(71, 'putra14', 'putra@gmail.com', '087898439385', 'putra', 'Afiif Putra', 'Male', 'Padang panjang', 'Putra', '1999-05-09', '2022-02-06 11:38:37', '2022-02-06 12:01:53');

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
  `image` varchar(255) NOT NULL DEFAULT 'default.jpg',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `vehicles`
--

INSERT INTO `vehicles` (`id`, `category`, `name`, `location`, `description`, `price`, `status`, `stock`, `image`, `createdAt`, `updatedAt`) VALUES
(21, 'Bike', 'Fixie', 'Padang', 'Up to 1 Person, return before 4 PM', 20000, 'Available', 4, 'fixie.jpg\nfixie2.jpg', '2022-02-01 21:15:39', '2022-02-03 20:02:03'),
(29, 'Car', 'Toyota Vellfire', 'Yogyakarta', 'Up to 5 Person, return before 4 PM', 400000, 'Available', 5, 'vellfire.jpg', '2022-02-01 22:38:41', '2022-02-07 08:39:28'),
(30, 'Car', 'Toyota Alphard', 'Yogyakarta', 'Up to 5 Person, return before 4 PM', 400000, 'Available', 5, 'alphard.jpg', '2022-02-01 23:09:57', '2022-02-07 08:40:18'),
(31, 'Car', 'Toyota Fortuner', 'Yogyakarta', 'Up to 5 adult, return before 4 PM', 400000, 'Available', 5, 'fortuner.jpg', '2022-02-03 20:12:32', NULL),
(32, 'Car', 'Toyota Fortuner', 'Jakarta', 'Up to 5 adult, return before 4 PM', 400000, 'Available', 5, 'fortuner.jpg', '2022-02-03 20:16:38', NULL),
(33, 'Car', 'Toyota Fortuner', 'Padang', 'Up to 5 adult, return before 4 PM', 400000, 'Available', 5, 'fortuner.jpg', '2022-02-03 20:16:45', NULL),
(34, 'Car', 'Toyota Alphard', 'Jakarta', 'Up to 5 Person, return before 4 PM', 400000, 'Available', 5, 'fortuner.jpg', '2022-02-03 20:18:03', '2022-02-05 22:28:40'),
(37, 'Car', 'Honda Brio', 'Yogyakarta', 'Up to 4 adult, return before 4 PM', 300000, 'Available', 5, 'brio.jpg', '2022-02-07 08:41:34', NULL),
(38, 'Car', 'Honda Jazz', 'Yogyakarta', 'Up to 4 adult, return before 4 PM', 350000, 'Available', 5, 'jazz.jpg', '2022-02-07 08:42:02', NULL),
(39, 'Car', 'Daihatsu xenia', 'Yogyakarta', 'Up to 4 adult, return before 4 PM', 300000, 'Available', 5, 'xenia.jpg', '2022-02-07 08:42:32', NULL),
(40, 'Bike', 'Fixie', 'Yogyakarta', 'Up to 1 adult, return before 4 PM', 50000, 'Available', 5, 'fixie.jpg', '2022-02-07 08:43:37', NULL),
(41, 'Bike', 'BMX', 'Yogyakarta', 'Up to 1 adult, return before 4 PM', 50000, 'Available', 5, 'bmx.jpg', '2022-02-07 08:47:55', NULL),
(42, 'Bike', 'Family bike', 'Yogyakarta', 'Up to 2 adult, return before 4 PM', 50000, 'Available', 5, 'familyBike.jpg', '2022-02-07 08:48:47', NULL),
(44, 'Motorbike', 'Honda Beat Street', 'Yogyakarta', 'Up to 2 Person, return before 4 PM', 50000, 'Available', 4, 'beatStreet.jpg', '2022-02-07 08:58:44', '2022-02-07 09:05:51'),
(45, 'Motorbike', 'Honda Scoopy', 'Yogyakarta', 'Up to 2 adult, return before 4 PM', 50000, 'Available', 4, 'scoopy.jpg', '2022-02-07 08:59:42', NULL),
(46, 'Motorbike', 'Yamaha FreeGo', 'Yogyakarta', 'Up to 2 adult, return before 4 PM', 50000, 'Available', 4, 'freeGo.jpg', '2022-02-07 09:00:52', NULL),
(47, 'Motorbike', 'Honda Vario 125', 'Yogyakarta', 'Up to 2 adult, return before 4 PM', 50000, 'full booked', 0, 'vario125.jpg', '2022-02-07 09:01:31', '2022-02-07 09:54:30');

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT untuk tabel `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT untuk tabel `prepayment`
--
ALTER TABLE `prepayment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT untuk tabel `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

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

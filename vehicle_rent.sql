-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 26 Apr 2022 pada 21.04
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test2`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Car', '2022-04-13 14:27:05', NULL),
(2, 'Motrobike', '2022-04-13 14:27:05', NULL),
(3, 'Bike', '2022-04-13 14:27:16', NULL);

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
(41, 91, 234841, 1, '2022-03-01 19:49:59', '2022-03-01 20:41:06'),
(43, 91, 343859, 1, '2022-03-07 14:21:31', '2022-04-23 17:37:32'),
(44, 99, 540650, 1, '2022-03-07 14:47:13', '2022-03-07 14:48:36'),
(45, 99, 231190, 1, '2022-03-07 15:18:34', '2022-03-07 15:19:22'),
(46, 99, 759448, 1, '2022-03-07 15:23:42', '2022-03-07 15:54:55'),
(47, 99, 332710, 1, '2022-03-07 15:56:21', '2022-03-07 15:57:19'),
(48, 99, 27543, 1, '2022-03-07 16:02:46', '2022-03-07 16:06:48'),
(49, 99, 804647, 1, '2022-03-07 16:07:01', '2022-03-07 16:07:48'),
(50, 99, 104721, 1, '2022-03-07 16:23:40', '2022-03-07 16:24:20'),
(51, 99, 590365, 1, '2022-03-07 16:39:13', '2022-03-07 16:40:02'),
(52, 99, 44977, 1, '2022-03-07 22:08:39', '2022-03-07 22:09:12'),
(53, 99, 749396, 1, '2022-03-07 22:10:44', '2022-03-07 22:11:34'),
(54, 99, 172717, 1, '2022-03-08 11:31:27', '2022-03-08 11:32:18'),
(55, 91, 76285, 0, '2022-04-23 17:37:45', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `histories`
--

CREATE TABLE `histories` (
  `id` int(11) NOT NULL,
  `rentStartDate` date DEFAULT NULL,
  `rentEndDate` date DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `vehicleId` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `codePayment` int(8) DEFAULT NULL,
  `idReservation` int(11) DEFAULT NULL,
  `isPayment` int(11) NOT NULL DEFAULT 0,
  `total` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `histories`
--

INSERT INTO `histories` (`id`, `rentStartDate`, `rentEndDate`, `userId`, `vehicleId`, `quantity`, `codePayment`, `idReservation`, `isPayment`, `total`, `createdAt`, `updatedAt`) VALUES
(3, '2022-02-02', '2022-02-04', NULL, 30, 0, 0, NULL, 0, 0, '2022-02-02 15:54:31', '2022-02-02 23:27:38'),
(12, '2022-02-02', '2022-02-04', NULL, 30, 0, 0, NULL, 0, 0, '2022-02-02 17:39:18', '2022-02-02 23:27:38'),
(13, '2022-02-02', '2022-02-04', NULL, 30, 0, 0, NULL, 0, 0, '2022-02-02 17:53:21', '2022-02-02 23:27:38'),
(21, '2022-01-02', '2022-01-03', NULL, 30, 0, 0, NULL, 0, 0, '2022-02-02 22:36:07', '2022-02-02 23:27:38'),
(23, '2022-01-07', '2022-01-08', NULL, 30, 0, 0, NULL, 0, 0, '2022-02-06 13:45:56', '2022-02-06 14:52:58'),
(24, '2022-01-07', '2022-01-08', NULL, NULL, 0, 0, NULL, 0, 0, '2022-02-07 09:53:29', '2022-02-08 22:48:42'),
(25, '2022-01-07', '2022-01-08', NULL, NULL, 0, 0, NULL, 0, 0, '2022-02-07 09:54:30', '2022-02-08 22:46:49'),
(26, '2022-01-07', '2022-01-08', NULL, 29, 0, 0, NULL, 0, 0, '2022-02-08 22:33:49', '2022-02-08 22:42:57'),
(27, '2022-01-07', '2022-01-08', NULL, 29, 0, 0, NULL, 0, 0, '2022-02-08 22:51:05', '2022-02-08 22:51:14'),
(35, '2022-03-06', '2022-03-08', 91, 45, 1, 0, NULL, 0, 0, '2022-03-06 20:44:10', NULL),
(36, '2022-03-07', '2022-03-08', 91, 69, 1, 0, NULL, 0, 0, '2022-03-06 20:44:40', NULL),
(37, '2022-03-02', '2022-03-04', 96, 30, 1, 0, NULL, 0, 0, '2022-03-06 20:44:58', NULL),
(38, '2022-03-02', '2022-03-04', 96, 30, 0, 0, NULL, 0, 0, '2022-03-06 21:05:59', '2022-03-06 21:45:31'),
(43, '2022-03-02', '2022-03-04', 96, 30, 0, 0, NULL, 0, 0, '2022-03-06 21:18:48', '2022-03-06 21:44:23'),
(44, '2022-03-02', '2022-03-04', 96, 30, 3, 0, NULL, 0, 0, '2022-03-06 23:04:20', NULL),
(45, '2022-03-08', '2022-03-09', 91, 29, 1, 0, NULL, 0, 0, '2022-03-07 00:09:42', NULL),
(46, '2022-03-07', '2022-03-08', 96, 31, 1, 0, NULL, 0, 0, '2022-03-07 00:24:17', NULL),
(47, '0000-00-00', '0000-00-00', 96, 30, 0, 0, NULL, 0, 0, '2022-03-07 09:48:48', NULL),
(48, '0000-00-00', '0000-00-00', 96, 31, 0, 0, NULL, 0, 0, '2022-03-07 09:49:11', NULL),
(49, '0000-00-00', '0000-00-00', 96, 31, 0, 0, NULL, 0, 0, '2022-03-07 09:50:07', NULL),
(50, '2022-03-07', '2022-03-08', 96, 31, 1, 0, NULL, 0, 0, '2022-03-07 10:01:22', NULL),
(51, '2022-03-07', '2022-03-08', 96, NULL, 1, 0, NULL, 0, 0, '2022-03-07 10:09:25', NULL),
(52, '2022-03-07', '2022-03-09', 96, NULL, 1, 0, NULL, 0, 0, '2022-03-07 10:10:11', NULL),
(53, '2022-03-08', '2022-03-10', 96, 29, 1, 0, NULL, 0, 0, '2022-03-07 10:13:47', NULL),
(54, '2022-03-07', '2022-03-08', 96, 31, 0, 0, NULL, 0, 0, '2022-03-07 10:59:53', NULL),
(55, '2022-03-08', '2022-03-09', 96, NULL, 1, 0, NULL, 0, 0, '2022-03-08 01:23:05', NULL),
(56, '2022-03-08', '2022-03-09', 96, 29, 1, 0, NULL, 0, 0, '2022-03-08 01:33:35', NULL),
(57, '2022-03-08', '2022-03-09', 96, 31, 1, 0, NULL, 0, 0, '2022-03-08 01:37:51', NULL),
(58, '2022-03-08', '2022-03-10', 96, 31, 1, 0, NULL, 0, 0, '2022-03-08 02:13:51', NULL),
(59, '2022-03-08', '2022-03-09', 96, 29, 1, 0, NULL, 0, 0, '2022-03-08 02:15:01', NULL),
(60, '2022-03-08', '2022-03-09', 96, 29, 1, 0, NULL, 0, 0, '2022-03-08 02:23:11', NULL),
(61, '2022-03-08', '2022-03-09', 96, NULL, 1, 0, NULL, 0, 0, '2022-03-08 02:30:26', NULL),
(62, '2022-03-08', '2022-03-10', 96, 31, 1, 0, NULL, 0, 0, '2022-03-08 02:32:18', NULL),
(63, '2022-03-08', '2022-03-09', 96, 30, 1, 0, NULL, 0, 0, '2022-03-08 02:38:15', NULL),
(64, '2022-03-08', '2022-03-09', 96, 45, 1, 0, NULL, 0, 0, '2022-03-08 02:42:45', NULL),
(65, '2022-03-08', '2022-03-09', 96, 45, 1, 0, NULL, 0, 0, '2022-03-08 02:43:05', NULL),
(66, '2022-03-08', '2022-03-10', 96, 45, 1, 0, NULL, 0, 0, '2022-03-08 02:58:22', NULL),
(67, '2022-03-08', '2022-03-09', 99, 44, 0, 0, NULL, 0, 0, '2022-03-08 10:02:05', NULL),
(68, '2022-03-08', '2022-03-09', 99, 41, 1, 0, NULL, 0, 0, '2022-03-08 10:02:54', NULL),
(69, '2022-03-08', '2022-03-09', 99, NULL, 1, 0, NULL, 0, 0, '2022-03-08 10:05:04', NULL),
(70, '2022-03-08', '2022-03-09', 99, 42, 0, 0, NULL, 0, 0, '2022-03-08 10:08:56', '2022-04-18 21:48:03'),
(71, '2022-03-08', '2022-03-09', 99, 41, 1, 0, NULL, 0, 0, '2022-03-08 10:17:21', NULL),
(72, '2022-03-08', '2022-03-10', 99, 42, 1, 0, NULL, 0, 0, '2022-03-08 11:34:08', NULL),
(73, '2022-03-08', '2022-03-09', 99, NULL, 1, 0, NULL, 0, 0, '2022-03-08 11:45:26', NULL),
(74, '2022-01-02', '2022-01-05', 88, 42, 2, 98758919, 2, 1, 300000, '2022-04-13 14:55:55', '2022-04-13 14:57:07'),
(75, '2022-01-02', '2022-01-05', 88, 42, 0, 9304871, 2, 1, 600000, '2022-04-18 21:49:20', '2022-04-26 20:53:57'),
(76, '2022-04-19', '2022-04-21', 103, 39, 2, 97217899, 3, 0, 1200000, '2022-04-19 23:49:28', NULL),
(77, '2022-04-20', '2022-04-20', 103, 40, 1, 96011199, 4, 0, 0, '2022-04-19 23:59:06', NULL),
(78, '2022-04-19', '2022-04-20', 103, 39, 1, 76594094, 5, 1, 300000, '2022-04-20 00:14:43', '2022-04-20 00:14:53'),
(79, '2022-01-02', '2022-01-05', 91, 42, 4, 91829612, 2, 0, 600000, '2022-04-24 20:49:42', NULL),
(80, '2022-01-02', '2022-01-05', 91, 39, 1, 50332025, 2, 0, 900000, '2022-04-25 23:14:15', NULL),
(81, '2022-01-02', '2022-01-05', 91, 39, 1, 82482124, 2, 0, 900000, '2022-04-25 23:18:14', NULL),
(82, '2022-04-25', '2022-04-27', 88, 46, 1, 1340542, 11, 1, 100000, '2022-04-25 23:18:47', '2022-04-26 20:56:50'),
(83, '2022-01-02', '2022-01-05', 91, 41, 1, 56035661, 2, 0, 150000, '2022-04-25 23:53:49', NULL),
(84, '2022-01-02', '2022-01-05', 91, 41, 1, 51476626, 2, 1, 150000, '2022-04-25 23:58:01', '2022-04-26 00:24:58'),
(85, '2022-04-25', '2022-04-26', 88, 69, 1, 6888009, 12, 1, 50000, '2022-04-25 23:59:44', '2022-04-26 21:55:10'),
(86, '2022-04-26', '2022-04-27', 88, 46, 1, 85451136, 13, 1, 50000, '2022-04-26 19:43:18', '2022-04-26 19:43:22'),
(87, '2022-04-26', '2022-04-27', 88, 44, 1, 12096928, 14, 1, 40000, '2022-04-26 21:55:55', '2022-04-26 22:29:59');

-- --------------------------------------------------------

--
-- Struktur dari tabel `location`
--

CREATE TABLE `location` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `location`
--

INSERT INTO `location` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Yogyakarta', '2022-04-13 14:22:07', NULL),
(2, 'Jakarta', '2022-04-13 14:22:07', NULL),
(3, 'Padang', '2022-04-13 14:22:14', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `idCard` int(16) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `contact` varchar(16) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `payment` enum('prepayment','pay at end','partial payment') DEFAULT NULL,
  `bookedCode` varchar(8) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `reservation`
--

INSERT INTO `reservation` (`id`, `idCard`, `name`, `lastName`, `contact`, `email`, `payment`, `bookedCode`, `createdAt`, `updatedAt`) VALUES
(1, 213123, 'Danang', 'firmantara', '120381203812', 'danang@mail.com', 'prepayment', 'asdasdaa', '2022-04-13 14:40:54', NULL),
(2, 1, 'sda', 'sd', 'sad', 'ssad', 'pay at end', 'G2RBGQI6', '2022-04-13 14:55:30', NULL),
(3, NULL, NULL, NULL, NULL, NULL, NULL, 'E5RIJBUM', '2022-04-19 23:47:08', NULL),
(4, NULL, NULL, NULL, NULL, NULL, 'prepayment', 'VTRKSE6O', '2022-04-19 23:59:03', NULL),
(5, NULL, NULL, NULL, NULL, NULL, NULL, 'VO3XL6OX', '2022-04-20 00:14:38', NULL),
(6, NULL, 'sda', 'sd', 'sad', 'ssad', 'pay at end', 'GK9WW0HO', '2022-04-24 20:44:42', NULL),
(7, NULL, 'Danang', 'Firmantara', '082138321234', 'danang@gmail.com', 'prepayment', 'Z4HO7LOA', '2022-04-25 23:01:12', NULL),
(8, NULL, 'Danang', 'Firmantara', '082138321234', 'danang@gmail.com', 'prepayment', 'GRKLCNKZ', '2022-04-25 23:10:33', NULL),
(9, NULL, 'sda', 'sd', 'sad', 'ssad', 'pay at end', 'EHE7UDB4', '2022-04-25 23:11:45', NULL),
(10, NULL, 'sda', 'sd', 'sad', 'ssad', 'pay at end', '7H0VUUVU', '2022-04-25 23:13:13', NULL),
(11, NULL, 'Danang', 'Firmantara', '082138321234', 'danang@gmail.com', 'prepayment', 'XYZ8K8US', '2022-04-25 23:18:46', NULL),
(12, NULL, 'Danang', 'Firmantara', '082138321234', 'danang@gmail.com', 'prepayment', 'IX3NV3RT', '2022-04-25 23:59:44', NULL),
(13, NULL, 'Danang', 'Firmantara', '082138321234', 'danang@gmail.com', 'prepayment', '2K2YHZK7', '2022-04-26 19:43:18', NULL),
(14, NULL, 'Danang', 'Firmantara', '082138321234', 'danang@gmail.com', 'prepayment', '03HAWIFF', '2022-04-26 21:55:55', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(80) NOT NULL,
  `role` enum('Admin','User') NOT NULL DEFAULT 'User',
  `email` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `password` varchar(80) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `displayName` varchar(255) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `image` text DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `role`, `email`, `contact`, `password`, `fullName`, `gender`, `address`, `displayName`, `birthDate`, `image`, `createdAt`, `updatedAt`) VALUES
(85, 'hamdi', 'User', 'hamdi@gmail.com', '082398767584', '$2b$10$1a87N11JZJx.C73VidOfNOjqXkFZMo3Lbwlqhc1Ksja3rUQCqLZja', NULL, NULL, NULL, NULL, NULL, NULL, '2022-02-13 01:28:26', '2022-02-14 00:06:48'),
(86, 'asgigih', 'User', 'gigih@gmail.com', '087627361711', '$2b$10$jUW5O1vum8NfHIjR5sUp4OB8OcxjMzTNHuQdnYRW9J8HcwC2AgsmK', NULL, NULL, NULL, NULL, NULL, NULL, '2022-02-13 01:29:19', NULL),
(88, 'danang', 'User', 'danang@gmail.com', '082138321234', '$2b$10$FgsIgBOQPOeVTHyVISYrzONjX2cjlrBeMSrdal2wKN9fAEksbs0c6', 'Danang Firmantara', 'Male', 'Padang', 'Danang', '1999-05-09', 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1650998347/backendBeginner/uploads/users/users-1650998338059.png', '2022-02-13 01:32:21', '2022-04-27 01:40:21'),
(91, 'admin', 'Admin', 'bevad56184@ishop2k.com', '081237844675', '$2b$10$wCIQq83SEkqqmm6fNusboOhFp7PX.9JSqtn.dNJoGpIcDCBCVfxs2', NULL, 'Male', 'bandung', 'Admin', '1999-02-15', NULL, '2022-03-01 19:26:31', '2022-04-13 14:34:42'),
(95, 'dinda', 'User', 'dinda@gmail.com', NULL, '$2b$10$Xn56FWUmDwTZqBP5nIJjveO/oRoNE.UkEn9hKOg5llCyWlQpQjAHO', NULL, NULL, NULL, NULL, NULL, NULL, '2022-03-05 11:57:42', NULL),
(96, 'fajri', 'User', 'fajri@mail.com', '087898439385', '$2b$10$5G8U4okEmILCDAJUHEQ1q.MXuvNMOYZv6QadGp1XBPOURjZ7dGQdC', 'Fajri Azyumardi Tara', 'Male', 'Padang', NULL, NULL, NULL, '2022-03-05 13:08:36', '2022-03-08 01:21:38'),
(97, 'putri', 'User', 'putri@mail.com', NULL, '$2b$10$HggkoXlyvl4wJztX8A34KOgqiixndj0hpkgXeZo771D4t3jiKuAY2', NULL, NULL, NULL, NULL, NULL, NULL, '2022-03-05 13:25:36', NULL),
(98, 'joni', 'User', 'joni@mail.com', NULL, '$2b$10$cSZ8MVqdmdTbBNDwymlSYenSh8TrNYbobRM4Ut7MmKI4FuaEkwHHy', NULL, NULL, NULL, NULL, NULL, NULL, '2022-03-05 13:31:49', NULL),
(99, 'raka', 'User', 'vesewo4643@ketchet.com', '081231237522', '$2b$10$kBUhW9KFenImIZWUo2zPFeKNAS4Fe8/bOcpJqeWpBEJX0f1KsS11G', 'raka ', NULL, NULL, 'Raka Muhfi', NULL, NULL, '2022-03-07 14:39:04', '2022-03-08 11:37:07'),
(100, 'andi', 'User', 'andi@mail.com', NULL, '$2b$10$XVLYt3S5LlPosocKFh.gR.zt3LOKn4iLRNEKeCuPyueBsKfLqkdJq', 'Andi Renaldi', NULL, NULL, 'Andi Renaldi Noviaz', NULL, NULL, '2022-03-07 14:39:54', '2022-03-07 18:14:16'),
(101, 'muhfi', 'User', 'muhfi@mail.com', NULL, '$2b$10$GtY7Hx84s9l4nbMPQ.FeB.werG3xaMrR7q8p9qh31iJ9Ws70usxKq', NULL, NULL, NULL, NULL, NULL, NULL, '2022-03-07 14:44:14', NULL),
(102, 'danang12', 'User', 'danang12@mail.com', NULL, '$2b$10$K94sLr63slJwWPYarFkdGeaNPROT9B1gbfK1wBzW.Do2LixJKddC6', NULL, NULL, NULL, NULL, NULL, NULL, '2022-03-08 11:29:34', NULL),
(103, 'danang837', 'User', 'danang12@gmail.com', NULL, '$2b$10$QTBbT0pfLtf3wKsRtZTrw.8pBMHOJY4TrVJyB8bWbN77sjsrDRydC', NULL, NULL, NULL, NULL, NULL, NULL, '2022-04-19 23:17:57', NULL),
(106, 'wehomik', 'User', 'wehomik837@gmail.com', NULL, '$2b$10$OmKklnbIDz0sdm/GsnEqM.D8UnweuXdxzaf3OcnT/VvAYZYvtquv6', NULL, NULL, NULL, NULL, NULL, NULL, '2022-04-23 17:07:41', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `idCategory` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `idLocation` int(11) DEFAULT NULL,
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

INSERT INTO `vehicles` (`id`, `idCategory`, `name`, `idLocation`, `description`, `price`, `status`, `stock`, `image`, `createdAt`, `updatedAt`) VALUES
(21, 3, 'Fixie', 3, 'Up to 1 Person, return before 4 PM', 20000, 'Available', 4, 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1649860470/backendBeginner/uploads/vehicles/vehicles-1649860414480.png', '2022-02-01 21:15:39', '2022-04-13 21:34:29'),
(29, 1, 'Toyota vellfire', 1, 'Up to 5 Person, return before 4 PM', 400000, 'full booked', 0, 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1649860631/backendBeginner/uploads/vehicles/vehicles-1649860610206.png', '2022-02-01 22:38:41', '2022-04-13 21:37:09'),
(30, 1, 'Toyota alphard', 1, 'Up to 5 Person, return before 4 PM', 400000, 'full booked', 0, 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1650729553/backendBeginner/uploads/vehicles/vehicles-1650729531025.png', '2022-02-01 23:09:57', '2022-04-23 22:59:03'),
(31, 1, 'Toyota Fortuner', 1, 'Up to 5 adult, return before 4 PM', 400000, 'full booked', 0, 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1650729580/backendBeginner/uploads/vehicles/vehicles-1650729566957.png', '2022-02-03 20:12:32', '2022-04-23 22:59:29'),
(32, 1, 'Toyota Fortuner', 2, 'Up to 5 adult, return before 4 PM', 400000, 'Available', 5, 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1649860761/backendBeginner/uploads/vehicles/vehicles-1649860754481.png', '2022-02-03 20:16:38', '2022-04-13 21:39:19'),
(33, 1, 'Toyota Fortuner', 3, 'Up to 5 adult, return before 4 PM', 400000, 'Available', 5, 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1649860778/backendBeginner/uploads/vehicles/vehicles-1649860766067.png', '2022-02-03 20:16:45', '2022-04-13 21:39:36'),
(34, 1, 'Toyota Alphard', 2, 'Up to 5 Person, return before 4 PM', 400000, 'Available', 5, 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1649860816/backendBeginner/uploads/vehicles/vehicles-1649860804828.png', '2022-02-03 20:18:03', '2022-04-13 21:40:14'),
(37, 1, 'Honda brio', 1, 'Up to 4 adult, return before 4 PM', 300000, 'Available', 5, 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1649860869/backendBeginner/uploads/vehicles/vehicles-1649860861204.png', '2022-02-07 08:41:34', '2022-04-13 21:41:07'),
(38, 1, 'Honda Jazz', 1, 'Up to 4 adult, return before 4 PM', 350000, 'Available', 5, 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1649860901/backendBeginner/uploads/vehicles/vehicles-1649860892887.png', '2022-02-07 08:42:02', '2022-04-13 21:41:39'),
(39, 1, 'Daihatsu Xenia', 1, 'Up to 4 adult, return before 4 PM', 300000, 'full booked', 0, 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1649860978/backendBeginner/uploads/vehicles/vehicles-1649860934514.png', '2022-02-07 08:42:32', '2022-04-25 23:18:14'),
(40, 3, 'Fixie 2', 1, 'Up to 1 adult, return before 4 PM', 45000, 'Available', 2, 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1649861034/backendBeginner/uploads/vehicles/vehicles-1649860982880.png', '2022-02-07 08:43:37', '2022-04-19 23:59:06'),
(41, 3, 'Family Bike', 1, 'Up to 1 adult, return before 4 PM', 50000, 'Available', 1, 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1649861375/backendBeginner/uploads/vehicles/vehicles-1649861260608.png', '2022-02-07 08:47:55', '2022-04-25 23:58:01'),
(42, 3, 'Family Bike', 1, 'Up to 2 adult, return before 4 PM', 50000, 'full booked', 0, 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1649861357/backendBeginner/uploads/vehicles/vehicles-1649861284854.png', '2022-02-07 08:48:47', '2022-04-24 20:49:42'),
(44, 2, 'Honda Beat Street', 1, 'Up to 2 Person, return before 4 PM', 40000, 'Available', 3, 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1649861417/backendBeginner/uploads/vehicles/vehicles-1649861408765.png', '2022-02-07 08:58:44', '2022-04-26 21:55:55'),
(45, 2, 'Honda Scoopy', 1, 'Up to 2 adult, return before 4 PM', 50000, 'full booked', 0, 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1649861467/backendBeginner/uploads/vehicles/vehicles-1649861453392.png', '2022-02-07 08:59:42', '2022-04-13 21:51:05'),
(46, 2, 'Honda Vario 125', 1, 'Up to 2 adult, return before 4 PM', 50000, 'Available', 2, 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1649861618/backendBeginner/uploads/vehicles/vehicles-1649861539517.png', '2022-02-07 09:00:52', '2022-04-26 19:43:18'),
(48, 1, 'Honda Jazz', 2, 'Up to 4 adult, return before 4 PM', 500000, 'Available', 4, 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1649861793/backendBeginner/uploads/vehicles/vehicles-1649861688618.png', '2022-02-08 20:24:11', '2022-04-13 21:57:20'),
(49, 1, 'Honda Brio', 2, 'Up to 4 adult, return before 4 PM', 300000, 'Available', 4, 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1649861872/backendBeginner/uploads/vehicles/vehicles-1649861851152.png', '2022-02-08 21:19:06', '2022-04-13 21:57:50'),
(69, 2, 'Yamaha Nmax', 1, 'Up to 2 adult, return before 4 PM', 50000, 'Available', 2, 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1649861913/backendBeginner/uploads/vehicles/vehicles-1649861906184.png', '2022-02-12 23:28:02', '2022-04-25 23:59:44'),
(71, 2, 'Yamaha Vixion R', 1, 'Up to 2 adult, return before 4 PM', 50000, 'Available', 4, 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1649861950/backendBeginner/uploads/vehicles/vehicles-1649861943213.png', '2022-02-14 23:06:05', '2022-04-13 21:59:09'),
(72, 2, 'Honda Jazz new', 1, NULL, 300000, 'Available', 5, 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1649949468/backendBeginner/uploads/vehicles/vehicles-1649949453228.png', '2022-04-14 22:17:49', '2022-04-14 22:25:23'),
(73, 2, 'Yamaha Thunder', 1, 'pick 2 person', 50000, 'Available', 3, 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1649957945/backendBeginner/uploads/vehicles/vehicles-1649957883610.png', '2022-04-15 00:39:05', NULL),
(74, 1, 'Truck', 1, 'Asd', 500000, 'Available', 5, 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1650030827/backendBeginner/uploads/vehicles/vehicles-1650030815308.png', '2022-04-15 20:53:45', NULL),
(75, 1, 'Mobilio', 1, 'you can pick 4 person', 300000, 'Full Booked', 0, 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1650031013/backendBeginner/uploads/vehicles/vehicles-1650031005404.png', '2022-04-15 20:56:52', NULL),
(76, 1, 'Truck 2', 1, 'asd', 500000, 'Available', 3, 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1650031253/backendBeginner/uploads/vehicles/vehicles-1650031236758.png', '2022-04-15 21:00:52', NULL),
(77, 1, 'Truck 3', 1, 'you can pick your family with this truck', 500000, 'Available', 1, 'https://res.cloudinary.com/dwvnlxymb/image/upload/v1650032939/backendBeginner/uploads/vehicles/vehicles-1650032933226.png', '2022-04-15 21:28:58', NULL);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

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
  ADD KEY `vehicleId` (`vehicleId`),
  ADD KEY `idReservation` (`idReservation`);

--
-- Indeks untuk tabel `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `reservation`
--
ALTER TABLE `reservation`
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
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCategory` (`idCategory`,`idLocation`),
  ADD KEY `idLocation` (`idLocation`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `forgot_request`
--
ALTER TABLE `forgot_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT untuk tabel `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT untuk tabel `location`
--
ALTER TABLE `location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT untuk tabel `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

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
  ADD CONSTRAINT `histories_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `histories_ibfk_3` FOREIGN KEY (`idReservation`) REFERENCES `reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`idCategory`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vehicles_ibfk_2` FOREIGN KEY (`idLocation`) REFERENCES `location` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

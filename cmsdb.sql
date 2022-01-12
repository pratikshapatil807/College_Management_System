-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2021 at 07:59 AM
-- Server version: 8.0.23
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cmsdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE `auth` (
  `id` int NOT NULL,
  `userName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `contactNumber` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `secretKey` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='auth';

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`id`, `userName`, `contactNumber`, `email`, `role`, `password`, `secretKey`, `created_at`) VALUES
(20, 'Alex', '1234567892', 'jhon@gmail.com', 'Teacher', '$2a$10$n1vjHSlyZG7Vm4gEI7ndnOKDQVb/rL2e10BpGbQ4F4PkLPWrc1392', 'ZWkdX', '2021-06-18 15:47:15'),
(21, 'Maxx', '1234567892', 'max234@gmail.com', 'Instructor', '$2a$10$kBZpOXLddnbNmLoJUzLRwe2JygANTk8JouC1O1e.zbb3bzWT58WmG', 'sbSJf', '2021-06-18 15:48:37'),
(32, 'Robert', '1234567892', 'robert@gmail.com', 'Student', '$2a$10$vc3jkVglqYZN0lZGJ7ZQMu3lA5jFpa8aM3cnu1K7PagBz6MuzR1nq', 'm1gqx', '2021-06-19 05:26:32');

-- --------------------------------------------------------

--
-- Table structure for table `classmanagement`
--

CREATE TABLE `classmanagement` (
  `class_id` int NOT NULL,
  `instructorName` varchar(100) NOT NULL,
  `className` varchar(100) NOT NULL,
  `classDate` varchar(100) NOT NULL,
  `startTime` varchar(100) NOT NULL,
  `endTime` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `classmanagement`
--

INSERT INTO `classmanagement` (`class_id`, `instructorName`, `className`, `classDate`, `startTime`, `endTime`, `created_at`) VALUES
(4, 'alex', 'Science', '22/09/2020', '10am', '2pm', '2021-06-17 17:39:41'),
(6, '', 'English', '22/09/2020', '10am', '2pm', '2021-06-18 17:27:10'),
(7, '', 'Kannada', '22/09/2020', '10am', '2pm', '2021-06-18 17:41:32'),
(8, '', 'Social', '22/09/2020', '10am', '2pm', '2021-06-19 02:18:07'),
(10, 'Robert', 'CSE', '22/09/2020', '10am', '2pm', '2021-06-19 05:33:55');

-- --------------------------------------------------------

--
-- Table structure for table `studentregister`
--

CREATE TABLE `studentregister` (
  `student_id` int NOT NULL,
  `rollNo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `studentName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `instructorName` varchar(100) NOT NULL,
  `className` varchar(100) NOT NULL,
  `classDate` varchar(100) NOT NULL,
  `startTime` varchar(100) NOT NULL,
  `endTime` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `studentregister`
--

INSERT INTO `studentregister` (`student_id`, `rollNo`, `studentName`, `instructorName`, `className`, `classDate`, `startTime`, `endTime`, `created_at`) VALUES
(6, '20', 'Vinod', '', 'Science', '22/09/2020', '10am', '2pm', '2021-06-19 04:52:16'),
(7, '22', 'Nandi', 'alex', 'Science', '22/09/2020', '10am', '2pm', '2021-06-19 04:53:08'),
(8, '27', 'Sarvesh', 'Robert', 'Science', '22/09/2020', '10am', '2pm', '2021-06-19 05:30:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `classmanagement`
--
ALTER TABLE `classmanagement`
  ADD PRIMARY KEY (`class_id`);

--
-- Indexes for table `studentregister`
--
ALTER TABLE `studentregister`
  ADD PRIMARY KEY (`student_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth`
--
ALTER TABLE `auth`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `classmanagement`
--
ALTER TABLE `classmanagement`
  MODIFY `class_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `studentregister`
--
ALTER TABLE `studentregister`
  MODIFY `student_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

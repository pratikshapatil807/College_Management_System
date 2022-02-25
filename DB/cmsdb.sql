-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 25, 2022 at 11:13 AM
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
-- Table structure for table `adminauth`
--

CREATE TABLE `adminauth` (
  `id` int NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `adminauth`
--

INSERT INTO `adminauth` (`id`, `email`, `password`) VALUES
(1, 'admin@gmail.com', '12345');

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE `auth` (
  `id` int NOT NULL,
  `profile` varchar(200) NOT NULL,
  `emp_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `facultyName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `contactNumber` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `salary` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `subject` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='auth';

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`id`, `profile`, `emp_id`, `facultyName`, `contactNumber`, `email`, `salary`, `password`, `subject`, `created_at`) VALUES
(60, '', 'EMP-a7', 'Vinod ', '1234567892', 'Vinodab@gmail.com', '15000', '$2a$10$a5p0AkWZkGB/NCMP02nEFu40BTPbhhUW2CwrcGCy6I88aVFDA0Hb6', 'oops', '2022-02-15 08:22:24'),
(62, '', 'EMP-b9', 'Kartik', '1234567892', 'kartik@gmail.com', '20000', '$2a$10$x/38ecxVIn9pXaodgtDOD.kwTNZ.bk4DRLYRIrSD.lesodi2tSQJO', 'Java', '2022-02-15 12:22:00'),
(71, 'http://localhost:5000/upload\\images\\profile_1645600768458.jpg', 'EMP-ac', 'Kartik', '1234567892', 'ppratiksha885@gmail.com', '20000', '$2a$10$.lZE3bolZfITsomfHRY7COc1phAgmKm1gJ.xn85/efkEYqoVw5GsC', 'Java', '2022-02-23 07:19:28');

-- --------------------------------------------------------

--
-- Table structure for table `classmanagement`
--

CREATE TABLE `classmanagement` (
  `class_id` int NOT NULL,
  `emp_id` varchar(50) NOT NULL,
  `student_id` varchar(100) NOT NULL,
  `facultyName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `studentName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `subject` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `startDate` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `endDate` varchar(100) NOT NULL,
  `startTime` varchar(100) NOT NULL,
  `endTime` varchar(100) NOT NULL,
  `days` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `classmanagement`
--

INSERT INTO `classmanagement` (`class_id`, `emp_id`, `student_id`, `facultyName`, `studentName`, `subject`, `startDate`, `endDate`, `startTime`, `endTime`, `days`, `created_at`) VALUES
(63, 'EMP-a7', 'STU-68', 'vinod', 'pratiksha v', 'java', '22/09/2020', '25/09/2020', '10am', '2pm', 'monday', '2022-02-23 06:58:02');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `id` int NOT NULL,
  `eventName` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `eventName`, `description`, `date`) VALUES
(4, 'Annual Function', 'School Year Function', '21/09/2020');

-- --------------------------------------------------------

--
-- Table structure for table `holiday`
--

CREATE TABLE `holiday` (
  `id` int NOT NULL,
  `reason` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `holiday`
--

INSERT INTO `holiday` (`id`, `reason`, `date`) VALUES
(4, 'Ghandhi_Jayanti', '2-10-2020');

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `notes` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `title`, `description`, `notes`) VALUES
(1, 'Notes', 'This is notes', 'http://localhost:5000/upload\\images\\notes_1645602103033.pdf'),
(3, 'Notes 3', 'This is notes 3', 'http://localhost:5000/upload\\images\\notes_1645603495235.pdf'),
(4, 'Notes 3', 'This is notes 3', 'http://localhost:5000/upload\\images\\notes_1645622117016.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `studentauth`
--

CREATE TABLE `studentauth` (
  `id` int NOT NULL,
  `profile` varchar(200) NOT NULL,
  `student_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `studentName` varchar(100) NOT NULL,
  `contactNumber` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `studentauth`
--

INSERT INTO `studentauth` (`id`, `profile`, `student_id`, `studentName`, `contactNumber`, `email`, `password`, `subject`, `created_at`) VALUES
(6, '', 'STU-68', 'pratiksha v ', '1234567892', 'pratiksha@gmail.com', '$2a$10$/OQ/wdVSz9mqiRsUErnPO.DbLGhYUYo.DZ7bMYDa7QXQsCqTxsymC', 'oops', NULL),
(8, '', 'STU-b8', 'Rakesh', '1234567892', 'rakesh@gmail.com', '$2a$10$aB/xQO83h3enJkL9z9nZo.14iEWi8ixSX1xUig6hlHfL9eQxuUqPu', 'java', NULL),
(13, 'http://localhost:5000/upload\\images\\profile_1645601027511.jpg', 'STU-2d', 'Rakesh', '1234567892', 'ppratiksha885@gmail.com', '$2a$10$j7NGPO9ysf7Cg/gkcG.kG.x/ZU97XTMcGGvDlXfUmWMBz7mJWWgu.', 'java', NULL);

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
-- Indexes for dumped tables
--

--
-- Indexes for table `adminauth`
--
ALTER TABLE `adminauth`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `holiday`
--
ALTER TABLE `holiday`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `studentauth`
--
ALTER TABLE `studentauth`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `studentregister`
--
ALTER TABLE `studentregister`
  ADD PRIMARY KEY (`student_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adminauth`
--
ALTER TABLE `adminauth`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `auth`
--
ALTER TABLE `auth`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `classmanagement`
--
ALTER TABLE `classmanagement`
  MODIFY `class_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `holiday`
--
ALTER TABLE `holiday`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `studentauth`
--
ALTER TABLE `studentauth`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `studentregister`
--
ALTER TABLE `studentregister`
  MODIFY `student_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

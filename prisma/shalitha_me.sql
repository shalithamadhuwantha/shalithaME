-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 15, 2025 at 08:10 PM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shalitha_me`
--

-- --------------------------------------------------------

--
-- Table structure for table `cert`
--

DROP TABLE IF EXISTS `cert`;
CREATE TABLE IF NOT EXISTS `cert` (
  `id` int NOT NULL AUTO_INCREMENT,
  `certname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `issuedate` date NOT NULL,
  `veryfyid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tag` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `visibility` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cert`
--

INSERT INTO `cert` (`id`, `certname`, `company`, `issuedate`, `veryfyid`, `img`, `tag`, `visibility`) VALUES
(1, 'sd', 'sd', '2025-07-16', 'asd', '/assets/img/certlogo/mlsa.webp', 'asd', 1),
(2, 'sd', 'sd', '2025-07-16', 'asd', '/assets/img/certlogo/mlsa.webp', 'asd', 1),
(3, 'sd', 'sd', '2025-07-16', 'asd', '/assets/img/certlogo/mlsa.webp', 'asd', 1),
(4, 'sd', 'sd', '2025-07-16', 'asd', '/assets/img/certlogo/mlsa.webp', 'asd', 1),
(5, 'sd', 'sd', '2025-07-16', 'asd', '/assets/img/certlogo/mlsa.webp', 'asd', 1),
(6, 'sd', 'sd', '2025-07-16', 'asd', '/assets/img/certlogo/mlsa.webp', 'asd', 1),
(7, 'sd', 'sd', '2025-07-16', 'asd', '/assets/img/certlogo/mlsa.webp', 'asd', 1);

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
CREATE TABLE IF NOT EXISTS `profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  `visibility` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`id`, `name`, `content`, `visibility`) VALUES
(1, 'bio', 'BICT(Hons)UG RUSL | Dip. Cyber Sec (ABE UK) | Cyber Security Enthusiast | MLSA β | CNSP | CAP | AZ-900 | THM Top 8%', 1),
(2, 'spotlight', '2\n3', 1),
(3, 'skills', 's >> (20)', 1);

-- --------------------------------------------------------

--
-- Table structure for table `work`
--

DROP TABLE IF EXISTS `work`;
CREATE TABLE IF NOT EXISTS `work` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `working_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start` date NOT NULL,
  `end` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discription` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` longblob NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `work`
--

INSERT INTO `work` (`id`, `company`, `position`, `working_type`, `start`, `end`, `address`, `discription`, `img`) VALUES
(1, 'asd', 'sad', 'asd', '2025-07-16', 'asd', 'asd', 'sad', '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

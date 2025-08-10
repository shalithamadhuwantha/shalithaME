-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 09, 2025 at 12:51 PM
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
-- Table structure for table `about`
--

DROP TABLE IF EXISTS `about`;
CREATE TABLE IF NOT EXISTS `about` (
  `id` int NOT NULL AUTO_INCREMENT,
  `controler` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `visibility` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `about`
--

INSERT INTO `about` (`id`, `controler`, `data`, `visibility`) VALUES
(1, 'me', '<p>\r\n        Hello! I\'m\r\n        <a href=\"https://shalitha.me\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-custom-heading\">\r\n            Shalitha Madhuwantha\r\n        </a>, a student at Rajarata University of Sri Lanka, residing in the\r\n        beautiful country of Sri Lanka. My interests include technology,\r\n        cybersecurity, programming, and education, all integral to my life\r\n        and career.\r\n    </p>\r\n    \r\n    <p>\r\n        My ICT journey began in 2020, but my fascination with electronics\r\n        and robotics dates back to 2015. Over the years, I\'ve developed a\r\n        deep understanding of technologies like Arduino, NodeMCU, and\r\n        Raspberry Pi, which laid a strong foundation for my ICT\r\n        endeavors.\r\n    </p>\r\n    \r\n    <p>\r\n        Exploring various ICT fields, I gained comprehensive knowledge in\r\n        mobile and desktop app development, web development, server-side\r\n        management, networking (CCNA level), and cybersecurity. Network\r\n        security emerged as my true passion and envisioned career path.\r\n    </p>\r\n    \r\n    <p>\r\n        In 2020, I created my first mod app, followed by a viral modded\r\n        version of WhatsApp, showcasing my skills and innovation. You can\r\n        explore my earlier works on\r\n        <a href=\"https://smgtechcom.blogspot.com/2020/08/smg-mod-whatsapp.html?m=1\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-custom-heading\">\r\n            my blog\r\n        </a>.\r\n    </p>\r\n    \r\n    <p>\r\n        As a student in the Bachelor of Information and Communication\r\n        Technology (Honors) program at Rajarata University, I constantly\r\n        hone my skills and expand my knowledge. My involvement in projects\r\n        has enriched my practical understanding and application of ICT.\r\n    </p>\r\n<br />\r\n          <b class=\"block text-sm sm:text-base\">\r\n            Research Interests : Cyber Security , Exploit Development , Network\r\n            Security , Reverse Engineering\r\n          </b>', 1),
(2, 'Highlights', '[\n  {\n    \"title\": \"MS Club First Chairperson\",\n    \"description\": \"Founded and served as the first chairperson of Microsoft Student Club at RUSL\",\n    \"year\": \"2023\"\n  },\n  {\n    \"title\": \"Club Opener at RUSL\",\n    \"description\": \"Established and launched the technology club at Rajarata University of Sri Lanka\",\n    \"year\": \"2023\"\n  },\n  {\n    \"title\": \"Gold Microsoft Student Ambassador\",\n    \"description\": \"Achieved Gold level certification as Microsoft Student Ambassador\",\n    \"year\": \"2024\"\n  },\n  {\n    \"title\": \"Viral WhatsApp Mod Creator\",\n    \"description\": \"Created a viral modded version of WhatsApp that gained widespread recognition\",\n    \"year\": \"2020\"\n  }\n]\n', 1);

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `access` tinyint(1) NOT NULL,
  `joindate` datetime NOT NULL,
  `lastlogin` datetime NOT NULL,
  `lastlogindevicemeta` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `access`, `joindate`, `lastlogin`, `lastlogindevicemeta`) VALUES
(1, 'bbsmgamage@gmail.com', 1, '2025-07-26 17:54:23', '2025-08-09 12:31:12', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36');

-- --------------------------------------------------------

--
-- Table structure for table `cert`
--

DROP TABLE IF EXISTS `cert`;
CREATE TABLE IF NOT EXISTS `cert` (
  `id` int NOT NULL AUTO_INCREMENT,
  `certname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `issuedate` date NOT NULL,
  `veryfyid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `visibility` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cert`
--

INSERT INTO `cert` (`id`, `certname`, `company`, `issuedate`, `veryfyid`, `img`, `tag`, `visibility`) VALUES
(9, 'sdf', 'sdf', '0005-12-02', 'dsf', '/api/settings/img/out/assets/img/certlogo/fuck.jpg', 'no', 1),
(8, 'test', 'sdf', '2025-12-25', 'afsd', '/api/settings/img/out/assets/img/certlogo/ddf.png', 'dsf,df,', 1),
(6, 'sd', 'sd', '2025-07-16', 'asd', '/assets/img/certlogo/mlsa.webp', 'asd', 1),
(7, 'sd', 'sd', '2025-07-16', 'asd', '/assets/img/certlogo/mlsa.webp', 'asd', 1),
(11, 'sdg', 'dfg', '2025-05-12', 'fdg', '/api/settings/img/out/assets/img/certlogo/udemy.webp', 'fdg,dg,dg,dfg', 1),
(12, 'dfg', 'dsfg', '2222-05-08', 'dfgdfgfg', '/api/settings/img/out/assets/img/certlogo/test', 'gfgdfg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
CREATE TABLE IF NOT EXISTS `profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `visibility` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`id`, `name`, `content`, `visibility`) VALUES
(1, 'bio', 'BICT(Hons)UG RUSL | Dip. Cyber Sec (ABE UK) | Cyber Security Enthusiast | MLSA β | CNSP | CAP | AZ-900 | THM Top 8% ', 1),
(2, 'spotlight', 'Cub Scout Gold Medal\n2017 Karate Western Province Player\n2023 Manthra CTF Top 20 winning team Captain of webernetco (representing RUSL)\nMicorsoft Student Ambesodor Beta Member 2024\nDeputy Head Prefect 2017 (HMV)	\nTop 1% in Try Hack Me 2022', 1),
(3, 'skills', 's >> (20)\nsd >> (30)', 1);

-- --------------------------------------------------------

--
-- Table structure for table `thoughts`
--

DROP TABLE IF EXISTS `thoughts`;
CREATE TABLE IF NOT EXISTS `thoughts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date NOT NULL,
  `type` enum('main','project','thought') COLLATE utf8mb4_unicode_ci NOT NULL,
  `visibility` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `thoughts`
--

INSERT INTO `thoughts` (`id`, `title`, `description`, `image`, `link`, `date`, `type`, `visibility`) VALUES
(1, 'sdfsdf', 'fffssdfsddsfdsdssdsdfdsfdsfds', 'https://avatars.githubusercontent.com/u/78067281?v=4?s=400', 'https://avatars.githubusercontent.com/u/78067281?v=4?s=400', '2025-08-21', 'project', 1),
(2, 'dfsdf', 'fffssdfsddsfdsdssdsdfdsfdsfds', 'https://avatars.githubusercontent.com/u/78067281?v=4?s=400', 'https://avatars.githubusercontent.com/u/78067281?v=4?s=400', '2025-08-21', 'project', 1),
(3, 'eeerf', 'fffssdfsddsfdsdssdsdfdsfdsfds', 'https://avatars.githubusercontent.com/u/78067281?v=4?s=400', 'https://avatars.githubusercontent.com/u/78067281?v=4?s=400', '2025-08-21', 'project', 1),
(4, 'dfsdf', 'fffssdfsddsfdsdssdsdfdsfdsfds', 'https://avatars.githubusercontent.com/u/78067281?v=4?s=400', 'https://avatars.githubusercontent.com/u/78067281?v=4?s=400', '2025-08-21', 'project', 1),
(5, 'dfsdf', 'fffssdfsddsfdsdssdsdfdsfdsfds', 'https://avatars.githubusercontent.com/u/78067281?v=4?s=400', 'https://avatars.githubusercontent.com/u/78067281?v=4?s=400', '2025-08-21', 'project', 1),
(6, 'dfsdf', 'fffssdfsddsfdsdssdsdfdsfdsfds', 'https://avatars.githubusercontent.com/u/78067281?v=4?s=400', 'https://avatars.githubusercontent.com/u/78067281?v=4?s=400', '2025-08-21', 'project', 1),
(7, 'sdfsdf', 'fffssdfsddsfdsdssdsdfdsfdsfds', 'https://avatars.githubusercontent.com/u/78067281?v=4?s=400', 'https://avatars.githubusercontent.com/u/78067281?v=4?s=400', '2025-08-21', 'project', 1),
(8, 'sdfsdf', 'fffssdfsddsfdsdssdsdfdsfdsfds', 'https://avatars.githubusercontent.com/u/78067281?v=4?s=400', 'https://avatars.githubusercontent.com/u/78067281?v=4?s=400', '2025-08-21', 'project', 1),
(9, 'sdfsdf', 'fffssdfsddsfdsdssdsdfdsfdsfds', 'https://avatars.githubusercontent.com/u/78067281?v=4?s=400', 'https://avatars.githubusercontent.com/u/78067281?v=4?s=400', '2025-08-21', 'project', 1),
(10, 'dfsdf', 'fffssdfsddsfdsdssdsdfdsfdsfds', 'https://avatars.githubusercontent.com/u/78067281?v=4?s=400', 'https://avatars.githubusercontent.com/u/78067281?v=4?s=400', '2025-08-21', 'project', 1),
(11, 'sdfsdf', 'fffssdfsddsfdsdssdsdfdsfdsfds', 'https://avatars.githubusercontent.com/u/78067281?v=4?s=400', 'https://avatars.githubusercontent.com/u/78067281?v=4?s=400', '2025-08-21', 'project', 1),
(12, 'dfsdf', 'fffssdfsddsfdsdssdsdfdsfdsfds', 'https://avatars.githubusercontent.com/u/78067281?v=4?s=400', 'https://avatars.githubusercontent.com/u/78067281?v=4?s=400', '2025-08-21', 'project', 1),
(13, 'dfsdf', 'fffssdfsddsfdsdssdsdfdsfdsfds', 'https://avatars.githubusercontent.com/u/78067281?v=4?s=400', 'https://avatars.githubusercontent.com/u/78067281?v=4?s=400', '2025-08-21', 'project', 1);

-- --------------------------------------------------------

--
-- Table structure for table `work`
--

DROP TABLE IF EXISTS `work`;
CREATE TABLE IF NOT EXISTS `work` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `working_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start` date NOT NULL,
  `end` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `discription` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
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

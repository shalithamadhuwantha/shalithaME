-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 10, 2025 at 12:27 PM
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
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `about`
--

INSERT INTO `about` (`id`, `controler`, `data`, `visibility`) VALUES
(1, 'me', '<p>\n        Hello! I\'m\n        <a href=\"https://shalitha.me\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-custom-heading\">\n            Shalitha Madhuwantha\n        </a>, a student at Rajarata University of Sri Lanka, residing in the\n        beautiful country of Sri Lanka. My interests include technology,\n        cybersecurity, programming, and education, all integral to my life\n        and career.\n    </p>\n    \n    <p>\n        My ICT journey began in 2020, but my fascination with electronics\n        and robotics dates back to 2015. Over the years, I\'ve developed a\n        deep understanding of technologies like Arduino, NodeMCU, and\n        Raspberry Pi, which laid a strong foundation for my ICT\n        endeavors.\n    </p>\n    \n    <p>\n        Exploring various ICT fields, I gained comprehensive knowledge in\n        mobile and desktop app development, web development, server-side\n        management, networking (CCNA level), and cybersecurity. Network\n        security emerged as my true passion and envisioned career path.\n    </p>\n    \n    <p>\n        In 2020, I created my first mod app, followed by a viral modded\n        version of WhatsApp, showcasing my skills and innovation. You can\n        explore my earlier works on\n        <a href=\"https://smgtechcom.blogspot.com/2020/08/smg-mod-whatsapp.html?m=1\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-custom-heading\">\n            my blog\n        </a>.\n    </p>\n    \n    <p>\n        As a student in the Bachelor of Information and Communication\n        Technology (Honors) program at Rajarata University, I constantly\n        hone my skills and expand my knowledge. My involvement in projects\n        has enriched my practical understanding and application of ICT.\n    </p>\n<br />\n          <b class=\"block text-sm sm:text-base\">\n            Research Interests : Cyber Security , Exploit Development , Network\n            Security , Reverse Engineering\n          </b>', 1),
(2, 'Highlights', '[{\"title\":\"MS Club First Chairperson\",\"description\":\"Founded and served as the first chairperson of Microsoft Student Club at RUSL\",\"year\":\"2023\"},{\"title\":\"Club Opener at RUSL\",\"description\":\"Established and launched the technology club at Rajarata University of Sri Lanka\",\"year\":\"2023\"},{\"title\":\"Gold Microsoft Student Ambassador\",\"description\":\"Achieved Gold level certification as Microsoft Student Ambassador\",\"year\":\"2024\"},{\"title\":\"Viral WhatsApp Mod Creator\",\"description\":\"Created a viral modded version of WhatsApp that gained widespread recognition\",\"year\":\"2020\"},{\"title\":\"test\",\"description\":\"test\",\"year\":\"2020\"}]', 1),
(3, 'about', '<p>\n        Hello! I\'m\n        <a href=\"https://shalitha.me\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-custom-heading\">\n            Shalitha Madhuwantha\n        </a>, a student at Rajarata University of Sri Lanka, residing in the\n        beautiful country of Sri Lanka. My interests include technology,\n        cybersecurity, programming, and education, all integral to my life\n        and career.\n    </p>\n    \n    <p>\n        My ICT journey began in 2020, but my fascination with electronics\n        and robotics dates back to 2015. Over the years, I\'ve developed a\n        deep understanding of technologies like Arduino, NodeMCU, and\n        Raspberry Pi, which laid a strong foundation for my ICT\n        endeavors.\n    </p>\n    \n    <p>\n        Exploring various ICT fields, I gained comprehensive knowledge in\n        mobile and desktop app development, web development, server-side\n        management, networking (CCNA level), and cybersecurity. Network\n        security emerged as my true passion and envisioned career path.\n    </p>\n    \n    <p>\n        In 2020, I created my first mod app, followed by a viral modded\n        version of WhatsApp, showcasing my skills and innovation. You can\n        explore my earlier works on\n        <a href=\"https://smgtechcom.blogspot.com/2020/08/smg-mod-whatsapp.html?m=1\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-custom-heading\">\n            my blog\n        </a>.\n    </p>\n    \n    <p>\n        As a student in the Bachelor of Information and Communication\n        Technology (Honors) program at Rajarata University, I constantly\n        hone my skills and expand my knowledge. My involvement in projects\n        has enriched my practical understanding and application of ICT.\n    </p>\n<br />\n          <b class=\"block text-sm sm:text-base\">\n            Research Interests : Cyber Security , Exploit Development , Network\n            Security , Reverse Engineering...\n          </b>', 1);

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
(1, 'bbsmgamage@gmail.com', 1, '2025-07-26 17:54:23', '2025-08-10 12:14:27', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36');

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
(6, 'sd', 'sd', '2025-07-16', 'asd', '/assets/img/certlogo/mlsa.webp', 'asd', 1),
(7, 'sd', 'sd', '2025-07-16', 'asd', '/assets/img/certlogo/mlsa.webp', 'asd', 1),
(11, 'sdg', 'dfg', '2025-05-12', 'fdg', '/api/settings/img/out/assets/img/certlogo/udemy.webp', 'fdg,dg,dg,dfg', 1),
(12, 'dfg', 'dsfg', '2222-05-08', 'dfgdfgfg', '/api/settings/img/out/assets/img/certlogo/test', 'gfgdfg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `page_counters`
--

DROP TABLE IF EXISTS `page_counters`;
CREATE TABLE IF NOT EXISTS `page_counters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `endpoint` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `views` int DEFAULT '0',
  `unique_visitors` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_endpoint_date` (`endpoint`,`date`),
  KEY `idx_endpoint` (`endpoint`),
  KEY `idx_date` (`date`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  `type` enum('main','project','thought','event') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `visibility` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `thoughts`
--

INSERT INTO `thoughts` (`id`, `title`, `description`, `image`, `link`, `date`, `type`, `visibility`) VALUES
(43, 'webpay', 'sdf', '/api/settings/img/out/assets/img/project/webypay.jpeg', 'https://www.linkedin.com/in/shalitha-madhuwantha/', '2002-02-10', 'project', 1),
(44, 'dssdf', 'dsfsdfssdffsdffsdfdsfsdfsdsfffffrefdsfd', '/api/settings/img/out/assets/img/project/thushlk.png', 'http://example.com/link/to/document', '1220-02-10', 'event', 1);

-- --------------------------------------------------------

--
-- Table structure for table `visitor_sessions`
--

DROP TABLE IF EXISTS `visitor_sessions`;
CREATE TABLE IF NOT EXISTS `visitor_sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `session_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `endpoint` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ip_hash` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_agent_hash` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `visited_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_session_endpoint` (`session_id`,`endpoint`),
  KEY `idx_date` (`visited_at`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

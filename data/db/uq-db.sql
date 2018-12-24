/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : uq-db

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2017-07-03 08:48:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `banner`
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `seq` int(2) NOT NULL,
  `imgPath` varchar(100) NOT NULL,
  `jumpPath` varchar(100) DEFAULT NULL,
  `target` varchar(20) NOT NULL,
  `validityDateStart` varchar(20) NOT NULL,
  `validityDateEnd` varchar(20) NOT NULL,
  `createDate` varchar(20) DEFAULT NULL,
  `createPeople` varchar(50) DEFAULT NULL,
  `updateDate` varchar(20) DEFAULT NULL,
  `updatePeople` varchar(50) DEFAULT NULL,
  `delSign` int(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES ('21db420d-6133-c76d-1616-ade422d3c19e', 'ewrwerwer45', '3', '', '', '', '2017-06-13', '2017-06-23', null, null, null, null, '0');
INSERT INTO `banner` VALUES ('33d7f8f6-4133-c76d-1616-7f754a934331', 'ewrwerwer4', '3', '', '', '', '2017-06-13', '2017-06-23', null, null, null, null, '0');
INSERT INTO `banner` VALUES ('9092a724-2133-c76d-1613-fe86f99f6d02', 'ewrwerwer', '3', '', '', '', '2017-06-13', '2017-06-23', null, null, null, null, '0');

-- ----------------------------
-- Table structure for `menu`
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` varchar(100) NOT NULL,
  `pid` varchar(100) DEFAULT NULL,
  `name` varchar(20) NOT NULL,
  `jumpPath` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menu
-- ----------------------------

-- ----------------------------
-- Table structure for `ruleslist`
-- ----------------------------
DROP TABLE IF EXISTS `ruleslist`;
CREATE TABLE `ruleslist` (
  `id` varchar(100) NOT NULL,
  `pid` int(11) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `jumpPath` varchar(100) DEFAULT NULL,
  `htmlInfo` varchar(10000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ruleslist
-- ----------------------------

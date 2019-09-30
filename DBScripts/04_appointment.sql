CREATE TABLE `HealthCareApp`.`appointment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `title` varchar(20) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  `startTime` varchar(30) NOT NULL,
  `endTime` varchar(30) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `isMedication` tinyint(1) NOT NULL,
  `medName` varchar(20) DEFAULT NULL,
  `medDosage` int(11) DEFAULT NULL,
  `medFrequency` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`userId`),
  CONSTRAINT `usernameId` FOREIGN KEY (`userId`) REFERENCES `usercredentials` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
);
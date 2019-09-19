CREATE SCHEMA `healthcareapp` ;

CREATE TABLE `HealthCareApp`.`usercredentials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

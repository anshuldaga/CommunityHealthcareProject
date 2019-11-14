
CREATE TABLE `HealthCareApp`.`usercredentials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE `HealthCareApp`.`usercredentials` 
ADD COLUMN `lastUpdatedDT` DATETIME NOT NULL AFTER `password`,
CHANGE COLUMN `username` `username` VARCHAR(30) NOT NULL ,
CHANGE COLUMN `password` `password` VARCHAR(30) NOT NULL ;
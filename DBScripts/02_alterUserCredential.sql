ALTER TABLE `HealthCareApp`.`usercredentials` 
ADD COLUMN `lastUpdatedDT` DATETIME NOT NULL AFTER `password`,
CHANGE COLUMN `username` `username` VARCHAR(30) NOT NULL ,
CHANGE COLUMN `password` `password` VARCHAR(30) NOT NULL ;
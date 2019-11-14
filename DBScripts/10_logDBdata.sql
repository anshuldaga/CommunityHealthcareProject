/*
-- Query: SELECT * FROM employeedb.log
LIMIT 0, 1000

-- Date: 2019-09-29 20:32
*/

USE `HealthCareApp`;
ALTER TABLE `healthcareapp`.`log` 
ADD COLUMN `allDay` TINYINT(1) NULL AFTER `BGvalue`;

INSERT INTO `log` (`id`,`userId`,`startTime`,`endTime`,`allDay`,`isInsulin`,`isBP`,`isBG`,`insulinValue`,`BPValue`,`BGValue`) VALUES (2,8778,'2019-09-12T00:00:00.000Z','2019-09-13T00:00:00.000Z',1,0,1,1,NULL,NULL,NULL);
INSERT INTO `log` (`id`,`userId`,`startTime`,`endTime`,`allDay`,`isInsulin`,`isBP`,`isBG`,`insulinValue`,`BPValue`,`BGValue`) VALUES (3,8778,'2019-09-13T00:00:00.000Z','2019-09-14T00:00:00.000Z',1,0,0,0,NULL,44,44);
INSERT INTO `log` (`id`,`userId`,`startTime`,`endTime`,`allDay`,`isInsulin`,`isBP`,`isBG`,`insulinValue`,`BPValue`,`BGValue`) VALUES (4,8778,'2019-09-09T00:00:00.000Z','2019-09-10T00:00:00.000Z',1,0,1,0,NULL,13,NULL);
INSERT INTO `log` (`id`,`userId`,`startTime`,`endTime`,`allDay`,`isInsulin`,`isBP`,`isBG`,`insulinValue`,`BPValue`,`BGValue`) VALUES (5,8778,'2019-09-10T00:00:00.000Z','2019-09-11T00:00:00.000Z',1,1,0,0,NULL,NULL,NULL);

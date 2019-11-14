ALTER TABLE log CHANGE `BPvalue` `BPValue` int(11);
ALTER TABLE log CHANGE `BGvalue` `BGValue` int(11);

USE `HealthCareApp`;
DROP PROCEDURE `healthcareapp`.`LogAddOrEdit`;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `LogAddOrEdit`(
IN _id int(11),
IN _userId int(11),
IN _startTime varchar(50),
IN _endTime varchar(50),
IN _allDay tinyint(1),
IN _isInsulin tinyint(1),
IN _isBP tinyint(1),
IN _isBG tinyint(1),
IN _insulinValue int(11),
IN _BPValue int(11),
IN _BGValue int(11)
)
BEGIN
    IF EXISTS(SELECT * FROM log WHERE endTime = _endTime) = 1 THEN
        UPDATE log
        SET
        startTime = _startTime,
        endTime = _endTime,
        allDay = _allDay,
        isInsulin = _isInsulin,
        isBP = _isBP,
        isBG = _isBG,
        insulinValue = _insulinValue,
        BPValue = _BPValue,
        BGValue = _BGValue
        WHERE userId = _userId AND id = _id;
    ELSE    
		INSERT INTO log(userId, startTime, endTime, allDay, isInsulin, isBP, isBG, insulinValue, BPValue, BGValue)
        VALUES (_userId, _startTime, _endTime, _allDay, _isInsulin, _isBP, _isBG, _insulinValue, _BPValue, _BGValue);
    END IF;
    SELECT _userId AS 'userId';
    END$$
    DELIMITER ;

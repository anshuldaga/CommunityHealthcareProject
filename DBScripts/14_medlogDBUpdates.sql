ALTER TABLE medlog DROP med1name;
ALTER TABLE medlog DROP med2name;
ALTER TABLE medlog DROP med3name;

INSERT INTO medlog(userId, startTime, endTime, isMed1, isMed2, isMed3)
VALUES(877, '2019-10-13T00:00:00.000Z', '2019-10-14T00:00:00.000Z', true, false, false);

INSERT INTO medlog(userId, startTime, endTime, isMed1, isMed2, isMed3)
VALUES(877, '2019-10-14T00:00:00.000Z', '2019-10-15T00:00:00.000Z', false, true, true);

INSERT INTO medlog(userId, startTime, endTime, isMed1, isMed2, isMed3)
VALUES(877, '2019-10-15T00:00:00.000Z', '2019-10-16T00:00:00.000Z', true, true, true);

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `MedlogAddOrEdit`(
IN _id int(11),
IN _userId int(11),
IN _startTime varchar(50),
IN _endTime varchar(50),
IN _isMed1 tinyint(1),
IN _isMed2 tinyint(1),
IN _isMed3 tinyint(1)
)
BEGIN
    IF EXISTS(SELECT * FROM medlog WHERE endTime = _endTime) THEN
        UPDATE medlog
        SET
        startTime = _startTime,
        endTime = _endTime,
        isMed1 = _isMed1,
        isMed2 = _isMed2,
        isMed3 = _isMed3
        WHERE userId = _userId AND endTime = _endTime;
    ELSE    
		INSERT INTO medlog(userId, startTime, endTime, isMed1, isMed2, isMed3)
        VALUES (_userId, _startTime, _endTime, _isMed1, _isMed2, _isMed3);
    END IF;
    SELECT _userId AS 'userId';
END

CREATE TABLE mednames (
id int(11) NOT NULL AUTO_INCREMENT,
userId int(11) NOT NULL,
med1name varchar(50) DEFAULT NULL,
med2name varchar(50) DEFAULT NULL,
med3name varchar(50) DEFAULT NULL,
med1notes varchar(255) DEFAULT NULL,
med2notes varchar(255) DEFAULT NULL,
med3notes varchar(255) DEFAULT NULL,
PRIMARY KEY (id),
FOREIGN KEY (userID) REFERENCES medlog(userID)
);

INSERT INTO mednames(userId, med1name, med2name, med3name, med1notes, med2notes, med3notes)
VALUES(877, "tylenol", "vitamin d", "gummy vitamins", "when in pain", "when you dont get enough sun", "thrice a day");

CREATE DEFINER=`root`@`localhost` PROCEDURE `MednamesAddOrEdit`(
IN _id int(11),
IN _userId int(11),
IN _med1name varchar(50),
IN _med2name varchar(50),
IN _med3name varchar(50),
IN _med1notes varchar(255),
IN _med2notes varchar(255),
IN _med3notes varchar(255)
)
BEGIN
    IF EXISTS(SELECT * FROM medlog WHERE userId = _userId) THEN
        UPDATE mednames
        SET
        med1name = _med1name,
        med2name = _med2name,
        med3name = _med3name,
        med1notes = _med1notes,
        med2notes = _med2notes,
        med3notes = _med3notes
        WHERE userId = _userId;
    ELSE    
		INSERT INTO mednames(userId, med1name, med2name, med3name, med1notes, med2notes, med3notes)
        VALUES (_userId, _med1name, _med2name, _med1name, _med1notes, _med2notes, _med3notes);
    END IF;
    SELECT _userId AS 'userId';
END
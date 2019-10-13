CREATE TABLE `HealthCareApp`.`educationtabs` (
tab_id int(11) NOT NULL AUTO_INCREMENT,
tab_title varchar(255) NOT NULL,
tab_description varchar(255) DEFAULT NULL,
PRIMARY KEY (tab_id)
);

CREATE TABLE `HealthCareApp`.`tabvideos` (
vid_id int(11) NOT NULL AUTO_INCREMENT,
tab_id int(11) NOT NULL,
vid_title varchar(255) NOT NULL,
vid_description varchar(255) DEFAULT NULL,
vid_link varchar(255) NOT NULL,
PRIMARY KEY (vid_id),
FOREIGN KEY (tab_id) REFERENCES educationtabs(tab_id)
);

CREATE TABLE `HealthCareApp`.`log` (
id int(11) NOT NULL AUTO_INCREMENT,
userId int(11) NOT NULL,
startTime varchar(50) NOT NULL,
endTime varchar(50) DEFAULT NULL,
isInsulin tinyint(1) NOT NULL,
isBP tinyint(1) NOT NULL,
isBG tinyint(1) NOT NULL,
insulinValue int(11) DEFAULT NULL,
BPvalue int(11) DEFAULT NULL,
BGvalue int(11) DEFAULT NULL,
PRIMARY KEY (id),
FOREIGN KEY (userID) REFERENCES usercredentials(id)
);

CREATE TABLE `HealthCareApp`.`medlog` (
id int(11) NOT NULL AUTO_INCREMENT,
userId int(11) NOT NULL,
startTime varchar(50) NOT NULL,
endTime varchar(50) DEFAULT NULL,
isMed1 tinyint(1) NOT NULL,
isMed2 tinyint(1) NOT NULL,
isMed3 tinyint(1) NOT NULL,
med1name varchar(255) DEFAULT NULL,
med2name varchar(255) DEFAULT NULL,
med3name varchar(255) DEFAULT NULL,
PRIMARY KEY (id),
FOREIGN KEY (userID) REFERENCES usercredentials(id)
);

CREATE TABLE `HealthCareApp`.`userHealth` (
id int(11) NOT NULL AUTO_INCREMENT,
userId int(11) NOT NULL,
height_feet int(11),
height_inches int(11),
weight int(11),
bloodtype varchar(20),
primary_contact int(11),
secondary_contact int(11),
medical_insurance varchar(255),
dental_insurance varchar(255),
birthday varchar(50),
allergy_notes mediumtext,
PRIMARY KEY (id),
FOREIGN KEY (userID) REFERENCES usercredentials(id)
);

CREATE TABLE `HealthCareApp`.`userMedication` (
id int(11) NOT NULL AUTO_INCREMENT,
userId int(11) NOT NULL,
medication_name varchar(50) NOT NULL,
medication_notes varchar(255),
PRIMARY KEY (id),
FOREIGN KEY (userID) REFERENCES usercredentials(id)
);

CREATE TABLE `HealthCareApp`.`userCondition` (
id int(11) NOT NULL AUTO_INCREMENT,
userId int(11) NOT NULL,
condition_name varchar(50) NOT NULL,
condition_notes varchar(255),
PRIMARY KEY (id),
FOREIGN KEY (userID) REFERENCES usercredentials(id)
);

USE `HealthCareApp`;

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
    IF _id = 0 THEN
        INSERT INTO log(userId, startTime, endTime, allDay, isInsulin, isBP, isBG, insulinValue, BPValue, BGValue)
        VALUES (_userId, _startTime, _endTime, _allDay, _isInsulin, _isBP, _isBG, _insulinValue, _BPValue, _BGValue);
    ELSE
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
    END IF;
    SELECT _userId AS 'userId';
    
    END$$
DELIMITER ;


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UserConditionAddOrEdit`(
IN _id int(11),
IN _userId int(11),
IN _condition_name varchar(50),
IN _condition_notes varchar(255)
)
BEGIN
    IF _id = 0 THEN
        INSERT INTO usercondition(userId, condition_name, condition_notes)
        VALUES (_userId, _condition_name, _condition_notes);
    ELSE
        UPDATE usercondition
        SET
        condition_name = _condition_name,
        condition_notes = _condition_notes
        WHERE userId = _userId AND id = _id;
    END IF;
    SELECT _userId AS 'userId';
 END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UserhealthAddOrEdit`(
IN _userId int(11),
IN _height_feet int(11),
IN _height_inches int(11),
IN _weight int(11),
IN _bloodtype varchar(20),
IN _primary_contact int(11),
IN _secondary_contact int(11),
IN _medical_insurance varchar(255),
IN _dental_insurance varchar(255),
IN _birthday varchar(50),
IN _allergy_notes mediumtext
)
BEGIN
    IF NOT EXISTS (SELECT * FROM userhealth WHERE userId = _userId) THEN
        INSERT INTO userhealth(userId, height_feet, height_inches, weight, bloodtype, 
            primary_contact, secondary_contact, medical_insurance, dental_insurance, birthday, allergy_notes)
        VALUES (_userId, _height_feet, _height_inches, _weight, _bloodtype, 
            _primary_contact, _secondary_contact, _medical_insurance, _dental_insurance, _birthday, _allergy_notes);
    ELSE
        UPDATE userhealth
        SET
        height_feet = _height_feet,
        height_inches = _height_inches,
        weight = _weight,
        bloodtype = _bloodtype,
        primary_contact = _primary_contact,
        secondary_contact = _secondary_contact,
        medical_insurance = _medical_insurance,
        dental_insurance = _dental_insurance,
        birthday = _birthday,
        allergy_notes = _allergy_notes
        WHERE userId = _userId;
    END IF;
    SELECT _userId AS 'userId';
END$$
DELIMITER ;


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `UserMedicationAddOrEdit`(
IN _id int(11),
IN _userId int(11),
IN _medication_name varchar(50),
IN _medication_notes varchar(255)
)
BEGIN
    IF _id = 0 THEN
        INSERT INTO usermedication(userId, medication_name, medication_notes)
        VALUES (_userId, _medication_name, _medication_notes);
    ELSE
        UPDATE usermedication
        SET
        medication_name = _medication_name,
        medication_notes = _medication_notes
        WHERE userId = _userId AND id = _id;
    END IF;
    SELECT _userId AS 'userId';
END$$
DELIMITER ;

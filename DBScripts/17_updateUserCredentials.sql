ALTER TABLE `healthcareapp`.`usercredentials` 
ADD COLUMN `firstName` VARCHAR(30) NOT NULL AFTER `id`,
ADD COLUMN `lastName` VARCHAR(30) NOT NULL AFTER `firstName`,
ADD COLUMN `address` VARCHAR(100) NULL AFTER `lastName`;


UPDATE `healthcareapp`.`usercredentials` SET `firstName` = 'aks', `lastName` = 'aks' WHERE (`id` = '1');
UPDATE `healthcareapp`.`usercredentials` SET `firstName` = 'usd', `lastName` = 'pasd', `address` = 'gainesville' WHERE (`id` = '877');

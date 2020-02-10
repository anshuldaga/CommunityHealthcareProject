USE `HealthCareApp`;
INSERT INTO `categories` (`category_title`) VALUES('title_1');
INSERT INTO `categories` (`category_title`) VALUES('title_2');

INSERT INTO `resources` (`category_id`, `resource_title`, `resource_description`) VALUES('1', 'resource_1', 'resource_1_description');
INSERT INTO `resources` (`category_id`, `resource_title`, `resource_description`) VALUES('1', 'resource_2', 'resource_2_description');
INSERT INTO `resources` (`category_id`, `resource_title`, `resource_description`) VALUES('2', 'resource_1', 'resource_1_description');
INSERT INTO `resources` (`category_id`, `resource_title`, `resource_description`) VALUES('2', 'resource_2', 'resource_2_description');

INSERT INTO `resource_details` (`resource_id`, `state`) VALUES('1', 'Minnesota');
INSERT INTO `resource_details` (`resource_id`, `state`) VALUES('2', 'Wisconsin');
INSERT INTO `resource_details` (`resource_id`, `state`) VALUES('3', 'Iowa');
INSERT INTO `resource_details` (`resource_id`, `state`) VALUES('4', 'Florida');

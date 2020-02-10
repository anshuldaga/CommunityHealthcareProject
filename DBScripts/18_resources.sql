CREATE TABLE `HealthCareApp`.`categories` (
category_id int(11) NOT NULL AUTO_INCREMENT,
category_title varchar(255) NOT NULL,
PRIMARY KEY (category_id)
);

CREATE TABLE `HealthCareApp`.`resources` (
resource_id int(11) NOT NULL AUTO_INCREMENT,
category_id int(11) NOT NULL,
resource_title varchar(255) NOT NULL,
resource_description varchar(255) DEFAULT NULL,
PRIMARY KEY (resource_id),
FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE `HealthCareApp`.`resource_details` (
detail_id int(11) NOT NULL AUTO_INCREMENT,
resource_id int(11) NOT NULL,
website_link varchar(255) DEFAULT NULL,
address varchar(255) DEFAULT NULL,
city varchar(255) DEFAULT NULL,
state varchar(255) DEFAULT NULL,
zip int(5) DEFAULT NULL,
phone varchar(15) DEFAULT NULL,
eligibility varchar(255) DEFAULT NULL,
bus_routes varchar(255) DEFAULT NULL,
translation_ability varchar(255) DEFAULT NULL,
open_sunday tinyint(1) DEFAULT NULL,
open_monday tinyint(1) DEFAULT NULL,
open_tuesday tinyint(1) DEFAULT NULL,
open_wednesday tinyint(1) DEFAULT NULL,
open_thursday tinyint(1) DEFAULT NULL,
open_friday tinyint(1) DEFAULT NULL,
open_saturday tinyint(1) DEFAULT NULL,
PRIMARY KEY (detail_id),
FOREIGN KEY (resource_id) REFERENCES resources(resource_id)
);
CREATE TABLE `user` (
  `user_id` int PRIMARY KEY, AUTO_INCREMENT,
  `name` varchar(255),
  `email` varchar(255),
  `password` varchar(255)
);

CREATE TABLE `airport` (
  `airport_id` int PRIMARY KEY AUTO_INCREMENT,
  `airport_name` varchar(255),
  `fuel_capacity` int,
  `fuel_available` int
);

CREATE TABLE `aircraft` (
  `aircraft_id` int PRIMARY KEY AUTO_INCREMENT,
  `aircraft_no` varchar(255),
  `airline` varchar(255),
  `source` varchar(255),
  `destination` varchar(255)
);

CREATE TABLE `transaction` (
  `transaction_id` int PRIMARY KEY AUTO_INCREMENT,
  `transaction_date_time` datetime,
  `transaction_type` varchar(255),
  `airport_id` int,
  `aircraft_id` int,
  `quantity` int,
  `transaction_id_parent` int
);
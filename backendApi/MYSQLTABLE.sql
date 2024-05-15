create database student;
CREATE TABLE `student_details` (
  `student_id` int NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` char(1) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `total_marks` int DEFAULT NULL,
  `roll_number` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`student_id`)
)
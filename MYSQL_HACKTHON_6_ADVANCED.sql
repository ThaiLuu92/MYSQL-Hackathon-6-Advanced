CREATE DATABASE MYSQL_HACKTHON_6_ADVANCED;

USE MYSQL_HACKTHON_6_ADVANCED;

CREATE TABLE User (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role BOOLEAN NOT NULL
);

CREATE TABLE Task (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  priority VARCHAR(50),
  deadline DATE,
  done BOOLEAN DEFAULT FALSE
);

-- Inserting user
INSERT INTO User (username, password, role)
VALUES ('admin', '123456', TRUE);

INSERT INTO User (username, password, role)
VALUES ('user', '123456', FALSE);


-- Inserting tasks
INSERT INTO Task (name, priority, deadline, done)
VALUES ('Task 1', 'High', '2023-12-31', FALSE),
       ('Task 2', 'Medium', '2023-11-30', TRUE),
       ('Task 3', 'Low', '2024-01-15', FALSE);


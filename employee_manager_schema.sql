CREATE DATABASE employee_manager_db;

USE employee_manager_db;

CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR (30)
);

CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR (30),
    salary DECIMAL,
    department_id INT
);

CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    role_id INT,
    manager_id INT
);

INSERT INTO departments (name)
VALUES 
("Marketing"),
("Sales"),
("Engineering"),
("Legal"),
("Accounting");

INSERT INTO roles (title, salary, department_id)
VALUES 

-- Marketing Team --
("Marketing Lead", 150000, 1),
("Marketing Agent", 60000,1),

-- Sales Team --
("Sales Lead", 120000, 2),
("Sales Agent", 50000,2),

-- Engineering Team --
("Tech Lead", 200000, 3),
("Senior Developer", 120000, 3),
("Developer", 70000, 3),

-- Legal Team --
("Legal Lead", 120000, 4),
("Lawyer", 100000, 4),

-- Accounting Team --
("Head Accountant", 130000, 5),
("Accountant", 65000, 5);

INSERT INTO employees(first_name, last_name)
VALUES 
("Randall", "Phillips"),
("Chris", "Stephens"),
("Zach", "Lundy"),
("Chase", "Stephens"),
("Keegan", "Downie");








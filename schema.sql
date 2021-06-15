DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE Departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NUll,
    PRIMARY KEY (id)
);
    
CREATE TABLE Roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);


SELECT * FROM Departments;
SELECT * FROM Roles;
SELECT * FROM Employees;
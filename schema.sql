DROP DATABASE IF EXISTS employee_sql;
CREATE DATABASE employee_sql;

USE employee_sql;

CREATE TABLE Departments (
    id INT NOT NULL,
    name VARCHAR(30) NOT NUll,
    PRIMARY KEY (id)
);
    
CREATE TABLE Roles (
    id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Employee (
    id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);

SELECT * FROM Departments;
SELECT * FROM Roles;
SELECT * FROM Employee;
--This drops the database
DROP DATABASE IF EXISTS employeeTracker_db; 
--This creates the database "company" if it does not exist
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

--creates the departments within the table
CREATE TABLE department {
  employee_id: INT, PRIMARY KEY, NOT NULL, AUTO_INCREMENT,
    employee_name: VARCHAR(100), NOT NULL,

};
--creates the "role" with in the table
CREATE TABLE role {
    employee_id: INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title: VARCHAR(100),
    salary: DECIMAL,
    deparment_id: INT

};
--creates the employee" with in the table
CREATE TABLE employee {
    employee_id: INT PRIMARY KEY,
    first_name: VARCHAR(100) NOT NULL,
    last_name: VARCHAR(100) NOT NULL,
    role_id: INT,
    manager_id: INT NOT NULL
};
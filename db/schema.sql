DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

/* Creating a new table called department with two columns: ID & INT */ 

CREATE TABLE department (
/* an unsigned integar and set as the primary key.. cannot be null */
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
/* adding a maximum length of 30 characthers and the value must be unique */
    name VARCHAR(30) UNIQUE NOT NULL
);

/* Creating another table called role with 4 columns */
CREATE TABLE role (
/* ID column set to primary key and cannot be null */
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
/* title column has a max length of 30 characters and its value must be unique */
    title VARCHAR(30) UNIQUE NOT NULL,
/* Salary is decimal type */
    salary DECIMAL,
/* Department ID is an integar type  */
    department_id INT
);

/* Creating another table called role with 6 columns */
CREATE TABLE employee (
/* ID Column unsigned integar (unique identifer) and set as the primary key */
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
/* First Name column with a max of 30 characters and cannot be null */
  first_name VARCHAR(30) NOT NULL,
/* Last Name column with a max of 30 characters and cannot be null */
  last_name VARCHAR(30) NOT NULL,
/* role column and unsigned integar and cannot be null */
  role_id INT UNSIGNED NOT NULL,
/* Created on the roll id column */
  INDEX role_ind (role_id),
/* Foreign key referencing the role id and ON DELETE CASCADE is if the role table is deleted then all the rows in the employee table with role id will be deleted */
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
/* manager id column and an unsigned integer */
  manager_id INT UNSIGNED,
  INDEX man_ind (manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);
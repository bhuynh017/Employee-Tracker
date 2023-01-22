/* using the employees database that was created */
use schema;

/* Inserting data into the department table: data includes the name of the department that which employee is in */
INSERT INTO department
(name)
VALUES
('SALES'),
('ENGINEERING'),
('FINANCE'),
('LEGAL');

/* Inserting data into the role table: data includes the name of the title, salary, and department_id and provides the values*/
INSERT INTO role
(title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

/* Inserting data into the employee table: data includes the name of each person and NULL is for the employes who do not have a manager*/
INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7);

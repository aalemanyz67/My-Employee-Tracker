INSERT INTO departments (department_name)
VALUES
('Executive Board'),
('Marketing'),
('Human Resources'),
('Finance'),
('Engineering'),
('Information Technology'),
('Customer Relations'),
('Research and Development');

INSERT INTO roles (title, salary, department_id)
VALUES
('Chief Executive Officer', 500000.00, 1),
('Marketing Manager', 130000.00, 2),
('HR Director', 200000.00, 3),
('Finance Head', 150000.00, 4),
('Senior Engineer', 190000.00, 5),
('IT Manager', 130000.00, 6),
('Customer Relations Manager', 80000.00, 7),
('Research and Development Manager ', 195000.00, 8);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
--Names are based off of University of Michigan current and past football players. GO BLUE!!
('Blake', 'Corum', 1, 1),
('Roman', 'Wilson', 2, 2),
('Donovan', 'Edwards', 3, 3),
('JJ', 'Mccarthy', 4, 4),
('Tom', 'Brady', 5, 5),
('Desmond', 'Howard', 6, 6),
('Charles', 'Woodson', 7, 7),
('Mike', 'Sainristil', 8, 8),
('Colsen', 'Loveland', 9, 9),
('Adian', 'Hutchinson', 10, 10);
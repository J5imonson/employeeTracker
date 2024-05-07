INSERT INTO dept (dept_name)
VALUES  ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal');

INSERT INTO roles (job_title, salary, dept_id)
VALUES  ('Salesperson', 80000, 1),
        ('Sales Lead', 175000, 1),
        ('Lead Engineer', 150000, 2),
        ('Software Engineer', 120000, 2),
        ('Account Manager', 160000, 3),
        ('Accountant', 125000, 3),
        ('Legal Team Lead', 250000, 4),
        ('Lawyer', 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('John', 'Doe', 1, 'Bobby Brown'),
        ('Bobby', 'Brown', 1, null),
        ('Jimmy', 'John', 2, null),
        ('Ron', 'McDonald', 2, 'Jimmy John'),
        ('Suzie', 'Queue', 3, null),
        ('Fred', 'Fred', 3, 'Suzie Queue'),
        ('Mary', 'Harry', 4, null),
        ('Donald', 'Duck', 4, 'Mary Harry');

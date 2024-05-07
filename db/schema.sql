/*
  To-do:

  Upon init, display all departments, all roles, all employees, add dept., add role, add emp, update emp.

  All depts> table showing dept names and id

  All roles> table showing job title, role id, role's dept, salary

  All emp> emp ids, first name, last name, job title, depts, salaries, and managers reported to

  Add dept> prompted to enter dept name, is added to db

  Add role> prompted to enter name, salary, dept, and is added to db

  Add emp> prompted to enter first name, last name, role, manager, and is added to db

  Update emp> prompted to select emp and update their new role, and is updated on db

  Video walkthrough
*/

\c postgres;

DROP DATABASE IF EXISTS emp_db;

CREATE DATABASE emp_db;

\c emp_db;

CREATE TABLE dept (
  id SERIAL PRIMARY KEY,
  dept_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  job_title VARCHAR(100) UNIQUE NOT NULL,
  salary DECIMAL NOT NULL,
  dept_id INTEGER NOT NULL,
  FOREIGN KEY (dept_id)
  REFERENCES dept(id)
  ON DELETE SET NULL
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE SET NULL
);

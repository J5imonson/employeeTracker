SELECT employees.id, employees.first, employees.last, role.title, dept.id AS department, role.salary, employees.manager_id
FROM employees
JOIN role ON employees.role_id = role.id
JOIN department ON dept.id = role.manager_id
JOIN employee AS manager ON employees.manager_id = manager.id
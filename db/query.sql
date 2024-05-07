SELECT * FROM dept;

SELECT roles.id, roles.job_title, dept.dept_name AS department, roles.salary
FROM roles
JOIN department ON roles.dept_id = department.id;
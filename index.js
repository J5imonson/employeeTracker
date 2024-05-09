const inquirer = require('inquirer');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'emp_db',
  password: 'b00tCamp9015!'
});

function init() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'main',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
      }
    ]).then((input) => {

      switch (input.main) {
        case 'View All Employees':
          viewAllEmployees();
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Update Employee Role':
          updateEmployeeRole();
          break;

        case 'View All Roles':
          viewAllRoles();
          break;

        case 'Add Role':
          addRole();
          break;

        case 'View All Departments':
          viewAllDepartments();
          break;

        case 'Add Department':
          addDepartment();
          break;

        case 'Quit':
          pool.end();
          break;
      }
    });
}

//example pool query for reference
// pool.query('SELECT NOW()', (err, res) => {
//   if (err) {
//       console.error('Error executing query', err);
//   } else {
//       console.log('Connected to PostgreSQL database:', res.rows[0].now);
//   }
//   pool.end(); // Close the connection pool
// });

//function to view all employees
//All emp> emp ids, first name, last name, job title, depts, salaries, and managers reported to
function viewAllEmployees() {
  const query =
    `SELECT employees.id, employees.first, employees.last, role.title, dept.name AS department, role.salary, CONCAT (manager.first, ' ', manager.last) AS manager
  FROM employees
  JOIN role ON employees.role_id = role.id
  JOIN dept ON dept.id = role.dept_id
  JOIN employees AS manager ON employees.manager_id = manager.id`;
  pool.query(query, (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    init();
  });
};

//function to add an employee
//Add emp> prompted to enter first name, last name, role, manager, and is added to db
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "fname",
        message: "Please enter employee's first name:"
      },
      {
        type: "input",
        name: "lname",
        message: "Please enter employee's last name:"
      },
      {
        type: "list",
        name: "role",
        choices: 
      },
      {
        type: "list",
        name: "manager",
        choices: 
      },
    ]) .then((input) => )
  }


//function to update an employee roles
//Update emp> prompted to select emp and update their new role, and is updated on db
// function updateEmployeeRole();


//function to view all roles
//All roles> table showing job title, role id, role's dept, salary
function viewAllRoles() {
  const query =
    `SELECT role.id, role.title, role.salary, dept.name AS department 
  FROM role
  JOIN dept ON dept.id = role.dept_id `;
  pool.query(query, (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    init();
  });
}


//function to add a role
//Add role> prompted to enter name, salary, dept, and is added to db
// function addRole();


//function to view all departments
//All depts> table showing dept names and id
function viewAllDepartments() {
  const query =
    `SELECT * FROM dept`;
  pool.query(query, (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    init();
  });
}


//function to add a department
//Add dept> prompted to enter dept name, is added to db
// function addDepartment();









init();
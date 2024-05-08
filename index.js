const inquirer = require('inquirer');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'emp_db',
  password: 'b00tCamp9015!',
  port: 5432
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
      console.error('Error executing query', err);
  } else {
      console.log('Connected to PostgreSQL database:', res.rows[0].now);
  }
  pool.end(); // Close the connection pool
});

function start() {
  inquirer.prompt([
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
          const query = "SELECT * FROM dept"
          pool.query
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

//function to view all employees
//All emp> emp ids, first name, last name, job title, depts, salaries, and managers reported to
function viewAllEmployees();


//function to add an employee
//Add emp> prompted to enter first name, last name, role, manager, and is added to db
function addEmployee();


//function to update an employee roles
//Update emp> prompted to select emp and update their new role, and is updated on db
function updateEmployeeRole();


//function to view all roles
//All roles> table showing job title, role id, role's dept, salary
function viewAllRoles();


//function to add a role
//Add role> prompted to enter name, salary, dept, and is added to db
function addRole();


//function to view all departments
//All depts> table showing dept names and id
function viewAllDepartments();


//function to add a department
//Add dept> prompted to enter dept name, is added to db
function addDepartment();









start();
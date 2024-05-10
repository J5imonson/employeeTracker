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
        case 'Add Employee':
          addEmployee();
          break;
          
        case 'Add Role':
          addRole();
          break;
          
        case 'Add Department':
          addDepartment();
          break;
          
        case 'Update Employee Role':
          updateEmployeeRole();
          break;

        case 'View All Employees':
          viewAllEmployees();
          break;

        case 'View All Roles':
          viewAllRoles();
          break;

        case 'View All Departments':
          viewAllDepartments();
          break;

        case 'Quit':
          pool.end();
          break;
      }
    })
};

//function to view all employees
//All emp> emp ids, first name, last name, job title, depts, salaries, and managers reported to
function viewAllEmployees() {
  const query =
    `SELECT employees.id, employees.first, employees.last, role.title, dept.name AS department, role.salary, CONCAT (manager.first, ' ', manager.last) AS manager
  FROM employees
  LEFT JOIN role ON employees.role_id = role.id
  LEFT JOIN dept ON dept.id = role.dept_id
  LEFT JOIN employees AS manager ON employees.manager_id = manager.id`;
  pool.query(query, (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    init();
  })
};

//function to add an employee
//Add emp> prompted to enter first name, last name, role, manager, and is added to db
function addEmployee() {
  const query = `SELECT * FROM employees`;
  pool.query(query, (err, res) => {
    if (err) throw err;
    const managers = res.rows.map(({ id, first, last }) => ({ name: first + ' ' + last, value: id }))
    managers.push("none")
    const query = `SELECT * FROM role`;
    pool.query(query, (err, res) => {
      if (err) throw err;
      const role = res.rows.map(({ id, title }) => ({ name: title, value: id }))
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
            message: "Please select the new employee's role:",
            choices: role,
          },
          {
            type: "list",
            name: "manager",
            message: "Please select the new employee's manager:",
            choices: managers,
          }
        ]).then((input) => {
          if ( input.manager === "none" ) {
            input.manager = null }
          const query = `INSERT INTO employees (first, last, role_id, manager_id)
          VALUES ($1, $2, $3, $4)`;
          pool.query(query, [input.fname, input.lname, input.role, input.manager], (err, res) => {
            if (err) throw err;
            console.log(`New employee ${input.fname+" "+input.lname} successfully added!`);
            init();
          })
        })
    })
  })
};

//function to update an employee roles
//Update emp> prompted to select emp and update their new role, and is updated on db
function updateEmployeeRole() {
  const query = `SELECT * FROM employees`;
  pool.query(query, (err, res) => {
    if (err) throw err;
    const employees = res.rows.map(({ id, first, last }) => ({ name: first + ' ' + last, value: id }))
    const query = `SELECT * FROM role`;
    pool.query(query, (err, res) => {
      if (err) throw err;
      const role = res.rows.map(({ id, title }) => ({ name: title, value: id }))
      inquirer
        .prompt([
          {
            type: "list",
            name: "employees",
            message: "Please select the employee whose role you would like to update:",
            choices: employees,
          },
          {
            type: "list",
            name: "role",
            message: "Please select the employee's new role:",
            choices: role,
          }
        ]).then((input) => {
          const query = `UPDATE employees SET role_id=$1 WHERE id=$2`;
          pool.query(query, [input.role, input.employees], (err, res) => {
            if (err) throw err;
            console.log(`Employee successfully updated!`);
            init();
          })
        })
    })
  })
};


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
  })
};

//function to add a role
// Add role> prompted to enter name, salary, dept, and is added to db
function addRole() {
  const query = `SELECT * FROM dept`;
  pool.query(query, (err, res) => {
    if (err) throw err;
    const departments = res.rows.map(({ id, name }) => ({ name: name, value: id }))
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "Please enter the name for the new role:"
        },
        {
          type: "input",
          name: "salary",
          message: "Please enter the salary for this role:"
        },
        {
          type: "list",
          name: "dept",
          choices: departments
        }
      ]).then((input) => {
        const query = `INSERT INTO role(title, salary, dept_id) VALUES ($1, $2, $3)`;
        pool.query(query, [input.name, input.salary, input.dept], (err, res) => {
          if (err) throw err;
          console.log(`New role ${input.name} successfully added!`);
          init();
        })
      })
  }
  )
};

//function to view all departments
//All depts> table showing dept names and id
function viewAllDepartments() {
  const query =
    `SELECT * FROM dept`;
  pool.query(query, (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    init();
  })
};

//function to add a department
//Add dept> prompted to enter dept name, is added to db
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter the name of the new department:"
      }
    ]).then((input) => {
      const query = `INSERT INTO dept (name) VALUES ($1)`;
      pool.query(query, [input.name], (err, res) => {
        if (err) throw err;
        console.log(`New department ${input.name} successfully added!`);
        init();
      })
    })
};

init();
//Bring in packages
const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');
const db = require('.');

// Set up connection to mysql
const connection = mysql.createConnection({
  host: 'localhost',

  // Port
  port: 3306,

  // Username
  user: 'root',

  // Password
  password: 'CredorEichiii',
  database: 'employee_tracker_db'
});


connection.connect(function(err) {
  if (err) throw err;
  console.log('connected to mysql!');

  homeCommands();
});

// Initial prompts
function homeCommands() {
  inquirer
    .prompt({
      type: 'list',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Quit'
      ],
      message: 'What can I help you with?',
      name: 'option'
    })
    .then(function(result) {
      console.log('You would like to: ' + result.option);

      switch (result.option) {
        case 'View all departments':
            viewDepartments();
            break;
        case 'View all roles':
            viewRoles();
            break;
        case 'View all employees':
            viewEmployees();
            break;
        case 'Add a department':
            addDepartment();
            break;
        case 'Add a role':
            addRole();
            break;
        case 'Add an employee':
            addEmployee();
            break;
        case 'Update an employee role':
            updateEmployeeRole();
            break;
        default:
            quit();
      }
    });
}


// transform tables based on inputted command
function viewDepartments() {
    let query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      homeCommands();
    });
  }
  
  function viewRoles() {
    let query = 'SELECT * FROM role';
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      homeCommands();
    });
  }
  
  function viewEmployees() {
    let query = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      homeCommands();
    });
  }


function addDepartment() {
    inquirer.prompt({ 
        type: 'input',
        message: 'What is the department name?',
        name: 'deptName'

    }).then(function(answer){
        connection.query('INSERT INTO department (name) VALUES (?)', [answer.deptName] , function(err, res) {
            if (err) throw err;
            console.table(res)
            homeCommands()
    })
    })
}


function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is the role name?',
        name: 'roleName'
      },
      {
        type: 'input',
        message: 'What salary does the role have?',
        name: 'roleSalary'
      },
      {
        type: 'input',
        message: 'What is the department id number for the role?',
        name: 'deptID'
      }
    ])
    .then(function(answer) {
      connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [answer.roleName, answer.roleSalary, answer.deptID], function(err, res) {
        if (err) throw err;
        console.table(res);
        homeCommands();
      });
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is the first name of the employee?',
        name: 'employeeFirstName'
      },
      {
        type: 'input',
        message: 'What is the last name of the employee?',
        name: 'employeeLastName'
      },
      {
        type: 'input',
        message: 'What is the role id number of the employee?',
        name: 'roleID'
      },
      {
        type: 'input',
        message: 'What is the manager id number of the employee?',
        name: 'managerID'
      }
    ])
    .then(function(answer) {
      connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answer.employeeFirstName, answer.employeeLastName, answer.roleID, answer.managerID], function(err, res) {
        if (err) throw err;
        console.table(res);
        homeCommands();
      });
    });
}


function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Which employee would you like to update the role of?',
        name: 'employeeRoleUpdate'
      },

      {
        type: 'input',
        message: 'What role do you want to update the role too?',
        name: 'updateRole'
      }
    ])
    .then(function(answer) {
      connection.query('UPDATE employee SET role_id=? WHERE first_name= ?',[answer.updateRole, answer.employeeRoleUpdate],function(err, res) {
        if (err) throw err;
        console.table(res);
        homeCommands();
      });
    });
}

function quit() {
  connection.end();
  process.exit();
}
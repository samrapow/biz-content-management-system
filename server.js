//Bring in packages
const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');
const db = require(''.'');

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
        type: "input",
        message: "What's the name of the role?",
        name: "roleName"
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "salaryTotal"
      },
      {
        type: "input",
        message: "What is the department id number?",
        name: "deptID"
      }
    ])
    .then(function(answer) {


      connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salaryTotal, answer.deptID], function(err, res) {
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
        type: "input",
        message: "What's the first name of the employee?",
        name: "eeFirstName"
      },
      {
        type: "input",
        message: "What's the last name of the employee?",
        name: "eeLastName"
      },
      {
        type: "input",
        message: "What is the employee's role id number?",
        name: "roleID"
      },
      {
        type: "input",
        message: "What is the manager id number?",
        name: "managerID"
      }
    ])
    .then(function(answer) {

      
      connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.eeFirstName, answer.eeLastName, answer.roleID, answer.managerID], function(err, res) {
        if (err) throw err;
        console.table(res);
        homeCommands();
      });
    });
}

//Since we're using inquirer, we can pass the query into the method as an array

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee would you like to update?",
        name: "eeUpdate"
      },

      {
        type: "input",
        message: "What do you want to update to?",
        name: "updateRole"
      }
    ])
    .then(function(answer) {
      // let query = `INSERT INTO department (name) VALUES ("${answer.deptName}")`
      //let query = `'UPDATE employee SET role_id=${answer.updateRole} WHERE first_name= ${answer.eeUpdate}`;
      //console.log(query);

      connection.query('UPDATE employee SET role_id=? WHERE first_name= ?',[answer.updateRole, answer.eeUpdate],function(err, res) {
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
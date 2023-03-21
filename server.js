// This is for a business owner.
// It helps them view & manage the depts, roles, & employees in a company.
// It helps to plan & organize their business.
// It's a command-line app that takes user input.

// MySQL2 installation: https://www.npmjs.com/package/mysql2#installation
// First Query, get the client, connects to db to perform queries
const mysql = require("mysql2");
const inquirer = require("inquirer");

// npm figlet help: https://www.npmjs.com/package/figlet
const figlet = require("figlet");

// Figlet through npm (I installed it via Terminal to use it.)
// This project aims to fully implement the FIGfont spec in JavaScript.
//It works in the browser and with Node.js.
// figlet.text(
//   "Employee \n \n Tracker",
//   {
//     font: "Ghost",
//     horizontalLayout: "default",
//     verticalLayout: "fitted",
//     width: 90,
//     whitespaceBreak: true,
//   },
//   function (err, data) {
//     if (err) {
//       console.log("Something went wrong...");
//       console.dir(err);
//       return;
//     }
//     console.log(data);
//   }
// );

// call once somewhere in the beginning of the app.
// Prints MySQL rows to the console.
const cTable = require("console.table");
require("dotenv").config();
// npm package "Chalk", terminal string styling:
//  https://www.npmjs.com/package/chalk

const chalk = require("chalk");
// import chalk from 'chalk';

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "employee_management_db",
  password: process.env.DB_PASSWORD,
});

// connection.connect();
console.log(
  chalk.yellow.bold(
    "///////////////////////////////////////////////////////////////////////////////////////////////"
  )
);
console.log(``);
console.log(chalk.red.bold(figlet.textSync("EMPLOYEE TRACKER")));;
console.log(
  `                               ` +
    chalk.white.bold("A COMMAND LINE APPLICATION")
);
console.log(``);
console.log(
  chalk.yellow.bold(
    `///////////////////////////////////////////////////////////////////////////////////////////////`
  )
);

// Functions:

// Start of the app:
// 1. Add departments, roles, employees
// The switch statement is used to perform different actions based on different conditions.
// JS Switch statement (https://www.w3schools.com/js/js_switch.asp):
function start() {
  // Inquirer. js is a collection of common interactive command-line user interfaces.
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update employee role",
        "Exit",
      ],

      // The then() method of a Promise object takes up to two arguments: callback functions for the fulfilled
      // and rejected cases of the Promise . It immediately returns an equivalent Promise
    })
    .then((answer) => {
      switch (answer.action) {
        case "View all departments":
          viewDepts();
          break;

        case "View all roles":
          viewRoles();
          break;

        case "View all employees":
          viewEmp();
          break;

        case "Add a department":
          addDept();
          break;

        case "Add a role":
          addRole();
          break;

        case "Add an employee":
          addEmp();
          break;

        case "Update employee role":
          update();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

// 2. View departments, roles, employees: formatted table showing department names & department ids.
function viewDepts() {
  connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    console.log("Displaying all departments:");
    console.table(data);
    start();
  });
}
// 3. Choose to view all roles.
// Has job title, role id, department that role belongs to, & salary for that role.
function viewRoles() {
  connection.query("SELECT * FROM role", (err, data) => {
    if (err) throw err;
    console.log("Displaying all roles:");
    console.table(data);
    start();
  });
}

// FINISH BELOW ///////////////////////////////////////////////////////////////////////

// // 4. View all employees, table showing emp data, emp ids, 1st names, last, job titles, depts, salaries, & mngs emplys rep to.
// // function to Add a role; prompt role, salary and department
function viewEmp() {
  connection.query("SELECT * FROM employee", (err, data) => {
    if (err) throw err;
    console.log("Displaying all employees:");
    console.table(data);
    start();
  });
}

// // 5. Choose to add a department: Prompted to enter name of dept & that department is added to db.
// function addDept() { }
// // 6. Choose to add a role:
// Prompted to enter name, salary, & dept for the role & that role is added to the db.
function addRole() {
  const sql = "SELECT * FROM department";
  connection.query(sql, (err, results) => {
    if (err) throw err;
  })}

// // 7. Choose to add an employee: Prompted to enter employee’s 1st name, last, role, & mngr, & employee is added to db.
// // function to add an employee
function addEmp() {
  const sql = "SELECT * FROM employee, role";
  connection.query(sql, (err, results) => {
    if (err) throw err;
  })}

// // 8. Choose to update an employee role: Prompted to select an emp to update & their new role & this info is updated in db.
// // function to Update employee role
// function update() {
//   connection.query("SELECT * FROM employee, role", (err, results) => {
//     if (err) throw err;
//   }
// }


// BONUS: 1 - Update emps
// BONUS: 2 - View employees by mngr
// BONUS: 3 - View employees by dept
// BONUS: 4 - Delete dept, dept, & emps
// BONUS: 5 - View total utilized budget of a dept (compbined salaries of all emp in that dept)

// REMOVE EMPLOYEE
// const removeEmployee = () => {
//           connection.query(`SELECT employees.first_name, employees.id FROM employees`, (err, res) => {
//               if (err) throw err;
//           });
//       inquirer.prompt([
//           {
//               name: 'removeID',
//               type: 'input',
//               message: "Which employee ID would you like to remove?",
//           }
//       ]).then(answer => {
//           connection.query(`DELETE FROM employees WHERE id = ?`, [answer.removeID], (err, res) => {
//               if (err) throw err;
//               console.log("Successfully deleted");
//               start();
//           });
//       });
//   };





connection.connect(err => {
if(err) throw err;
start();
});

// simple query
// Query is a request for information.
// It can be converted into a JSON string.
// If it's a query string, you need to use require('querystring').
// connection.query(
//   'SELECT * roles, employees, FROM employees WHERE departments = "manager" AND `Tom Smith` ',
//   function(err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );

// connection.query(
//   'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//   ['Page', 45],
//   function(err, results) {
//     console.log(results);
//   }
// );

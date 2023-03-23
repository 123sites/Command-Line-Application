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
    `///////////////////////////////////////////////////////////////////////////////////////////////`
  )
);
console.log(``);
console.log(chalk.red.bold(figlet.textSync("WELCOME TO THIS")));
console.log(chalk.red.bold(figlet.textSync("COMMAND LINE APP")));
console.log(
  `                               ` +
    chalk.white.bold("THIS PROVIDES EMPLOYEE INFORMATION")
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
        "Delete an employee",
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

        case "Delete an employee":
          removeEmployee();
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
function addDept() {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the name of the new department?",
        validate: (value) => {
          if (value) {
            return true;
          } else {
            console.log("Please enter the department name.");
          }
        },
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.department,
        },
        (err) => {
          if (err) throw err;
          console.log(`New department ${answer.department} has been added!`);
          start();
        }
      );
    });
}

// // 6. Choose to add a role:
// Prompted to enter name, salary, & dept for the role & that role is added to the db.
function addRole() {
  const sql = "SELECT * FROM department";
  connection.query(sql, (err, results) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the title for this new role?",
          validate: (value) => {
            if (value) {
              return true;
            } else {
              console.log("Please enter the title.");
            }
          },
        },
        {
          name: "salary",
          type: "number",
          message: "What is their salary (just numbers)?",
          validate: (value) => {
            // The isNaN() function determines whether a value is NaN when converted to a number.
            // Because coercion inside the isNaN() function can be surprising, you may alternatively
            // want to use Number.isNaN().
            if (isNaN(value) === false) {
              return true;
            }
            console.log("Please enter a salary.");
          },
        },
        {
          name: "department",
          type: "list",
          choices: () => {
            let choiceArray = [];
            // JavaScript Loop: https://www.w3schools.com/jsref/jsref_for.asp
            // Loops are used in JavaScript to perform repeated tasks based on a condition.
            for (let i = 0; i < results.length; i++) {
              choiceArray.push(results[i].name);
            }
            return choiceArray;
          },
          message: "What department is this new role under?",
        },
      ])
      .then((answer) => {
        let chosenDept;
        for (let i = 0; i < results.length; i++) {
          if (results[i].name === answer.department) {
            chosenDept = results[i];
          }
        }
        console.log(chosenDept);

        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.title,
            salary: answer.salary,
            department_id: chosenDept.id,
          },
          (err) => {
            if (err) throw err;
            console.log(`New role ${answer.title} has been added!`);
            start();
          }
        );
      });
  });
}
// // 7. Choose to add an employee: Prompted to enter employee’s 1st name, last, role, & mngr, & employee is added to db.
// // function to add an employee
function addEmp() {
  const sql = "SELECT * FROM role";
  connection.query(sql, (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is their first name?",
          validate: (value) => {
            if (value) {
              return true;
            } else {
              console.log("Please enter their first name.");
            }
          },
        },
        {
          name: "lastName",
          type: "input",
          message: "What is their last name?",
          validate: (value) => {
            if (value) {
              return true;
            } else {
              console.log("Please enter their last name.");
            }
          },
        },
        {
          name: "role",
          type: "list",
          choices: () => {
            let choiceArray = [];
            for (let i = 0; i < results.length; i++) {
              choiceArray.push(results[i].title);
            }
            return choiceArray;
          },
          message: "What is the role?",
        },
      ])
      .then((answer) => {
        let chosenRole;

        for (let i = 0; i < results.length; i++) {
          if (results[i].title === answer.role) {
            chosenRole = results[i];
          }
        }

        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: chosenRole.id,
          },
          (err) => {
            if (err) throw err;
            console.log(
              `New employee ${answer.firstName} ${answer.lastName} has been added! as a ${answer.role}`
            );
            start();
          }
        );
      });
  });
}
// 8. Choose to update an employee role: Function to Update employee role & info is updated in db.
function update() {
  connection.query("SELECT * FROM employee", (err, empresults) => {
    connection.query("SELECT * FROM role", (err, roleresults) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "employee",
            type: "list",
            choices: () => {
              let choiceArray = [];
              for (let i = 0; i < empresults.length; i++) {
                choiceArray.push(empresults[i].last_name);
              }
              return choiceArray;
            },
            message: "Which employee would you like to update?",
          },
          {
            name: "role",
            type: "list",
            choices: () => {
              let choiceArray = [];
              for (let i = 0; i < roleresults.length; i++) {
                choiceArray.push(roleresults[i].title);
              }
              return choiceArray;
            },
            message: "What is the employee's new role?",
          },
        ])
        .then((answer) => {
          let chosenEmp;
          let chosenRole;

          for (let i = 0; i < empresults.length; i++) {
            if (empresults[i].last_name === answer.employee) {
              chosenEmp = empresults[i];
            }
          }

          for (let i = 0; i < roleresults.length; i++) {
            if (roleresults[i].title === answer.role) {
              chosenRole = roleresults[i];
            }
          }
          console.log(chosenEmp);
          console.log(chosenRole);
          connection.query(
            "UPDATE employee SET ? WHERE ?",
            [
              {
                role_id: chosenRole.id,
              },
              {
                id: chosenEmp.id,
              },
            ],
            (err) => {
              if (err) throw err;
              console.log(`Role has been updated!`);
              start();
            }
          );
        });
    });
  });
}

// BONUS POINTS: Remove employee
const removeEmployee = () => {
  connection.query(
    `SELECT employee.first_name, employee.id FROM employee`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      inquirer
        .prompt([
          {
            name: "removeID",
            type: "input",
            message: "Which employee ID would you like to remove?",
          },
        ])
        .then((answer) => {
          connection.query(
            `DELETE FROM employee WHERE id = ?`,
            answer.removeID,
            (err, res) => {
              if (err) throw err;
              console.log("Successfully deleted");
              start();
            }
          );
        });
    }
  );
};

connection.connect((err) => {
  if (err) throw err;
  start();
});

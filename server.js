// MySQL2 installation: https://www.npmjs.com/package/mysql2#installation
// First Query
// get the client
const mysql = require('mysql2');
const inquirer = require('inquirer')

// call once somewhere in the beginning of the app
const cTable = require('console.table');
require('dotenv').config()

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'employee_db',
  password: process.env.DB_PASSWORD
});

// simple query
// Query is a request for information.
// It can be converted into a JSON string.
// If it's a query string, you need to use require('querystring').
connection.query(
  'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);

// with placeholder
connection.query(
  'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
  ['Page', 45],
  function(err, results) {
    console.log(results);
  }
);








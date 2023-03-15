[]// MySQL2 installation: https://www.npmjs.com/package/mysql2#installation
// First Query
// get the client
const mysql = require('mysql2');

// create the connection to database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'test'
// });

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

// Using a Promise Wrapper:
// MySQL2 also support Promise API. Which works very well with ES7 async await.
// A promise is simply a placeholder for an asynchronous task which is yet to be completed. 
// When you define a promise object in your script, instead of returning a value immediately, 
// it returns a promise.
async function main() {
  // get the client
  const mysql = require('mysql2/promise');
  // create the connection
  const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'test'});
  // query database
  const [rows, fields] = await connection.execute('SELECT * FROM `table` WHERE `name` = ? AND `age` > ?', ['Morty', 14]);
}

// MySQL2 use default Promise object available in scope. But you can choose 
// hich Promise implementation you want to use
// get the client
const mysql = require('mysql2/promise');

// get the promise implementation, we will use bluebird
const bluebird = require('bluebird');

// create the connection, specify bluebird as Promise
const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'test', Promise: bluebird});

// query database
const [rows, fields] = await connection.execute('SELECT * FROM `table` WHERE `name` = ? AND `age` > ?', ['Morty', 14]);
// MySQL2 also exposes a .promise() function on Pools, so you can create a promise/non-promise connections from the same pool

// Asynchromous means of or requiring a form of computer control timing protocol in which a specific operation begins upon 
// receipt of an indication (signal) that the preceding operation has been completed.
async function main() {
  // get the client
  const mysql = require('mysql2');
  // create the pool
  const pool = mysql.createPool({host:'localhost', user: 'root', database: 'test'});
  // now get a Promise wrapped instance of that pool
  const promisePool = pool.promise();
  // query database using promises
  const [rows,fields] = await promisePool.query("SELECT 1");
// MySQL2 exposes a .promise() function on Connections, to "upgrade" an existing non-promise connection to use promise

// get the client
const mysql = require('mysql2');
// create the connection
const con = mysql.createConnection(
  {host:'localhost', user: 'root', database: 'test'}
);
con.promise().query("SELECT 1")
  .then( ([rows,fields]) => {
    console.log(rows);
  })
  .catch(console.log)
  .then( () => con.end());}

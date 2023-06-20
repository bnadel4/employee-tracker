const cTable = require('console.table');
const mysql = require('mysql2');
const connection = require('./config/connection');
function Query() {}


Query.viewDepartments = async function () {
  let result = await connection.query("SELECT * FROM department");
  console.table(result[0]);
  console.log('im in here!');
};

Query.viewRoles = async function () { 
  let result = await connection.query("SELECT * FROM role");
  console.table(result[0]);
};

Query.viewEmployees = async function () {
  let result = await connection.query("SELECT * FROM employee");
  console.table(result[0]);
};


module.exports = Query;
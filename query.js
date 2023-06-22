const cTable = require('console.table');
const connection = require('./config/connection');
function Query() {}


Query.viewDepartment = function () {
 connection.query("SELECT * FROM department;", function (error, department) {
  if (error) throw error;
  console.table(department);
 });
};

Query.viewRole = function () { 
  connection.query("SELECT * FROM role;", function (error, role) {
    if (error) throw error;
    console.table(role);
   });
};

Query.viewEmployee = function () {
  connection.query("SELECT * FROM employee;", function (error, employee) {
    if (error) throw error;
    console.table(employee);
   });
};


module.exports = Query;
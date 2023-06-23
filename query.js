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

Query.addDepartment = function (newDepartmentName) {
  console.log('newDepartmentName', newDepartmentName);
  connection.query(`INSERT INTO department (name) 
    VALUES ("${newDepartmentName}");`, function (error, department) {
    if (error) throw error;
    console.log(`${newDepartmentName} has been added to the department table.`);
    Query.viewDepartment();
   });
};

module.exports = Query;
const cTable = require('console.table');
const connection = require('./config/connection');
function Query() {}


Query.viewDepartment = function () {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM department;", function (error, department) {
      if (error) {
        return reject(error);
      }
      return resolve(department);
    });
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
  connection.query(`INSERT INTO department (name) 
    VALUES ("${newDepartmentName}");`, function (error, department) {
    if (error) throw error;
    console.log(`${newDepartmentName} has been added to the department table.`);
    Query.viewDepartment();
   });
};

Query.addRole = function ({newRoleTitle, newRoleSalary, newRoleDepartment}, result) {
  let departmentId = result.find(value => value.name === newRoleDepartment).id;
  console.log('departmentId', departmentId);

  connection.query(`INSERT INTO role (title, salary, department_id) 
    VALUES ("${newRoleTitle}",${newRoleSalary}, ${departmentId});`, function (error, role) {
    if (error) throw error;
    console.log(`${newRoleTitle} has been added to the role table.`);
    Query.viewRole();
  });
};

module.exports = Query;
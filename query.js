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
  return new Promise((resolve, reject) => {
    connection.query(`SELECT role.id, role.title, department.name 
    AS department, role.salary 
    FROM role 
    JOIN department 
    ON role.department_id = department.id;`, function (error, role) {
      if (error) {
        return reject(error);
      }
      return resolve(role);
    });
  });
};

Query.viewEmployee = async function () {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, 
    role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee 
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id
    ;`, function (error, employee) {
      if (error) {
        return reject(error);
      }
      return resolve(employee);
    });
  });
};

Query.getEmployeeId = async function (firstName, lastName) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT id FROM employee WHERE employee.first_name="${firstName}" AND employee.last_name="${lastName}"
    ;`, function (error, employee) {
      if (error) {
        return reject(error);
      }
      return resolve(employee);
    });
  });
};

Query.addDepartment = async function (newDepartmentName) {
  connection.query(`INSERT INTO department (name) 
    VALUES ("${newDepartmentName}");`, function (error) {
    if (error) throw error;
    console.log(`${newDepartmentName} has been added to the department table.`);
  });
};

Query.addRole = async function ({newRoleTitle, newRoleSalary, newRoleDepartment}, result) {
  const departmentId = result.find(value => value.name === newRoleDepartment).id;

  connection.query(`INSERT INTO role (title, salary, department_id) 
    VALUES ("${newRoleTitle}",${newRoleSalary}, ${departmentId});`, function (error) {
    if (error) throw error;
    console.log(`Added ${newRoleTitle} to the database.`);
  });
};

Query.addEmployee = async function ({newEmployeeFirstName, newEmployeeLastName, newEmployeeRole, newEmployeeManager}) {
  const roleData = await Query.viewRole();
  const roleId = roleData.find(value => value.title === newEmployeeRole).id;

  const splitManagerName = newEmployeeManager.split(' ');

  const firstName = splitManagerName[0];
  const lastName = splitManagerName[1];

  const manager = await Query.getEmployeeId(firstName, lastName);
  const managerId = manager[0].id;

  connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
    VALUES ("${newEmployeeFirstName}", "${newEmployeeLastName}", ${roleId}, ${managerId});`, function (error) {
    if (error) throw error;
    console.log(`Added ${newEmployeeFirstName + ' ' + newEmployeeLastName} to the database.`);
  });
};

module.exports = Query;
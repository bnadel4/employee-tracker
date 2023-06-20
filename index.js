const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const query = require('./query');
const connection = require('./config/connection');

// console.log('query', query.viewDepartments());


// connection.connect((err) => {
//   if (err) {
//     console.log('ERROR ', err);
//   }
//   console.log('You are connected');
// });

function runCode() {
  const questions = [
    {
      type: 'list',
      name: 'option',
      message: 'what would you like to do?',
      choices: [
        'view all departments',
        'view all roles',
        'view all employees',
        'add a department',
        'add a role',
        'add an employee',
        'update an employee role'
      ]
    }
  ];
  
  const runQuery = async function (response) {
    switch (response.option) {
      case "view all departments":
        await query.viewDepartments();
        break;
      case "view all roles":
        await query.viewRoles();
        break;
      case "view all employees":
        await query.viewEmployees();
        break;
    }
  };

  inquirer.prompt(questions)
    .then((answers) => {
    console.log('answers', answers.option);
    runCode(answers);
  })
};

runCode();
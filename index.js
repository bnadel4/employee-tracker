const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const fs = require('fs');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '12345678', 
  database: 'employee_tracker',
});

connection.connect((err) => {
  if (err) {
    console.log('ERROR ', err);
  }
  console.log('You are connected');
});

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
    
  ]

  inquirer.prompt(questions)
    .then((answers) => {
    console.log('answers', answers.option);
    processAnswers(answers);
  })
};

runCode();
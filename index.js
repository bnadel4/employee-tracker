const inquirer = require('inquirer');
const query = require('./query');

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
  
  const runQuery = function (response) {
    switch (response.option) {
      case "view all departments":
        query.viewDepartment();
        break;
      case "view all roles":
        query.viewRole();
        break;
      case "view all employees":
        query.viewEmployee();
        break;
    }
  };

  inquirer.prompt(questions)
    .then((answers) => {
    console.log('answers', answers.option);
    runQuery(answers);
  })
};

runCode();
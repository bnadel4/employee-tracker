const inquirer = require('inquirer');
const query = require('./query');

function runCode() {
  const questions = [
    {
      type: 'list',
      name: 'choice',
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

    const addDepartmentName = [
      {
        type: 'input',
        name: 'newDepartmentName',
        message: 'Enter a new department name.'
      },
    ];
  
  const runQuery = function (response) {
    switch (response.choice) {
      case 'view all departments':
        query.viewDepartment();
        break;
      case 'view all roles':
        query.viewRole();
        break;
      case 'view all employees':
        query.viewEmployee();
        break;
      case 'add a department':
        inquirer.prompt(addDepartmentName)
          .then((answers) => {
            query.addDepartment(answers.newDepartmentName);
          });
        break;
    }
  };

  inquirer.prompt(questions)
    .then((answers) => {
    console.log('answers', answers.choice);
    runQuery(answers);
  });
};
  

runCode();
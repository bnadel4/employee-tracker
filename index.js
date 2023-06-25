const inquirer = require('inquirer');
const query = require('./query');
let departments = [];

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
        message: 'What is the name of the department?'
      },
    ];
//WHEN I choose to add a role 
// THEN I am prompted to enter the name, salary, and department already exists in database
// for the role and that role is added to the database
    const addRole = [
      {
        type: 'input',
        name: 'newRoleTitle',
        message: 'What is the name of the role?'
      },
      {
        type: 'input',
        name: 'newRoleSalary',
        message: 'What is the salary of the role?'
      },
      {
        type: 'list',
        name: 'newRoleDepartment',
        message: 'Which department does the role belong to?',
        choices: [],
      },
    ];

   async function getDepartments() {
    let result = await query.viewDepartment();
    addRole[2].choices = result.map(result => result.name);
    return result;
  }
  
  const runQuery = async function (response) {
    switch (response.choice) {
      case 'view all departments':
      let department = await query.viewDepartment();
      console.table(department);
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
      case 'add a role':
       let result = await getDepartments();
        inquirer.prompt(addRole)
          .then((answers) => {
            query.addRole(answers, result);
          });
        break;
    }
  };

  inquirer.prompt(questions)
    .then((answers) => {
    ('answers', answers.choice);
    runQuery(answers);
  });
};
  

runCode();
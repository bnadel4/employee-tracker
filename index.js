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
        message: 'What is the name of the department?'
      },
    ];

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

    const addEmployee = [
      {
        type: 'input',
        name: 'newEmployeeFirstName',
        message: 'What is the employees first name?'
      },
      {
        type: 'input',
        name: 'newEmployeeLastName',
        message: 'What is the employees last name?'
      },
      {
        type: 'list',
        name: 'newEmployeeRole',
        message: 'What is the employees role?',
        choices: [],
      },
      {
        type: 'list',
        name: 'newEmployeeManager',
        message: 'Who is the employees manager?',
        choices: [],
      },
    ];
  
  const runQuery = async function (response) {
    switch (response.choice) {
      case 'view all departments':
      let department = await query.viewDepartment();
      console.table(department);
        break;
      case 'view all roles':
        let role = await query.viewRole();
        console.table(role);
        break;
      case 'view all employees':
       let employees = await query.viewEmployee();
        console.table(employees);
        break;
      case 'add a department':
        inquirer.prompt(addDepartmentName)
          .then(async(answers) => {
            query.addDepartment(answers.newDepartmentName);
            let updatedDepartments = await query.viewDepartment();
            console.table(updatedDepartments);
          });
        break;
      case 'add a role':
       let resultDept = await query.viewDepartment();
       addRole[2].choices = resultDept.map(result => result.name);
        inquirer.prompt(addRole)
          .then(async(answers) => {
            query.addRole(answers, resultDept);
            let updatedRoles = await query.viewRole();
            console.table(updatedRoles);
          });
        break;
      case 'add an employee':
        let result = await query.viewEmployee();
        let roleResult = await query.viewRole();

        addEmployee[2].choices = roleResult.map(result => result.title); // display roles
        addEmployee[3].choices = [...new Set(result.map(result => result.manager).filter(value => value))]; // display managers
        addEmployee[3].choices.push('None');
        inquirer.prompt(addEmployee)
          .then(async(answers) => {
            query.addEmployee(answers, roleResult);
            let updatedEmployees = await query.viewEmployee();
            console.table(updatedEmployees);
          });
        break; 
    }
  };

  // add employee function
  
  

  inquirer.prompt(questions)
    .then((answers) => {
    ('answers', answers.choice);
    runQuery(answers);
  });
};
  

runCode();
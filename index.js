const inquirer = require('inquirer');
const query = require('./query');

console.log(`
  
---------------------------------------------------------------------- 

███████ ███    ███ ██████  ██       ██████  ██    ██ ███████ ███████ 
██      ████  ████ ██   ██ ██      ██    ██  ██  ██  ██      ██      
█████   ██ ████ ██ ██████  ██      ██    ██   ████   █████   █████   
██      ██  ██  ██ ██      ██      ██    ██    ██    ██      ██      
███████ ██      ██ ██      ███████  ██████     ██    ███████ ███████ 
                                                                     
                                                                     
████████ ██████   █████   ██████ ██   ██ ███████ ██████              
   ██    ██   ██ ██   ██ ██      ██  ██  ██      ██   ██             
   ██    ██████  ███████ ██      █████   █████   ██████              
   ██    ██   ██ ██   ██ ██      ██  ██  ██      ██   ██             
   ██    ██   ██ ██   ██  ██████ ██   ██ ███████ ██   ██             
                                                                     
                                                                     
---------------------------------------------------------------------- 
   `);

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

    const updateEmployee = [
      {
        type: 'list',
        name: 'employeeToUpdate',
        message: 'Which employee\'s role do you want to update?',
        choices: [],
      },
      {
        type: 'list',
        name: 'employeeRoleToUpdate',
        message: 'Which role do you want to assign the selected employee?',
        choices: [],
      },
    ];
  
  const runQuery = async function (response) {
    switch (response.choice) {
      case 'view all departments':
        let department = await query.viewDepartment();
        console.table(department);
        runCode();
        break;
      case 'view all roles':
        let role = await query.viewRole();
        console.table(role);
        runCode();
        break;
      case 'view all employees':
        let employees = await query.viewEmployee();
        console.table(employees);
        runCode();
        break;
      case 'add a department':
        inquirer.prompt(addDepartmentName)
          .then(async(answers) => {
            query.addDepartment(answers.newDepartmentName);
            runCode();
          });
        break;
      case 'add a role':
       let resultDept = await query.viewDepartment();
       addRole[2].choices = resultDept.map(result => result.name);
        inquirer.prompt(addRole)
          .then(async(answers) => {
            query.addRole(answers, resultDept);
            runCode();
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
            runCode();
          });
        break; 
      case 'update an employee role':
        let allEmployees = await query.viewEmployee();
        let roles = await query.viewRole();

        updateEmployee[0].choices = allEmployees.map(result => result.first_name + ' ' + result.last_name);
        updateEmployee[1].choices = roles.map(result => result.title);

        inquirer.prompt(updateEmployee)
        .then(async(answers) => {
          query.updateEmployee(answers, roles);
          runCode();
        });
      break; 
    }
  };


  inquirer.prompt(questions)
    .then((answers) => {
      runQuery(answers);
  });
};

runCode();
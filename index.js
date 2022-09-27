const inquirer = require('inquirer');
const { table } = require('console.table');
const server = require('./server');

const db = require('./db/connection');

// function to start 
// function to prompt options: view depts, roles, employees; add dept, role, employee; update employee role
// switch statement depending on choice for view; view of table
// input for add 
// choose update, select which employee, and input to update role and updates database
begin = () =>{
inquirer.prompt(
    [{
        type: 'list',
        name: 'pick',
        message: 'Select One',
        choices: ['view departments', 'view roles', 'view employees', 'add a department', 'add an employee', 'add a role', 'update an employee role', 'exit'],
        loop: false

    }]

)
    .then(function (answer) {
        console.log(answer.pick);
        switch (answer.pick) {
            case "view departments":
                viewDepartments();
                break;
            case "view roles":
                viewRoles();
                break;
            case "view employees":
                viewEmployees();
                break;
            case "add a department":
                addDepartment();
                break;
            case "add an employee":
                addEmployee();
                break;
            case "add a role":
                addRole();
                break;
            case "update an employee role":
                updateEmpRole();
                break;
            case "exit":
                break;
        }
    })

}


function viewDepartments() {
    console.log("you made it to view depts");
    db.query('SELECT * FROM department', (err, res) => {
        if(err) throw err;
        console.table( '\n', res,);
       begin();
    })
};

begin();








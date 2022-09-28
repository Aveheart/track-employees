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

function viewRoles() {
    console.log("you are now viewing all roles");
    db.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table('\n', res,);
        begin();
    })
};

function viewEmployees() {
    console.log("now viewing all employees");
    db.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table('\n', res,);
        begin();
    })
};

function addDepartment() {
    console.log('adding new department');
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDept',
            message: 'Which department would you like to add?',
        }
    ]) .then((response) => {
        db.query(`INSERT INTO department SET ?`, 
        {
            name: response.newDept,
        },
        (err, res) => {
            if (err) throw err;
            console.log(`\n ${response.newDept} successfully added to database! \n`);
            begin();
        })
    })
};

function addEmployee() {
    console.log('adding new employee');
    inquirer.prompt([
        {
            type: 'input',
            name: 'nameFirst',
            message: 'What is employees first name?'
        },
        {
            type: 'input',
            name: 'nameLast',
            message: 'What is the last name?'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is the role id?'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'What is the id of the employees manager?'
        }
    ]) .then((response) => {
        db.query(`INSERT INTO employee SET ?`, 
        {
            first_name: response.nameFirst,
            last_name: response.nameLast,
            role_id: response.roleId,
            manager_id: response.managerId,
        }, 
        (err, res) => {
            if (err) throw err;
        })
        db.query(`INSERT INTO role SET ?`, 
        {
            department_id: response.dept,
        }, 
        (err, res) => {
            if (err) throw err;
            console.log(`\n ${response.nameFirst} ${response.nameLast} successfully added to database! \n`);
            begin();
        })
    })
};


function addRole() {
    console.log('adding new role');
    inquirer.prompt([
        {
            type: "input",
            name: 'newRole',
            message: "Which role would you like to add?"
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the department id?'
        },
    ]) .then((response) => {
        db.query(`INSERT INTO role SET ?`, 
        {
            title: response.newRole,
            salary: response.salary,
            department_id: response.id,
        },
        (err, res) => {
            if (err) throw err;
            console.log(`\n ${response.newRole} successfully added to database! \n`);
            begin();
        })
    })
};
updateEmpRole = () => {
    db.query(`SELECT * FROM role;`, (err, res) => {
        if (err) throw err;
        let roles = res.map(role => ({name: role.title, value: role.role_id }));
        db.query(`SELECT * FROM employee;`, (err, res) => {
            if (err) throw err;
            let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id }));
            inquirer.prompt([
                {
                    name: 'employee',
                    type: 'rawlist',
                    message: 'Which employee would you like to update the role for?',
                    choices: employees
                },
                {
                    name: 'newRole',
                    type: 'rawlist',
                    message: 'What should the employee\'s new role be?',
                    choices: roles
                },
            ]).then((response) => {
                db.query(`UPDATE employee SET ? WHERE ?`, 
                [
                    {
                        role_id: response.newRole,
                    },
                    {
                        employee_id: response.employee,
                    },
                ], 
                (err, res) => {
                    if (err) throw err;
                    console.log(`\n Successfully updated employee's role in the database! \n`);
                    begin();
                })
            })
        })
    })
}

// function updateEmpRole() {
//     console.log('now updating employee role')
//     inquirer.prompt([
//         {
//             type: "input",
//             name: 'updateEmp',
//             message: "Which employee would you like to update?"
//         },
//         {
//             type: 'input',
//             name: 'updateRole',
//             message: 'update to which role?'
//         },
//     ]) .then((response) => {
//         db.query('UPDATE employee SET ? WHERE ?',
//         {
//             role_id: response.employee,


//         }
//         )
//     })
// }

begin();








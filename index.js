const inquirer = require('inquirer');
const { table } = require('console.table');
const server = require('./server');
const db = require('./db/connection');

begin = () => {
    inquirer.prompt(
        [{
            type: 'list',
            name: 'pick',
            message: 'Select One',
            choices: ['view departments', 'view roles', 'view employees', 'add a department', 'add an employee', 'add a role', 'update an employee role', 'delete department', 'delete role', 'delete employee', 'exit'],
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
                case "delete department":
                    deleteDept();
                    break;
                case "delete role":
                    deleteRole();
                    break;
                case "delete employee":
                    deleteEmployee();
                    break;
                case "exit":
                    break;
            }
        })
}

function viewDepartments() {
    console.log("you made it to view depts");
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table('\n', res,);
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
    ]).then((response) => {
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
    ]).then((response) => {
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
    ]).then((response) => {
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


function updateEmpRole() {
    console.log('now updating employee role');
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the employee's ID you want to be updated",
            name: "empId"
        },
        {
            type: "input",
            message: "Enter the new role ID for that employee",
            name: "newRole"
        },
    ]).then((response) => {
        db.query('UPDATE employee SET ? Where ?',
            [
                {
                    role_id: response.newRole
                },
                {
                    id: response.empId
                },
            ],
            (err) => {
                if (err) throw err;
                console.log('\n Employee role updated! \n');
                begin();
            })
    });
};
function deleteDept() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'deleteDept',
            message: 'Enter the department Id that will be deleted?'
        }
    ]).then((response) => {
        db.query('DELETE FROM department WHERE ?',
            {
                id: response.deleteDept
            },
            (err) => {
                if (err) throw err;
                console.log('\n Department deleted! \n');
                begin();
            })
    })
};
function deleteRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'deleteRole',
            message: 'Enter Id of role that will be deleted'
        }
    ]).then((response) => {
        db.query('DELETE FROM role WHERE ?',
            {
                id: response.deleteRole
            },
            (err) => {
                if (err) throw err;
                console.log('\n Role deleted! \n');
                begin();
            })
    })
};
function deleteEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'deleteEmp',
            message: 'Enter the employee Id that will be deleted'
        }
    ]).then ((response) => {
        db.query('DELETE FROM employee WHERE ?',
        {
            id: response.deleteEmp
        },
        (err) => {
            if(err) throw err;
            console.log('\n Employee deleted! \n');
            begin();
        })
    })
}
begin();


// DELETE FROM produce
// WHERE id = 2;


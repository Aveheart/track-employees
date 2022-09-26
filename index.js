const inquirer = require('inquirer');
const {table} = require('console.table');
const server = require('./server');
const mysql = require('mysql2');

// function to start 
// function to prompt options: view depts, roles, employees; add dept, role, employee; update employee role
// switch statement depending on choice for view; view of table
// input for add 
// choose update, select which employee, and input to update role and updates database

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Hello@27',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

function menu() {
  inquirer.prompt([
    {
        type: 'list',
        name: 'pick',
        message: 'Select One',
        choices: ['view departments', 'view roles', 'view employees', 'add a department', 'add an employee', 'add a role', 'update an employee role', 'exit']
    }
      ])};
 
      switch(menu.pick) {
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
menu();
  
      
    
   


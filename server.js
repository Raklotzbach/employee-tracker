
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
// require('dotenv').config();


const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'GoFiat20',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

db.connect(function(err) {
    if (err) throw err;
    begin();
})

function begin() {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'choices',
            message: 'Please Select an Option',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role'
            ]
        }
    ])
    .then((answers) => {
        const { choices } = answers;

        if (choices === 'View All Departments') {
            departments();
        }

        if (choices === 'View All Roles') {
            roles();
        }

        if (choices === 'View All Employees') {
            employees();
        }

        if (choices === 'Add a Department') {
            addDepartment();
        }

        if (choices === 'Add a Role') {
            addRole();
        }

        if (choices === 'Add an Employee') {
            addEmployee();
        }

        if (choices === 'Update and Employee Role') {
            updateEmployee();
        }
    })
}

departments = () => {

    db.query('SELECT * FROM department', function(err, results) {
        if (err) throw err;
        console.table('All Departments', results);
        begin();
    })
}

roles = () => {

    db.query('SELECT * FROM role', function(err, results) {
        if (err) throw err;
        console.table('All Roles', results);
        begin();
    })
}

 employees = () => {

    db.query('SELECT * FROM employee', function(err, results) {
        if (err) throw err;
        console.table('All Employees', results);
        begin();
    })
}

addDepartment = () => {
        inquirer.prompt ([
            {
                name: 'newDepartment',
                type: 'input',
                message: 'Please Enter the Department Name'
            }
        ])
        .then (function (answer) {
            db.query('INSERT INTO department SET?', {name: answer.newDepartment});
        

         db.query('SELECT * FROM department', function(err, results) {
            if (err) throw err;
            console.table('All Departments', results);
            begin();
            })
        })}

addRole = () => {
        inquirer.prompt ([
            {
                name: 'newRole',
                type: 'input',
                message: 'Please Enter the Name of the New Role'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Enter the numerical value for the salary'
            },
        ])
        .then (function (answer) {
            db.query('INSERT INTO role SET?', {name: answer.newRole, salary: answer.salary});
        

         db.query('SELECT * FROM role', function(err, results) {
            if (err) throw err;
            console.table('All Roles', results);
            begin();
            })
        })}

addEmployee = () => {
        inquirer.prompt ([
            {
                name: 'firstName',
                type: 'input',
                message: 'Please Enter the First Name of the New Employee'
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'Please Enter the Last Name of the New Employee'
            },
        ])
        .then (function (answer) {
            db.query('INSERT INTO employee SET?', {name: answer.firstName, name: answer.lastName});
        

         db.query('SELECT * FROM employee', function(err, results) {
            if (err) throw err;
            console.table('All Employees', results);
            begin();
            })
        })}
    


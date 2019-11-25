const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Balebale123*",
    database: "employee_manager_db"
});

connection.connect((err) => {
    if (err) throw err;
    start();
});

// Starting up the Employee Manager

function start(){
    // Asks user what they want to do
    inquirer
    .prompt({
       name: "functionChoice",
       type: "list",
       message: "What would you like to do?",
       choices: ["View all employees", "View Departments", "View Managers"] 
    })
    .then((answer) => {
        if (answer.functionChoice === "View all employees"){
            readAllEmployees();
        }
        else if (answer.functionChoice === "View Departments"){
            readDepartments();
        }
        else if (answer.functionChoice === "View Managers"){
            readManagers();
        } else {
            connection.end();
        }
    });
}

// Function to list all employees in the database

function readAllEmployees() {
    connection.query("SELECT * FROM employees", (err, results) =>{
        if (err) throw err;
        inquirer
        .prompt({
            name: "employee",
            type: "rawlist",
            choices: () => {
                var employeeArray = [];
                for (var i =0; i < results.length; i++){
                    employeeArray.push(results[i].first_name + " " + results[i].last_name);
                }
                return employeeArray;
            },
            message: "Which employee would you like to view?"
        })
        .then((answer) => {
            var chosenEmployee;
            for (var i =0; i < results.length; i++){
                if (results[i].first_name + " " + results[i].last_name === answer.employee) {
                    chosenEmployee = results[i];
                }
            }
            console.table(chosenEmployee);
        });
    });
}

// Function to list all departments

function readDepartments(){
    connection.query("SELECT * FROM departments", (err, results) => {
        if (err) throw err;
        inquirer
        .prompt({
            name: "department", 
            type: "rawlist",
            choices: () => {
                var departmentArray = [];
                for (var i =0; i < results.length; i++){
                    departmentArray.push(results[i].name);
                }
                return departmentArray;
            },
        })
        .then((answer) => {
            var chosenDepartment;
            for (var i =0; i < results.length; i++){
                if (results[i].name === answer.department) {
                    chosenDepartment = results[i];
                }
            }
            console.table(chosenDepartment);
        });
    });
}

// Function to list all roles



// Function to create an employee entry



// Function to update an employee's information



// Function to delete an employee from the database
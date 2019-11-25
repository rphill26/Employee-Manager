const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require('console.table');

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
       choices: ["View all employees", "View Departments", "Add Department",
       "View Managers","Add Employee","Create Role", "Update Employee", "Delete Employee"] 
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
        }
        else if (answer.functionChoice === "Add Department"){
            addDepartment(); 
        }
        else if (answer.functionChoice === "Add Employee"){
            addEmployee();
        }
        else if (answer.functionChoice === "Update Employee"){
            updateEmployee();
        } 
        else if (answer.functionChoice === "Delete Employee"){
            deleteEmployee();
        }
        else {
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
            console.table([chosenEmployee]);
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
            console.table([chosenDepartment]);
        });
    });
}
// Function to create an employee entry
    function addEmployee(){
      connection.query("SELECT * FROM departments", (err, results) => {
       if (err) throw err;  
        inquirer
         .prompt([
             {
                 name: "firstName",
                 type: "input", 
                 message: "Enter their first name..."
             },
             {
                 name: "lastName",
                 type: "input",
                 message: "Enter their last name..."
             },
             {
                 name: "department",
                 type: "list",
                 choices: () => {
                    var departmentArray = [];
                    for (var i =0; i < results.length; i++){
                        departmentArray.push(results[i].name);
                    }
                    return departmentArray;
                },
                message: "What department will they work for?"
             }, 
             {
                name: "role",
                type: "input",
                message: "What is their role?"
             }        
         ]) 
         .then((answer) => {
             connection.query("INSERT INTO employees", (err, results) => {
                if (err) throw err;
                console.log("Employee successfully added...")
             });
         });
    });
  }
// Function to update an employee's information



// Function to delete an employee from the database
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
       choices: ["View all employees", "View all employees by Department", "View all employees by Manager"] 
    })
    .then((answer) => {
        if (answer.functionChoice === "View all employees"){
            readAllEmployees();
        }
        else if (answer.functionChoice === "View all employees by Department"){
            readDepartments();
        }
        else if (answer.functionChoice === "View all employees by Manager"){
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
            name: "choices",
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
    });
}
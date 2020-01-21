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

function returnDepartmentList() {
    var departmentStr = "SELECT name FROM department";
    return connection.query(departmentStr);
}
function returnRoleList() {
    var roleStr = "SELECT title FROM roles";
    return connection.query(roleStr);
}
function returnEmployeeList() {
    var employeeStr = "SELECT first_name FROM employees";
    return connection.query(employeeStr);
}

// Starting up the Employee Manager
function start(){
    // Asks user what they want to do
    inquirer
    .prompt({
       name: "functionChoice",
       type: "list",
       message: "What would you like to do?",
       choices: ["View Departments", "Add Department","Add Role","View Roles",
       "Add Employee","View Employees", "Update Employee", "Delete Employee"] 
    })
    .then((answer) => {
        if (answer.functionChoice === "View Departments"){
            viewDepartments();
        }
        else if (answer.functionChoice === "View Managers"){
            readManagers();
        }
        else if (answer.functionChoice === "Add Department"){
            addDepartment(); 
        }
        else if (answer.functionChoice === "Add Role"){
            addRole();
        }
        else if (answer.functionChoice === "View Roles"){
            viewRole();
        }
        else if (answer.functionChoice === "Add Employee"){
            addEmployee();
        }
        else if (answer.functionChoice === "View Employees"){
            viewEmployees();
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

// Function to list all departments\
async function viewDepartments(){
    inquirer
     .prompt([
         {
             name: "viewDepartments",
             type: "list",
             choices: await returnDepartmentList(),
             message: "What departent would you like to view?"
         }
     ])
     .then(function(answer) {
         connection.query("SELECT * FROM department", 
            {
                name: answer.viewDepartments
            },
            function (err) {
                if (err) throw err;
                start();
            }
         );
     })
}
// Function to add a Role
function addRole(){
    inquirer
     .prompt([
         {
            name: "addRole",
            type: "input",
            message: "What role would you like to add?"
         },
         {
            name: "addRoleSalary",
            type: "input",
            message: "What is this role's Salary?"
         },
         {
            name: "addRoleDepartment",
            type: "input",
            message: "What is the department ID?"
         }
     ])
     .then(function(answer){
         connection.query("INSERT INTO role SET ?",
            {
                title: answer.addRole,
                salary: answer.addRoleSalary,
                department_id: answer.addRoleDepartment
            },
            function (err) {
                if (err) throw err;
                console.log("You successfully added a role")
                start();
            }
         );
     })
}
// Function to view Roles
async function viewRole(){
    inquirer
     .prompt([
         {
             name: "viewRole",
             type: "list",
             choices: await returnRoleList(),
             message: "What role would you like to view?"
         }
     ])
     .then(function(answer) {
         connection.query("SELECT * FROM role", 
            {
                name: answer.viewRole
            },
            function (err) {
                if (err) throw err;
                start();
            }
         );
     })
}
// Function to create an employee entry
function addEmployee(){
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
            name: "roleId",
            type: "input",
            message: "What is their role id?"
            },
            {
            name: "managerId",
            type: "input",
            message: "What is their manager ID?"
            }        
        ]) 
        .then(function(answer) {
            connection.query("INSERT INTO employee SET ?", 
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.roleId,
                manager_id: answer.managerId
            },
            function (err) {
                if (err) throw err;
                console.log("You successfully added an employee")
                start();
            }
            );
        });
}
//Function to view Employees
async function viewEmployees(){
    inquirer
     .prompt ([
         {
            name: "viewEmployees",
            type: "list",
            choices: await returnEmployeeList(),
            message: "Which employee would you like to view?"
         }
     ])
     .then(function(answer){
         connection.query("SELECT * FROM employee",
            {
                name: answer.viewEmployees
            },
            function (err) {
                if (err) throw err;
                start();
            }
         );
     })
}
// Function to update an employee's information
function updateEmployee(){
    console.log("Employee information updated...");
}
// Function to delete an employee from the database
function deleteEmployee(){
    console.log("Employee deleted from database...")
}
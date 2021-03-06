const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Balebale123*",
  database: "employee_manager_db"
});

console.log(
  " ███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗       \n",
  "██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝        \n",
  "█████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗          \n",
  "██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝          \n",
  "███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗        \n",
  "╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝        \n",
  "\n",
  "███╗   ███╗ █████╗ ███╗   ██╗ █████╗  ██████╗ ███████╗██████╗        \n",
  "████╗ ████║██╔══██╗████╗  ██║██╔══██╗██╔════╝ ██╔════╝██╔══██╗       \n",
  "██╔████╔██║███████║██╔██╗ ██║███████║██║  ███╗█████╗  ██████╔╝       \n",
  "██║╚██╔╝██║██╔══██║██║╚██╗██║██╔══██║██║   ██║██╔══╝  ██╔══██╗       \n",
  "██║ ╚═╝ ██║██║  ██║██║ ╚████║██║  ██║╚██████╔╝███████╗██║  ██║       \n",
  "╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝       \n"
);

start();

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: [
          "View all employees",
          "View all departments",
          "View all roles",
          "Alter Employee List"
        ]
      }
      // function uses switch case to determine next query from response
    ])
    .then(function(response) {
      const action = response.action;
      switch (action) {
        case "View all employees":
          sqlQuery(
            "SELECT employee.id,first_name,last_name,title,department,manager FROM employee INNER JOIN role ON employee.role = role.title;",
            true,
            start
          );
          break;
        case "View all departments":
          sqlQuery("SELECT * FROM department", true, start);
          break;
        case "View all roles":
          sqlQuery("SELECT * FROM role", true, start);
          break;
        case "Alter Employee List":
          alterData();
          break;
        default:
          console.log("Error: Can't Determine Choice");
          break;
      }
    });
}
// function will start if user wants to alter database in some way and asks user in what way it should be altered
function alterData() {
  inquirer
    .prompt({
      type: "list",
      message: "How would you like to alter the employee list?",
      name: "alter",
      choices: [
        "Remove Employee",
        "Add Employee",
        "Update Employee's Role",
        "Update Employee's Manager"
      ]
    })
    .then(function(response) {
      const alterType = response.alter;
      let employArr = [];
      employArr = sqlQuery(
        "SELECT first_name,last_name FROM employee",
        false,
        () => console.log(res)
      );
      console.log(employArr);

      switch (alterType) {
        case "Remove Employee":
          sqlQuery("SELECT first_name,last_name FROM employee");
          inquirer.prompt({
            type: "list",
            message: "Which employee would you like to remove?",
            name: "removeWhich",
            choices: employees
          });
          break;
        case "Add Employee":
          break;
        case "Update Employee's Role":
          break;
        case "Update Employee's Manager":
          break;
        default:
          console.log("Error: Can't Determine Choice");
          break;
      }
    });
}

function sqlQuery(request, log, cb) {
  connection.query(request, function(err, res) {
    if (err) throw err;
    console.log("Connection Made!");
    if (log) {
      console.table(res);
    }
    if (cb) {
      cb();
    }
    return res;
  });
}

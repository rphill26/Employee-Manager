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
    console.log("connected as id " + connection.threadId);
});
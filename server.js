const inquirer = require("inquirer");
const cTable = require('console.table');
const mysql = require('mysql2');

const connection = mysql.connection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employeesDB'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log(`Employee Tracker`)
    firstPrompt();
});


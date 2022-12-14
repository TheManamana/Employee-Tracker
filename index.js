const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');
require('dotenv').config();


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the employee_db database.`)
)

init = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Welcome to Employee-Tracker',
                name: 'init',
                choices: ["Continue", "Quit"],
            }
        ]).then((data) => {
            if (data.init === "Quit") {
                endProgram();
            } else {
                mainMenu();

            }
        })
}

mainMenu = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Choose a function',
                name: 'menu',
                choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add An Employee", "Update An Employee Role", "Quit"],
            }
        ]).then((data) => {
            switch (data.menu) {
                case "View All Departments":
                    showDepartments();
                    break;
                case "View All Roles":
                    showRoles();
                    break;
                case "View All Employees":
                    showEmployees();
                    break;
                case "Add A Department":

                    break;
                case "Add A Role":

                    break;
                case "Add An Employee":

                    break;
                case "Update An Employee Role":

                    break;


                default: endProgram();

            }
        })

}

showDepartments = () => {
    db.query(`SELECT * FROM department`, (err, results) => {
        console.table(results)
        mainMenu()
    })
}

showRoles = () => {
    db.query(
        `SELECT role.id AS ID, 
        role.title AS Title, 
        role.salary AS Salary, 
        department.department_name AS Department FROM role JOIN department ON role.department_id = department.id ORDER BY role.id;`, function (err, results) {
        console.table(results);
        mainMenu()
    });
}

showEmployees = () => {
    db.query(
        `SELECT employee.id AS ID, 
        employee.first_name AS First_Name, 
        employee.last_name AS Last_Name, 
        role.title AS Title, 
        role.salary AS Salary, 
        employee.manager_id AS Manager, 
        department.department_name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY ID;`, function (err, results) {
        console.table(results);
        mainMenu()
    })

}

endProgram = () => {
    process.exit(0);
}

init();
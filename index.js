const mysql = require('mysql2');
const inquirer = require('inquirer');
const conTable = require('console.table');
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
                    
                    break;
                case "View All Roles":

                    break;
                case "View All Employees":

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

endProgram = () => {
    process.exit(0);
}

init();
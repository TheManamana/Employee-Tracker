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
                    addNewDepartment();
                    break;
                case "Add A Role":
                    addNewRole();
                    break;
                case "Add An Employee":
                    addNewEmployee();
                    break;
                case "Update An Employee Role":

                    break;


                default: endProgram();

            }
        })

}

addNewDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'Input',
                message: 'What is the name of your new department?',
                name: 'departmentName',
            }
        ])
        .then((data) => {
            db.query("INSERT INTO department (department_name) VALUES (?);", data.departmentName, (err, results) => {
                console.log("Successfully added new department");

            })
            mainMenu();
        })
}

addNewRole = async () => {

    var departments = [];

    db.query(`SELECT * FROM department`, (err, results) => {


        results.forEach(department => {
            departments.push(department.department_name);

        });
    });

    inquirer
        .prompt([
            {
                type: 'Input',
                message: 'What is the title of your new role?',
                name: 'roleTitle',
            },
            {
                type: 'Input',
                message: 'What is the new roles salary?',
                name: 'roleSalary',
            },
            {
                type: 'list',
                message: 'What is the department id that the new role is a part of?',
                name: 'roleDepartmentId',
                choices: departments,

            }
        ])
        .then((data) => {

            var depId;
            for (let i = 0; i < departments.length; i++) {
                if(departments[i]===data.roleDepartmentId){
                    depId = i + 1;
                }
            }

            db.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?);", [data.roleTitle, data.roleSalary, depId], (err, results) => {
                console.log("Succesfully added new role");

            })
            mainMenu();
        })
}

addNewEmployee = async () => {

    var roles = [];
    var employees = [];

    db.query(`SELECT * FROM role`, (err, results) => {


        results.forEach(role => {
            roles.push(role.title);

        });
    });
    db.query(`SELECT * FROM employee`, (err, results) => {


        results.forEach(employee => {
            employees.push(`${employee.first_name} ${employee.last_name}`);

        });
    });

    inquirer
        .prompt([
            {
                type: 'Input',
                message: 'What is the employees first name?',
                name: 'firstName',
            },
            {
                type: 'Input',
                message: 'What is the employees last name?',
                name: 'lastName',
            },
            {
                type: 'list',
                message: 'Who is the employees manager?',
                name: 'manager',
                choices: employees,

            },
            {
                type: 'list',
                message: 'What is the employees title?',
                name: 'title',
                choices: roles,

            }
        ])
        .then((data) => {

            var managerId;
            var roleId;
            for (let i = 0; i < employees.length; i++) {
                if(employees[i]===data.manager){
                    managerId = i + 1;
                }
            }
            for (let i = 0; i < roles.length; i++) {
                if(roles[i]===data.title){
                    roleId = i + 1;
                }
            }

            db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);", [data.firstName, data.lastName, roleId, managerId], (err, results) => {
                console.log("Succesfully added new employee");

            })
            mainMenu();
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
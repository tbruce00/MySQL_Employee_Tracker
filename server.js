const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Dharmabum00',
    database: 'employee_db'
})

connection.connect((err) => {
    if (err) throw err;
    runTracker();
});

const runTracker = () => {
    inquirer
        .prompt({
            name: 'choice',
            type: 'rawlist',
            message: 'What would you like to do',
            choices: [
                'Add Department, Role, or Employee',
                'Update Employee Role',
                'View Departments, Roles, Employees',
                'Exit'

            ],
        })
        .then((answer) => {
            switch(answer.choice) {
                case 'Add Department, Role, or Employee':
                    addList();
                    break;
                case 'Update Employee Role':
                    updateEmployee();
                    break;
                case 'View Departments, Roles, Employees':
                    viewList();
                    break;
                default:
                    console.log('Thanks for using the Tracker');
                    connection.end();
                    break;        
            }
        });
};

const addList = () => {
    inquirer
    .prompt( [
        {
            name: 'add',
            type: 'list',
            message: 'What would you like to add?',
            choices: ['Department', 'Role', 'Employee', 'Exit']
        }
    ]).then((answer) => {
        switch(answer.add) {
            case 'Department':
                addDepartment();
                break;
            case 'Role':
                addRole();
                break;
            case 'Employee':
                addEmployee();
                break;
            default:
                runTracker();
                break;    
        }
    })
};

const addDepartment = () => {
    inquirer
    .prompt([
        {
            name: 'department',
            type: 'input',
            message: 'What Department would you like to add?'
        }
    ]).then((answer) => {
        connection.query(
            `INSERT INTO Department (name)
            VALUES('${answer.department}')`,
            (err, answer) => {
                if(err) throw err;
                console.table(`Added ${answer.department}.`);
                runTracker();
            }
        )
    })
};

const addRole = () => {
    connection.query(
        `SELECT * FROM Department ORDER BY id`,
        (err, answer) => {
            if (err) throw err;
        }
    );

    inquirer
    .prompt([
        {
            name: 'role',
            type: 'input',
            message: 'What Role would you like to add?'
        },
        {
            name: 'salary',
            type: 'input',
            message: ' What is the roles salary?'
        },
        {
            name: 'deptId',
            type: 'input',
            message: 'What is the roles ID?'
        }
    ]).then((answer) => {
        connection.query(
            'INSERT INTO Roles SET ?',
            {
                title: `${answer.role}`,
                salary: answer.salary,
                department_id: answer.department_id
            },
            (err, answer) => {
                if (err) throw err;
                console.table(`New Role Added.`);
                runTracker();
            }
        )
    })
};

const addEmployee = () => {
    inquirer
    .prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'What is the employees first name?'
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'What is the employees last name?'
        },
        {
            name: 'roleId',
            type: 'input',
            message: 'What is the employees Role ID?'
        }
    ]).then((answer) => {
        connect.query(
            `INSERT INTO Employee (first_name, last_name, role_id, manager_id)
            VALUES ('${answer.firstName}', '${answer.lastName}', '${answer.roldeId}', NULL)`,
        (err, answer) => {
                if (err) throw err;
                console.table(`New Employee Added.`);
                runTracker();
        }
        )
    }) 
};


const updateEmployee = () => {

};

const viewList = () => {
    inquirer
    .prompt([
        {
            name: 'chooseView',
            type: 'list',
            message: 'Which would you like to view?',
            choices: ['Departments', 'Roles', 'Employees'],
        }
    ]).then((answer) => {
        switch(answer.chooseView) {
            case 'Departments':
                viewDept();
                break;
            case 'Roles':
                viewRoles();
                break;
            case 'Employees':
                viewEmployees();
                break;
            default:
                runTracker();
                break;            
        }
    })
};

const viewDept = () => {
    connection.query(
        `SELECT * FROM Departments ORDER BY id`,
        (err, answer) => {
            if(err) throw err;
            console.table("Departments:", answer);
            runTracker();
        }
    )
};

const viewRoles = () => {
    connection.query(
        `SELECT * FROM Roles ORDER BY id`,
        (err, answer) => {
            if(err) throw err;
            console.table("Roles:", answer);
            runTracker();
        }
    )
};

const viewEmployees = () => {
    connection.query(
        `SELECT * FROM Employees ORDER BY id`,
        (err, answer) => {
            if (err) throw err;
            console.table("Employees:", answer);
            runTracker();
        }
    )
};



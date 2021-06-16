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
                'Delete Employees, Departments, or Roles',
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
                case 'Delete Employees, Departments, or Roles':
                    deleteList();
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
            `INSERT INTO Departments (name)
            VALUES('${answer.department}')`,
            (err, answer) => {
                if(err) throw err;
                console.table(`Added new Department`);
                runTracker();
            }
        )
    })
};

const addRole = () => {
    connection.query(
        `SELECT * FROM Departments ORDER BY id`,
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
            `INSERT INTO Employees (first_name, last_name, role_id, manager_id)
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
    connection.query(
        `SELECT * FROM Employees ORDER BY id`,
        (err, answer) => {
            if (err) throw err;
            console.table("Employees:", answer);
    inquirer
    .prompt([
        {
            name: 'employeID',
            type: 'input',
            message: 'Update the role of the Employee by the new Role ID you want that employee to have',
        },
    ]).then((answer) => {
        connection.query(
            `UPDATE Employees SET ? WHERE ?`,
            [
                {
                    role_id: answer.roleID,
                },
                {
                    id: answer.employeeID
                }
            ],
            (err, answer) => {
                if(err) throw err;
                console.log("Employee has been updated");
                runTracker();
            })
            });
        });

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

const deleteList = () => {
    inquirer
    .prompt([
        {
            name: 'deleteList',
            type: 'list',
            message: 'Which would you like to delete?',
            choices: ['Employees', 'Departments', 'Roles'],
        }
    ]).then((answer) => {
        switch(answer.deleteList) {
            case 'Employees':
                deleteEmployee();
                break;
            case 'Departments':
                deleteDept();
                break;
            case 'Roles':
                deleteRole();
                break;
            default:
                runTracker();
                break;            
        }
    })
};

const deleteEmployee = () => {
    connection.query(
        `SELECT * FROM Employees ORDER BY id`,
        (err, answer) => {
            if (err) throw err;
            console.table("Employees:", answer);
    inquirer
    .prompt([
        {
            name: 'deleteEmployee',
            type: 'input',
            message: 'Select the employee you would like to delete by the ID of that employee'
        },
    ]).then((answer) => {
        connection.query(
            `DELETE * FROM Employees WHERE ?`,
            [
                {
                    id: answer.employeeID
                }
            ],
            (err, answer) => {
                if(err) throw err;
                console.log("Employee has been deleted");
                runTracker();
            })
            });
        });

};

const deleteDept = () => {
    connection.query(
        `SELECT * FROM Departments ORDER BY id`,
        (err, answer) => {
            if (err) throw err;
            console.table("Departments:", answer);
    inquirer
    .prompt([
        {
            name: 'deleteDept',
            type: 'input',
            message: 'Select the department you would like to delete by the ID of that department'
        },
    ]).then((answer) => {
        connection.query(
            `DELETE * FROM Departments WHERE ?`,
            [
                {
                    id: answer.departmentID
                }
            ],
            (err, answer) => {
                if(err) throw err;
                console.log("Department has been deleted");
                runTracker();
            })
            });
        });

};

const deleteRole = () => {
    connection.query(
        `SELECT * FROM Roles ORDER BY id`,
        (err, answer) => {
            if (err) throw err;
            console.table("Roles:", answer);
    inquirer
    .prompt([
        {
            name: 'deleteRole',
            type: 'input',
            message: 'Select the role you would like to delete by the ID of that role'
        },
    ]).then((answer) => {
        connection.query(
            `DELETE * FROM Roles WHERE ?`,
            [
                {
                    id: answer.roleID
                }
            ],
            (err, answer) => {
                if(err) throw err;
                console.log("Role has been deleted");
                runTracker();
            })
            });
        });

};

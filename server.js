const inquirer = require('inquirer');
const db = require('./db/connection');

db.connect((error) => {
    if (error) throw error;
    console.log('Success! Connected to database');
    askInit();
});

let firstQuestion = [
    {
        type: 'list',
        name: 'whatToDo',
        message: 'What would you like to do?',
        choices: [
            'View all employees',
            'View Employees by Department',
            'View Employee by Manager',
            'Add Employee',
            'Update Employee Role',
            'Update Employee Manager',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
            'Quit'
        ]
    }
]

let whichDepartment = [
    {
        name: 'departmentName',
        message: 'What is the name of the role you would like to add?'
    }
]

let whichRole = [
    {
        name: 'roleName',
        message: 'What is the role you would like to add?'
    },
    {
        name: 'salaray',
        type: 'number',
        message: 'What is the salary of this role?'
    },
    {
        type: 'list',
        name: 'whichDepart',
        message: 'Which department does this role belong to?',
        choices: []
    }
]

let whatEmployee = [
    {
        name: 'firstName',
        message: 'What is the first name of the employee you would like to add?'
    },
    {
        name: 'lastName',
        message: 'What is the last name of the employee you would like to add?'
    },
    {
        name: 'role',
        type: 'list',
        message: 'What is the role of the current employee?',
        choices: []
    },
    {
        type: 'list',
        name: 'whichManager',
        message: 'Who is the manager of the current employee?',
        choices: []
    }
]

let updateEmployeeQuestion = [
    {
        type: 'list',
        name: 'employeeName',
        message: "What is the name of the employee who's role you'd like to update?",
        choices: []
    },
    {
        type: 'list',
        name: 'newManager',
        message: 'What is the new role of this employee?',
        choices: []
    }
]

let updateEmpManagerQuestion = [
    {
        type: 'list',
        name: 'employeeName',
        message: "What is the name of the employee who's manager you'd like to update?",
        choices: []
    },
    {
        type: 'list',
        name: 'newManager',
        message: 'Who is their new manager?',
        choices: []
    }
]

let viewByDepartmentQuestions = [
    {
        type: 'list',
        name: 'whichDepartment',
        message: 'Which Department would you like to check?',
        choices: []
    }
]

let viewByManagerQuestions = [
    {
        type: 'list',
        name: 'whichManager',
        message: 'Which Manager would you like to check?',
        choices: []
    }
]

function askInit() {
    inquirer.prompt(initialQuestion).then((answers) => {
        switch (answers.whatToDo) {
            case 'View All Employees':
                getEmployees();
                break;
            case 'View All Roles':
                getRoles();
                break;
            case 'View All Departments':
                getDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'Update Employee Manager':
                updateEmployeeManager();
                break;
            case 'View Employees by Department':
                viewByDepartment();
                break;
            case 'View Employee by Manager':
                viewByManager();
                break;
            case 'Quit':
                console.log('Good Bye!');
                process.exit();
                break;
            default:
                break;
        }
    })
};

let getEmployees = () => {
    db.query("SELECT * FROM employee;", (err, data) => {
        console.table(data);
        askInit();
    })
};

let getRoles = () => {
    db.query("SELECT * FROM role;", (err, data) => {
        console.table(data);
        askInit();
    })
};

let getDepartments = () => {
    db.query("SELECT * FROM department;", (err, data) => {
        console.table(data);
        askInit();
    })
};

let addDepartment = () => {
    inquirer.prompt(whichDepartment)
        .then((response) => {
            db.query(`INSERT INTO department (name) VALUES (?);`, [response.departmentName], (err, data) => {
                console.log("\n-----------------------------------------\n")
                console.log("New department has been successfully added!")
                console.log("\n-----------------------------------------\n")
                askInit();
            })
        })
};

let addRole = () => {
    db.query("SELECT * FROM department;", (err, data) => {
        whichRole[2].choices = data.map((element) => ({ value: element.id, name: element.name }));
        inquirer.prompt(whichRole)
            .then((response) => {
                db.query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?);`,
                    [response.roleName, response.salary, response.whichDepart],
                    (err, data) => {
                        console.log("\n-----------------------------------------\n")
                        console.log("New role has been successfully added!")
                        console.log("\n-----------------------------------------\n")
                        askInit();
                    })
            })
    })
};
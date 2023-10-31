//packages that are needed for this application
const inquire = require ('inquirer');
const mysql = require('mysq12');
//cfonts will display title in nice font when app is initalized
const cfonts = require('cfonts');
const { default: inquirer } = require('inquirer');

//this connects MySQL to this application
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: '',
    database: "employeeTracker_db",

});
//this is how you connect to the database
connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database!");
    //this starts the application
    start();
});

//using cfonts from npm package"cfonts" to customize display font
cfonts.say('Michigan Greats /nEmployee Tracker /nGO BLUE!!', {
    font: 'block',
    align: 'left',
    colors: ['yellow'],
    background: 'blue',
    letterSpacing: 1,
    space: true,
    maxLength: '0',
    gradient: false,
    independenGradient: false,
    transitionGradient: false,
    env: 'node'

});
//Need the following functions
//function for all departments
function viewAllDepartments(){
    const query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if (err) throw err;
        start();
    });
}

//function for all roles
function viewAllRoles() {
    const query = "SELECT roles.title, roles.id, departments.department_name, roles.salary from roles join departments on roles.department_id =departments.id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}


//function for all view all employees
function viewAllEmployees() {
    const query = `SELECT e.id, e.first_name, e.last_name, d.department_name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name 
    FROM employee e
    LEFT JOIN roles r ON e.role_id = r.id
    LEFT JOIN departments d ON r.department_id = d.id
    LEFT JOIN employee M ON e.manager_id = m.id;`;
    connection.query(query, (err, res) => {
        if (err) throw err; 
        console.table(res);
        start();
    });
}

//adding a department
function addDepartment(){
    inquirer
        .prompt({
            type:"input",
            name: "name",
            message: "Enter the name of the Department",
        })
        .then((answer) => {
            console.log(answer.name);
            const query = `INSERT INTO departments (department_name) VALUES ("${answer.name}")`;
            connection.query(query, (err, res) => {
                if (err) throw err;
                console.log(`Department ${answer.name} has been added to the database!`);
                start();
                console.log(answer.name);
            });
        });
}
//adding a role
function addRole() {
    const query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if (err) throw err;
        inquire
            .prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter the title of the new role:',
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the salary of the new role:',
                },
                {
                    type: 'list',
                    name: 'department',
                    message: "Select the department for the new role.",
                    choices: res.map(
                        (department) => department.department_name
                    ),

                },
                
            ])
            .then((answers) => {
                const department = res.find(
                    (department) => department.name === answers.department
                );
                const query = "INSERT INTO roles SET ?";
                connection.query(
                    query,
                    {
                        title: answers.title,
                        salary: answers.slary,
                        department_id: department,
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log(
                            `Added role${answers.title} with salary ${answers.salary} to the ${answers.department} department!`
                        );
                        start()
                    }
                );
            });
    });
}

//adding an employee

//updating employee role

//application needs to be able to..
//add a department 
//add a role including name, salary, and department
//add employee including first and last name, role, and manager
//adding employee role including employee selection and new role.




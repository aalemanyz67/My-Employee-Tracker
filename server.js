//packages that are needed for this application
const inquirer = require('inquirer');
const mysql = require('mysql2');
//cfonts will display title in nice font when app is initalized
const cfonts = require('cfonts');


//this connects MySQL to this application
const connection = mysql.createConnection({
    host: 'co28d739i4m2sb7j.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: "g6l2cusqcql2jpz5",
    password: 'vo7obwcfqu13rafb',
    database: "whsf6qsgsxub6cv6",

});
//this is how you connect to the database
connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database!");
    //this starts the application
    start();
});

//using cfonts from npm package"cfonts" to customize display font
cfonts.say('Michigan Greats Employee Tracker GO BLUE!!', {
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
//THis Function will initialize my application
function start(){
    inquirer
        .prompt({
            type: "list",
            name: "action",
            message: "What would you like to look at or do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case "viewAllDepartments":
                    viewAllDepartments();
                    break;
                case "View all roles":
                    viewAllRoles();
                    break;
                case "View all employees":
                    viewAllEmployees();
                    break;
                case "Add a department":
                    addDepartment();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Update an employee role":
                    updateEmployeeRole();
                    break;

            }
        });
}
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
function addEmployee(){
    connection.query("SELECT id, title FROM roles", (error, results) => {
        if (error) {
            console.error(error);
            return;
        }
        const roles = results.map(({id, title}) => ({
            name: title,
            value: id,
        }));

        //using this query to get a list of employees from the database
        connection.query(
            'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee',
            (error, results) => {
                if (error) {
                    console.error(error);
                    return;
                }
                const managers = results.map(({ id, name }) => ({
                    name, 
                    value: id,

                }));

                //prompt for user to input user information
                inquirer
                    .prompt([
                        {
                            type: "input",
                            name: 'firstName',
                            message: "Enter the employee's first name:",
                        },
                        {
                            type: "input",
                            name: 'lastName',
                            message: 'input the employees last name:'

                        },
                        {
                            type: 'list',
                            name: 'roleID',
                            message: 'Select the employee role:',
                            choices: 'roles',
                        },
                        {
                            type: 'list',
                            name: 'managerId',
                            message: 'Select the employee manager:',
                            choices: [
                                {name: 'None', value: null},
                                ...managers,
                            ],
                        },

                    ])
                    .then((answers) => {
                        const sql =
                            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                        const values = [
                            answers.firstName,
                            answers.lastName,
                            answers.roleId,
                            answers.managerId,
                            
                        ];
                        connection.query(sql, values, (error) => {
                            if (error) {
                                console.error(error);
                                return;
                            }
                            console.log("Employee added successfully");
                            start();
                        });

                    })
                    .catch((error) => {
                        console.error(error);
                    });
                
            }
        );
    });
}

//Function to add managers
function addManager(){
    const queryDepartments = "SELECT * FROM departments";
    const queryEmployees = "SELECT * FROM employee";

    connection.query(queryDepartments, (err, resDepartments) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'department',
                    message: "Select the department:",
                    choices: resDepartments.map(
                        (department) => department.department_name
                    ),
                },
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Select the employee ato add a manager to:',
                    choices: resEmplouees.map(
                        (employee) =>
                        `${employee.first_name} ${employee.last_name}`
                    ),

                },
                {
                    type: 'list',
                    name: 'manager',
                    message: 'Select the employees manager:',
                    choice: resEmployees.map(
                        (employee) =>
                            `${employee.first_name} ${employee.last_name}`
                    ),
                },
            ])
            .then ((answers) => {
                const department = resDepartments.find(
                    (department) =>
                        department.department_name === answers.department
                );
                const employee = resEmployees.find(
                    (employee) =>
                        `${employee.firs_name} ${empl0yee.last_name}` ===
                        answers.employee

                );
                const manager = resEmployees.find(
                    (employee) =>
                    `${employee.first_name} ${employee.last_name}` ===
                    answers.manager
                );
                const query = 
                "UPDATE employee SET manager_id = ? WHERE id =? AND role_id IN (SELECT id FROM roles WHERE department_id = ?)";
                connection.query(
                    query,
                    [manager.id, employee.id, department.id],
                    (err, res) => {
                        if (err) throw err;
                        console.log(
                            `Added manager ${manager.first_name} ${manager.last_name}  to employee ${employee.first_name} ${employee.last_name} in department ${department.department_name}!`
                        );
                        start()
                    }                
                );
            });
    });
}


//application needs to be able to..
//add a department 
//add a role including name, salary, and department
//add employee including first and last name, role, and manager
//adding employee role including employee selection and new role.


//Bonus: 
//update employee manager
//view employees by manager
//view emplyess by department
//delet departments, roles, and emplyees.
//view the total utilized budget of a department




//packages that are needed for this application
const inquire = require ('inquirer');
const mysql = require('mysq12');
//cfonts will display title in nice font when app is initalized
const cfonts = require('cfonts');

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
})
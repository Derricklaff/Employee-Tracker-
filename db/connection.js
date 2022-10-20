const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: '',
    password: 'mypassword'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Succesfully connected to database')
});

module.exports = db;
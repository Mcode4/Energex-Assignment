const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3306,
    user: process.env.ADMIN_USER,
    password: process.env.ADMIN_PASSWORD,
    database: process.env.DATABASE_NAME,
    multipleStatements: true
});

connection.connect((err) => {
    if(err) {
        console.log('Error connecting to the MySQL Database');
        return;
    }
    console.log('Connection established successfully');
});

const createTables = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255),
        content VARCHAR(255),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`;

connection.query(createTables, (err, res) => {
    if(err) throw err;
    console.log('Table created');
});


module.exports = connection;
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

// Create connection without database selected first
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true
});

const sqlPath = path.join(__dirname, 'database.sql');
let sql = fs.readFileSync(sqlPath, 'utf8');

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL');

    const hashedPassword = bcrypt.hashSync('password123', 8);
    sql = sql.replace(/\$2a\$08\$8ZqJZ5Z5Z5Z5Z5Z5Z5Z5ZuK7qK7qK7qK7qK7qK7qK7qK7qK7qK7qK/g, hashedPassword);

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing SQL script:', err);
            process.exit(1);
        }
        console.log('Database initialized successfully');
        console.log('Dummy users created with password: password123');
        connection.end();
    });
});

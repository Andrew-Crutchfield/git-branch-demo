const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'Andrew',
    password: 'cawl_admech',
    database: 'chirps'
});

pool.on('error', (err) => {
    console.error('MySQL Pool Error:', err);
});

process.on('SIGINT', () => {
    pool.end();
    console.log('Database connection pool closed.');
    process.exit();
});

module.exports = pool.promise();
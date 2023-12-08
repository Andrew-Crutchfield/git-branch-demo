const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'Andrew',
    password: 'cawl_admech',
    database: 'chirps'
});

module.exports = pool.promise();
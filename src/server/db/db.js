const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'andrew',
  password: 'cawl_admech',
  database: 'chirps',
});

module.exports = pool.promise();
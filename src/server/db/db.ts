import mysql, { ResultSetHeader } from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'andrew',
    password: process.env.DB_PASS || 'cawl_admech',
    database: process.env.DB_NAME || 'chirps',
});

const Query = async <Generic = ResultSetHeader>(sql: string, values: unknown[] = []) => {
    try {
        const [rows] = await pool.query(sql, values);
        return rows as unknown as Promise<Generic>;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
};

process.on('SIGINT', async () => {
    try {
        await pool.end();
        console.log('Database connection pool closed.');
    } catch (error) {
        console.error('Error closing the database connection pool:', error);
    } finally {
        process.exit();
    }
});

export default Query;
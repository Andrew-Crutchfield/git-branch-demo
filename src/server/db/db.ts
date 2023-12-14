import mysql, { ResultSetHeader } from "mysql2/promise";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Blogs",
});

const Query = async <Generic = ResultSetHeader>(sql: string, values: unknown[] = []) => {
    const [rows] = await pool.query(sql, values);
    return rows as unknown as Promise<Generic>;
};

process.on("SIGINT", () => {
    pool.end();
    console.log("Database connection pool closed.");
    process.exit();
});

export default Query;

// db.js

import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

export default db;

export async function runSQL(query, params) {
    try {
        const results = await db.query(query, params);
        return results;
    } catch (error) {
        console.log(error);
        return [];
    }
}

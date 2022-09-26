import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// Create new connection to database
const databaseConnection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});


export default databaseConnection;
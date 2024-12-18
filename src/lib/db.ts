import mysql from "mysql2/promise";
import { fail } from "assert";

const credentials: mysql.PoolOptions = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: 4000,
};

const pool = mysql.createPool(credentials);

// Test the connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connection successful");
    connection.release();
  } catch (error) {
    fail(`Database connection failed: ${error}`);
  }
};

testConnection();

export default pool;

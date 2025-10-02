import mysql from "mysql2/promise"

// Create a connection pool. The application will hang if it cannot connect.
// In a real environment, ensure these environment variables are set.
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "127.0.0.1",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD, // No insecure fallback
  database: process.env.MYSQL_DATABASE || "yotecuido_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default pool
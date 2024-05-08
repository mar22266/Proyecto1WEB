import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'db', // Use the Docker service name for the MySQL container
  user: 'andre',
  database: 'soccer_blog_db',
  password: 'and',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  port: 3306  
});

export default pool;

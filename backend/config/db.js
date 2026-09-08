const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Yeh function automatically tables create kar dega ya update karega
const initDB = async () => {
  try {
    // 1. Users Table with Specific Roles (admin, sender, receiver)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'sender', 'receiver') DEFAULT 'sender',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // 2. Shipments Table with Status Tracking
    await pool.query(`
      CREATE TABLE IF NOT EXISTS shipments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        trackingId VARCHAR(255) UNIQUE NOT NULL,
        sender VARCHAR(255) NOT NULL,
        receiver VARCHAR(255) NOT NULL,
        destination VARCHAR(255) NOT NULL,
        weight VARCHAR(50) NOT NULL,
        status VARCHAR(50) DEFAULT 'Processing',
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log('✅ MySQL Tables Checked/Created Successfully with Roles');
  } catch (error) {
    console.error('❌ MySQL Table Creation Error:', error.message);
  }
};

initDB();

module.exports = pool;
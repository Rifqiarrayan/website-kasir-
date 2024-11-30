const mysql = require('mysql2');

// Konfigurasi koneksi ke database
const db = mysql.createConnection({
  host: 'localhost',  
  user: 'root',       
  password: '',       
  database: 'kasirapp', 
});

// Koneksi ke database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

module.exports = db;

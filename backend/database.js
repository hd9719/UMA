const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = process.env.DATABASE_PATH || './database.sqlite';

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Initialize database tables
const initDatabase = () => {
  const createTyresTableQuery = `
    CREATE TABLE IF NOT EXISTS tyres (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      brand TEXT NOT NULL,
      model TEXT NOT NULL,
      size TEXT NOT NULL,
      type TEXT NOT NULL,
      stock_quantity INTEGER NOT NULL DEFAULT 0,
      price REAL NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const createSalesTableQuery = `
    CREATE TABLE IF NOT EXISTS sales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tyre_id INTEGER NOT NULL,
      brand TEXT NOT NULL,
      model TEXT NOT NULL,
      size TEXT NOT NULL,
      type TEXT NOT NULL,
      quantity_sold INTEGER NOT NULL DEFAULT 1,
      sale_price REAL NOT NULL,
      customer_name TEXT,
      customer_phone TEXT,
      notes TEXT,
      sale_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (tyre_id) REFERENCES tyres(id)
    )
  `;

  db.run(createTyresTableQuery, (err) => {
    if (err) {
      console.error('Error creating tyres table:', err.message);
    } else {
      console.log('Tyres table ready');
    }
  });

  db.run(createSalesTableQuery, (err) => {
    if (err) {
      console.error('Error creating sales table:', err.message);
    } else {
      console.log('Sales table ready');
    }
  });
};

// Helper function to run queries with promises
const runQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

// Helper function to get all rows
const getAllRows = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Helper function to get a single row
const getRow = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

module.exports = {
  db,
  initDatabase,
  runQuery,
  getAllRows,
  getRow
};

const { initDatabase } = require('./database');

console.log('Initializing database...');
initDatabase();

setTimeout(() => {
  console.log('Database initialization complete!');
  process.exit(0);
}, 1000);

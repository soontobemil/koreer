require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  max: 10, // optional: max number of clients in the pool
  idleTimeoutMillis: 30000, // optional: close idle clients after 30 seconds
});

module.exports = pool;
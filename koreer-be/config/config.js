// Configurations
require('dotenv').config();

module.exports = {
    // add other configurations
    development : {
      use_db_url: 'DATABASE_URL',
      dialect: 'postgres',
      dialectOptions: {
        ssl: false // SSL 비활성화
      }
    },
    production: {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      dialect: 'postgres',
      schema: 'public',
    },
  };
  
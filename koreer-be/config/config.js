// config/config.js
require('dotenv').config();

module.exports = {
    development: {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      dialect: 'postgres'
    },
    // 다른 환경에 대한 설정도 추가 가능
  };
  
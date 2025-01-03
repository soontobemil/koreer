// Initialize database for pg
const { Sequelize } = require('sequelize');
const config = require('../config/config');
const fs = require('fs');
const path = require('path');

//const env = 'railway';
const env = process.env.NODE_ENV || 'development';;
const dbConfig = config[env];

let sequelize;

if (dbConfig.use_db_url) {
  sequelize = new Sequelize(process.env[dbConfig.use_db_url], dbConfig);
} else {
  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect
  });
}


const db = {};

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Sequelize.Op; // This is for query reconstruction using condition

// Sync all models with the database
db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });

module.exports = db;

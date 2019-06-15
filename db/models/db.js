const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/stocks-ttp', {
  logging: false
});

module.exports = db;

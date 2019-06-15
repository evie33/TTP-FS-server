const Sequelize = require('sequelize');
const db = require('./db');

const Stock = db.define('stock', {
  tickersymbol: {
    type: Sequelize.STRING
  },
  shares: {
    type: Sequelize.INTEGER
  },
  buyPrice: {
    type: Sequelize.INTEGER
  }
});

module.exports = Stock;

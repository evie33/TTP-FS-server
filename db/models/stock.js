const Sequelize = require('sequelize');
const db = require('./db');

const Stock = db.define('stock', {
  tickerSymbol: {
    type: Sequelize.STRING
  },
  buyQuantity: {
    type: Sequelize.INTEGER
  },
  buyPrice: {
    type: Sequelize.FLOAT
  }
});

module.exports = Stock;

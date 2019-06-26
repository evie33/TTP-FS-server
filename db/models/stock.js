const Sequelize = require('sequelize');
const db = require('./db');

const Stock = db.define('stock', {
  tickerSymbol: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  totalBuy: {
    type: Sequelize.DECIMAL(10, 2)
  },
  currentPrice: {
    type: Sequelize.DECIMAL(10, 2)
  }
});

module.exports = Stock;

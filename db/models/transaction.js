const Sequelize = require('sequelize');
const db = require('./db');

const Transaction = db.define('transaction', {
  totalBuy: {
    type: Sequelize.DECIMAL(10, 2)
  },
  totalSell: {
    type: Sequelize.DECIMAL(10, 2)
  },
  tickerSymbol: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER
  }
});

module.exports = Transaction;

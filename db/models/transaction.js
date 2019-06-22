const Sequelize = require('sequelize');
const db = require('./db');

const Transaction = db.define('transaction', {
  buyPrice: {
    type: Sequelize.FLOAT
  },
  sellPrice: {
    type: Sequelize.FLOAT
  },
  tickerSymbol: {
    type: Sequelize.STRING
  },
  sellQuantity: {
    type: Sequelize.INTEGER
  },
  buyQuantity: {
    type: Sequelize.INTEGER
  }
});

module.exports = Transaction;

const Sequelize = require('sequelize');
const db = require('./db');

const Transaction = db.define('transaction', {
  buyDate: {
    type: Sequelize.DATE
  },
  sellDate: {
    type: Sequelize.DATE
  },
  buyPrice: {
    type: Sequelize.INTEGER
  },
  sellPrice: {
    type: Sequelize.INTEGER
  },
  tickerSymbol: {
    type: Sequelize.STRING
  },
  sellAmout: {
    type: Sequelize.INTEGER
  },
  buyAmount: {
    type: Sequelize.INTEGER
  }
});

module.exports = Transaction;

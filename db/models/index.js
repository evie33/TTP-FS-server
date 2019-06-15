const db = require('./db');

const User = require('./user');
const Transaction = require('./transaction');
const Stock = require('./stock');

User.hasMany(Transaction);
Transaction.belongsTo(User);

User.hasMany(Stock);
Stock.belongsTo(User);

Transaction.belongsToMany(Stock, { through: 'stock_transaction' });
Stock.belongsToMany(Transaction, { through: 'stock_transaction' });

const { stock_transaction: StockTransaction } = db.models;

module.exports = {
  db,
  User,
  Stock,
  Transaction,
  StockTransaction
};

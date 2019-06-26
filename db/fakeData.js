// -------------------- USER DATA -----------------------
const users = [
  {
    name: 'Evie',
    email: 'evie@email.com',
    password: '123'
  }
];

// ----------------- Transaction History --------------------
const transactions = [
  {
    tickerSymbol: 'AAPL',
    totalBuy: 6,
    quantity: 3,
    userId: 1
  },
  {
    tickerSymbol: 'AAPL',
    totalSell: 10,
    quantity: 2,
    userId: 1
  },
  {
    tickerSymbol: 'ABC',
    totalBuy: 7,
    quantity: 4,
    userId: 1
  }
];

// -------------------- Current Own Stocks ----------------------------

const stocks = [
  {
    tickerSymbol: 'ABC',
    quantity: 4,
    totalBuy: 7,
    userId: 1
  },
  {
    tickerSymbol: 'AAPL',
    quantity: 4,
    totalBuy: 6,
    userId: 1
  }
];

const stockTransactions = [
  {
    stockId: 2,
    transactionId: 3
  },
  {
    stockId: 1,
    transactionId: 1
  },
  {
    stockId: 1,
    transactionId: 2
  }
];

module.exports = { users, transactions, stocks, stockTransactions };

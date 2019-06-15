const { db, User, Stock, Transaction } = require('./models/index.js');
const {
  users,
  stocks,
  transactions,
  stockTransactions
} = require('./fakeData.js');

const { stock_transaction: StockTransactions } = db.models;

const seed = () =>
  Promise.all(users.map(user => User.create(user)))
    .then(() => Promise.all(stocks.map(stock => Stock.create(stock))))

    .then(() =>
      Promise.all(
        transactions.map(transaction => Transaction.create(transaction))
      )
    )
    .then(() =>
      Promise.all(
        stockTransactions.map(history => StockTransactions.create(history))
      )
    );

const main = () => {
  console.log('syncing db....');
  db.sync({ force: true })
    .then(() => {
      console.log('database seeding GREAT... ^^ ');
      return seed();
    })
    .catch(err => {
      console.log('Error seeding/... T^T ');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();

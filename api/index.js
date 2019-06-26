const router = require('express').Router();
const axios = require('axios');
const Transaction = require('../db/models/transaction');
const Stock = require('../db/models/stock');

/* --------- stocks-----------*/
router.post('/stocks/purchase', async (req, res, next) => {
  try {
    const [stock, wasCreated] = await Stock.findOrCreate({
      where: {
        tickerSymbol: req.body.tickerSymbol,
        userId: req.user.id
      }
    });
    if (!wasCreated) {
      const newQuantity =
        parseInt(stock.quantity) + parseInt(req.body.quantity);
      const newTotal =
        parseFloat(stock.totalBuy) + parseFloat(req.body.totalBuy);
      const updatedStock = await stock.update({
        quantity: newQuantity,
        totalBuy: newTotal
      });

      res.json(updatedStock);
    } else {
      const newStock = await stock.update({
        quantity: req.body.quantity,
        totalBuy: req.body.totalBuy
      });
      res.json(newStock);
    }
  } catch (err) {
    console.log(err);
  }
});

router.put(
  '/stocks/updateCurrentPrice/:tickerSymbol',
  async (req, res, next) => {
    try {
      const stock = await Stock.findOne({
        where: { tickerSymbol: req.params.tickerSymbol }
      });
      const updateStock = await stock.update({ currentPrice: req.body.data });
      res.json(updateStock);
    } catch (err) {
      console.log(err);
    }
  }
);

router.get('/stocks/all', async (req, res, next) => {
  try {
    const stocks = await Stock.findAll({
      where: {
        userId: req.user.id
      }
    });

    res.json(stocks);
  } catch (err) {
    console.error(err);
  }
});

router.get('/stocks/current/:tickerSymbol', async (req, res, next) => {
  try {
    const tickerSymbol = req.params.tickerSymbol;
    const { data } = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${tickerSymbol}/price?token=pk_b093ac4b6c7c49ac8d8ace1ec1789f9a`
    );
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});

router.get('/stocks/:tickerSymbol', async (req, res, next) => {
  try {
    const tickerSymbol = req.params.tickerSymbol;
    const { data } = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${tickerSymbol}/quote?token=pk_b093ac4b6c7c49ac8d8ace1ec1789f9a`
    );
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});

/* --------- transactions -----------*/
router.get('/transactions', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: {
        userId: req.user.id
      }
    });
    res.json(transactions);
  } catch (err) {
    console.error(err);
  }
});

router.post('/transactions/update', async (req, res, next) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.json(transaction);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

const router = require('express').Router();
const axios = require('axios');
const Transaction = require('../db/models/transaction');
const Stock = require('../db/models/stock');

router.post('/stocks/purchase', async (req, res, next) => {
  try {
    const transaction = await Transaction.create(req.body);

    let stock = await Stock.findOne({
      where: { tickerSymbol: req.body.tickerSymbol }
    });

    if (stock) {
      stock = await stock.update({
        where: {
          buyQuantity: this.buyQuantity + req.body.buyQuantity,
          buyPrice:
            (this.buyPrice + req.body.buyPrice) /
            (this.buyQuantity + req.body.buyQuantity)
        }
      });
      console.log(
        '------------',
        stock,
        'check out the updated price and quantity for the storkc'
      );
    } else {
      stock = await Stock.create(req.body);
      console.log('------------', stock, '<<<<<<<<<<new stock ');
    }

    res.json(transaction);
  } catch (err) {
    console.log(err);
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
    console.log(err);
  }
});

module.exports = router;

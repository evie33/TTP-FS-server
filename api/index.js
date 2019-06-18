const router = require('express').Router();

router.get('/stocks', (req, res, next) => {
  res.send(' stocks here ');
});

module.exports = router;

const router = require('express').Router();
const User = require('../db/models/user');

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      console.log('No such user found:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else {
      req.login(user, err => (err ? next(err) : res.redirect('/auth/user')));
    }
  } catch (err) {
    next(err);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.put('/user', async (req, res, next) => {
  try {
    const userUpdate = await User.findOne({ where: { id: req.body.userId } });
    const user = await userUpdate.update({
      balance: req.body.balance
    });

    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get('/user', async (req, res, next) => {
  try {
    console.log(req.user);
    const newUser = await User.findOne({ where: { email: req.user.email } });
    if (newUser.balance !== req.user.balance) {
      res.json(newUser);
    }
    res.json(req.user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

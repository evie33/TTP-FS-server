const express = require('express');
const app = express();

const morgan = require('morgan');
const compression = require('compression');
const session = require('express-session');
const passport = require('passport');
const db = require('./db');

// passport registration
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => {
  try {
    console.log('-------', user);
    // const user = await User.fndOne({ where: { id: id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'));

  // body parsing middleware
  app.use(require('body-parser').text());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // compression middleware
  app.use(compression());

  // session middleware with passport
  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // auth and api routes
  app.use('/auth', require('./auth'));
  app.use('/api', require('./api'));

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

const port = 5000;
const startListening = () => {
  app.listen(port, () => console.log(`server running on port ${port} `));
};

const syncDb = () => db.sync();

async function bootApp() {
  await syncDb();
  await createApp();
  await startListening();
}

bootApp();

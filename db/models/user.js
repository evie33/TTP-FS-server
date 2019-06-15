const Sequelize = require('sequelize');
const db = require('./db');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING
  },
  balance: {
    type: Sequelize.INTEGER,
    defaultValue: 5000,
    validate: {
      min: 0
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = User;

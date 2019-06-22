const Sequelize = require('sequelize');
const crypto = require('crypto');
const db = require('./db');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING
  },
  balance: {
    type: Sequelize.FLOAT,
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
    get() {
      return () => this.getDataValue('password');
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt');
    }
  }
});

/* ------------------- instance  method ------------------- */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/* ------------------- class method ------------------- */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

/* ---------------------- hooks ------------------- */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

module.exports = User;

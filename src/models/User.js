const { Sequelize, DataTypes } = require('sequelize');
const db = require('../loaders/postgreDB');

const User = db.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

User.sync({ alter: true });

module.exports = User;

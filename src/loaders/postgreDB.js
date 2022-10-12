const { Sequelize } = require('sequelize');

// connection to database
module.exports = new Sequelize('invent-library-management-system', 'postgres', '12345', {
  host: 'localhost',
  dialect: 'postgres',
});

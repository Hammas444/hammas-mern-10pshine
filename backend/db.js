const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Notes', 'postgres', 'notes', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize.authenticate()
  .then(() => console.log('Connected to PostgreSQL with Sequelize'))
  .catch(err => console.error('Unable to connect:', err));

module.exports = sequelize;

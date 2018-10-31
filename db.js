const Sequelize = require('sequelize');

const sequelize = new Sequelize('serverStars', 'postgres', process.env.PASS ,{
  host: 'localhost',
  dialect: 'postgres'
});

sequelize.authenticate().then(
  function() {
    console.log('Connect to postgres database');
  },
  function(err){
    console.log(err);
  }
);

module.exports = sequelize;
<<<<<<< HEAD
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
=======
const Sequelize = require('sequelize')
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
})
sequelize.authenticate().then(
    function() {
        console.log('Conneted to postgres DB')
    },
    function(err){
        console.log(err)
    }
)
module.exports = sequelize
>>>>>>> dev-serv

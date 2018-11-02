var express = require('express')
var router = express.Router()
var sequelize = require('../db')
const User = sequelize.import('../models/user');
const Goals = sequelize.import('../models/goals.js')
const jwt = require('jsonwebtoken');
const UserGoals = require('../models/userGoals')
Goals.belongsToMany(User, { through: UserGoals, foreignKey:sequelize.id});
// User.belongsToMany(Goals, { through: UserGoals })
User.hasMany(Goals)
// Goals.belongsTo(User)

router.get('/list', function(req,res){
    UserGoals.findAll({
      include:[{
      model:userGoals,
      through:{
        attributes:['createdAt' ]
      }
    }]
  })})
  //This will add methods getUsers, setUsers, addUser,addUsers to Project, and getProjects, setProjects, addProject, and addProjects to User.
  

  

  module.exports= router;
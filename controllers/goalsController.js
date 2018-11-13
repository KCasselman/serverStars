var express = require('express')
var router = express.Router()
var sequelize = require('../db')
var Goal = sequelize.import('../models/goal')
var User=sequelize.import('../models/user')


// Goal.sync({force:true})


router.put('/addgoal/:id', (req,res)=>{
    User.findOne({where:{id:req.params.id}})
    .then(user=>{user.createGoal({  
      userId:user.id,
      goal:req.body.goal,
        message:req.body.message,
        starred:req.body.starred,
        dueDate: req.body.dueDate
    })})
    .then(goal=>res.json(goal))
  })
  


//find one goal
router.get('/onegoal/:id', (req,res)=>{
    Goal.findOne({where:{id:req.params.id}})
    .then(goallist => res.status(200).json(goallist))
})




module.exports= router;
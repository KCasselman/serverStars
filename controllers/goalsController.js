var express = require('express')
var router = express.Router()
var sequelize = require('../db')
var Goal = sequelize.import('../models/goal')
var User=sequelize.import('../models/user')
const validateSession= require('../middleware/validate-session')

// Goal.sync({force:true})


//find one goal
router.get('/onegoal/:id',validateSession, (req,res)=>{
    Goal.findOne({where:{id:req.params.id}})
    .then(goallist => res.status(200).json(goallist))
})




module.exports= router;
var express = require('express')
var router = express.Router()
var sequelize = require('../db')
var Goal = sequelize.import('../models/goal')
const validateSession= require('../Middleware/validate-session')

// Goal.sync({force:true})


//find one goal
router.get('/onegoal/:id',validateSession, (req,res)=>{
    Goal.findOne({where:{id:req.params.id}})
    .then(goallist => res.status(200).json(goallist))
})




module.exports= router;
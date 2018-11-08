const router = require('express').Router()
const sequelize = require('../db');
const User=sequelize.import('../models/user')
// User.sync({force:"true"})

// router.put('/:id', (res,req)=>{
//     let message=req.body.message
//     let starred=req.body.starred

//     User
//     .findOne({where:{id:req.params.id}})
//     .then(user=>{createGoal({
//       userId:user.id,
//       goal:goal,
//       message:message,
//       starred:starred

//     })})
//     .then(goal=>res.json(goal))
//   }
//   )



module.exports= router
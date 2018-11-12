var express = require('express')
var router = express.Router()
var sequelize = require('../db')
var validateSession = require('../middleware/validate-session')
var Goal = sequelize.import('../models/goal')
var User=sequelize.import('../models/user')

// Goal.sync({force:true})
//add a goal
// router.put('/addgoal/:id', (res,req)=>{
//     User.findOne({ where:{id:req.params.id}})
//     .then(user=>{user.createGoal({
//       userId:user.id,
//       goal:req.body.goal,
//       message:req.body.message,
//       starred:req.body.starred
  
//     })})
    // .then(goal=>res.json(goal))
//     console.log(data)
//   }
//   )


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
  

// update a goal
router.put('/updategoal/:id', (req,res) => {
    Goal
    .update(req.body, {where: {id:req.params.id}})
    .then(goal=> res.json(goal))
}
)

//find one goal
router.get('/onegoal/:id', (req,res)=>{
    Goal.findOne({where:{id:req.params.id}})
    .then(goallist => res.status(200).json(goallist))
})


  
//delete a goal
router.delete('/delete/:id', (req, res) => {
    var data = req.params.id;
    Goal.destroy({
        where: { id: data }
    })
        .then(Goal => res.status(200).json(Goal))
        .catch(err => res.status(500).json({
            error: err
        })
        )
})

module.exports= router;
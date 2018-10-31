var express = require('express')
var router = express.Router()
var sequelize = require('../db')
var validateSession = require('../middleware/validate-session')
var Goals = sequelize.import('../models/goals.js')
//Goals.sync({force:"true"})

router.get('/getall', (req, res) => {
    Goals.findAll({})
    .then(goals => res.status(200).json(goals))
    .catch(err => res.status(500).json({error:err}))
})

router.post('/create', function (req, res){
    var goal = req.body.goal
    var stars = req.body.stars
    var dueDate= req.body.dueDate
    var pin= req.body.pin
    Goals.create({
        goal: goal,
        stars: stars,
        dueDate:dueDate,
        pin:pin
    }).then(
        function creatSucesss(goal){
            res.json({
                goal:goal,
                message:"What a goal."
            })
            function createError(err) {
                res.send(500, err.message)
            }
        }
    )
})

router.put('/:id', (req, res, next) =>{
    Goals.update({
        goal:req.body.goal,
        stars: req.body.stars,
        dueDate: req.body.dueDate,
        pin:req.body.pin
    },
     { returning: true, where: { id: req.params.id } },
    )
        .then(function ([updatedGoals]) {
            res.json(updatedGoals)
        }).catch(next)
})

router.delete('/delete/:id', (req, res) => {
    var data = req.params.id;
    Goals.destroy({
        where: { id: data }
    })
        .then(Goals => res.status(200).json(Goals))
        .catch(err => res.status(500).json({
            error: err
        })
        )
})

module.exports= router;
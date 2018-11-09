var express = require('express');
var router = express.Router();
var sequelize = require('../db');
const validateSession = require('../middleware/validate-session');
var Goal = sequelize.import('../models/goal');
var User = sequelize.import('../models/user');

router.get('/getall', (req, res) => {
    Goal.findAll({})
    .then(Goal => res.status(200).json(Goal))
    .catch(err => res.status(500).json({error:err}))
})

router.post('/create', function (req, res){
    var goal = req.body.goal
    var message = req.body.message
    var dueDate= req.body.dueDate
    var starred= req.body.starred
    Goal.create({
        goal: goal,
        message:message,
        dueDate:dueDate,
        starred:starred
    }).then(
        function creatSucesss(goal){
            res.json({
                goal:goal,
                message:"Goal Added."
            })
            function createError(err) {
                res.send(500, err.message)
            }
        }
    )
})

router.put('/:id', (req, res, next) => {
    Goal.update({
        goal:req.body.goal,
        message: req.body.message,
        dueDate: req.body.dueDate,
        starred:req.body.starred
    },
     { returning: true, where: { id: req.params.id } },
    )
        .then(function ([updatedGoal]) {
            res.json(updatedGoal)
        }).catch(next)
})

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
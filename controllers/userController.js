const router = require('express').Router()
const sequelize = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateSession = require('../middleware/validate-session');
const User = sequelize.import('../models/user');
const Goal = sequelize.import('../models/goal');

User.sync({force:true})


router.post('/register', function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const pin = req.body.pin;
  const stars = req.body.stars;  
  const password = req.body.password

  User
    .create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      pin: pin,
      stars: stars,
      password: bcrypt.hashSync(password, 10)
      
    })
    .then(
      createSuccess = (user) => {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
        res.json({
          user: user,
          message: 'created',
          token: token
        });
      },
      function createError(err) {
        res.status(500, err.message);
      }
    );
});

//get user goals
router.get('/userlist/:id', (req,res)=>{
  Goal.findAll({where:{userId:req.params.id}})
  .then(goallist => res.status(200).json(goallist))
})

//goal update
router.put('/goal/:id', (req,res)=>{
  User.findOne({where:{id:req.params.id}})
  .then(user=>{user.createGoal({
      userId:user.id,
      message:req.body.message,
      goal:req.body.goal,
      dueDate: req.body.dueDate,
      starred:req.body.starred
  })})
  .then(goal=>res.json(goal))
})

//Get single item for User
router.get('/:id', function(req, res) {
  const data = req.params.id;

  User.findOne(
      {where: {id: data}})
    .then(
      function findOneSuccess(data) {
        res.json(data);
      },
      function findOneError(err) {
        res.send(500, err.message);
      }
    );
});


router.post('/login', function (req, res) {
  User.findOne({ where: { email: req.body.email } }
  ).then(
    function (user) {
      if (user) {
        bcrypt.compare(req.body.password, user.passwordhash, function (err, matches) {
          if (matches) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
            res.json({
              user: user,
              message: "successfully authenticated",
              token: token
            });
          } else {
            res.status(502).send({ error: "you failed, yo" });
          }
        });
      } else {
        res.status(500).send({ error: "failed to authenticate" });
      }
    },
    function (err) {
      res.status(501).send({ error: "you failed, yo" });
    }
  );
});

//GET ALL
router.get("/", (req, res) =>
  User.findAll()
    .then(data => res.json(data))
    .catch(err => res.status(500).json(req.errors))
);

//Update 
router.put('/:id', function (req, res) {
  const data = req.params.id;
  const email = req.body.email;
  const password = req.body.password;
  const pin = req.body.pin;
  const stars = req.body.stars

  User
    .update({
      email: email,
      password:bcrypt.hashSync(password, 10),
      pin: pin,
      stars:stars
    },
      { where: { id: data, } }
    ).then(
      function updateSuccess(updatedStars) {
        res.json({
          updatedStars: updatedStars
        });
      },
      function updateError(err) {
        res.send(509, err.message);
      }
    )
});

//DELETE 
router.delete("/:id", (req, res) =>
  User.destroy({ where: { id: req.params.id } })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(req.errors))
);



module.exports = router
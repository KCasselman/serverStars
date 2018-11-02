const router = require('express').Router()
const sequelize = require('../db');
const User = sequelize.import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateSession = require('../middleware/validate-session')
// User.sync({force:"true"})





router.post('/', function (req, res) {
  const firstName = req.body.user.firstName;
  const lastName = req.body.user.lastName;
  const email = req.body.user.email;
  const pin = req.body.user.pin;
  const stars = req.body.user.stars;
  const pass = req.body.user.pass

  User
    .create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      pin: pin,
      stars: stars,
      passwordhash: bcrypt.hashSync(pass, 10)
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

router.post('/login', function (req, res) {
  User.findOne({ where: { email: req.body.user.email } }
  ).then(
    function (user) {
      if (user) {
        bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches) {
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


// Update 
router.put('/:id', function (req, res) {
  const data = req.params.id;
  const firstName = req.body.user.firstName;
  const lastName = req.body.user.lastName;
  const email = req.body.user.email;
  const pin = req.body.user.pin;
  const stars = req.body.user.stars;

  User
    .update({
      firstName: firstName,
      lastName: lastName,
      email: email,
      pin: pin,
      stars: stars
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
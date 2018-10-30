const router = require('express').Router()
const sequelize = require('../db');
const User = sequelize.import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateSession = require('../middleware/validate-session')




router.post('/', function (req, res) {
  const firstName = req.body.user.firstName;
  const lastName = req.body.user.lastName;
  const email = req.body.user.email;
  const pass = req.body.user.password;
  const pin = req.body.user.pin;
  const stars = req.body.user.stars
  User
  .create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    pin: pin,
    passwordhash: bcrypt.hashSync(pass, 10)
  })
  .then(
    createSuccess = (user) => {
      let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
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
<<<<<<< HEAD
const jwt = require('jsonwebtoken');
const sequelize = require('../db');
const User = sequelize.import('../models/user');


const validateSession = function(req, res, next) {
  if (req.method == 'OPTIONS') {
      next()
  } else {
    let token = req.headers.authorization;
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.'});
    else {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (decoded){
            User.findOne({where: {id: decoded.id }}).then(user => {
              req.user = user;
              next();
            },
            function(){
              res.status(401).send({error: 'Not authorized'});
            });
          } else {
            res.status(400).send({error: 'Not authorized'});
           }
      });
    }
  }
}

module.exports = validateSession;
=======
const jwt = require('jsonwebtoken')
// const User = require('../db').import('../models/userModel')
require('dotenv').config()

const validateSession = (req, res, next) => {
    const token = req.headers.authorization
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (!err && decodedToken) {
            User.findOne({ where: { id: decodedToken.id }})
            .then(user => {
                if (!user) throw 'err'
                req.user = user
                return next()
            })
            .cach(err => next(err))
        } else {
            req.errors = err
            return next()
        }
    })
}

module.exports = validateSession
>>>>>>> dev-serv

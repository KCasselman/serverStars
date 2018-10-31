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
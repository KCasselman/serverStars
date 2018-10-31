require('dotenv').config();

var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var sequelize = require('./db')
var goals = require('./controllers/goalsController.js')
const port = process.env.PORT || 3000;
sequelize.sync()

app.use(bodyParser.json())
app.use(require("./middleware/headers"))
app.use('/goals', goals)

app.use(require('./middleware/validate-session'))

app.listen(`${process.env.PORT}`, function() {
    console.log(`server on ${process.env.PORT}`)
})
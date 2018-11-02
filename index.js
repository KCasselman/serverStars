require('dotenv').config();

const express = require('express');
const app = express();
const user = require('./controllers/userController');
const sequelize = require('./db');
const goals = require('./controllers/goalsController.js');
const bodyParser = require('body-parser');
const userGoals = require('./controllers/userGoals')


sequelize.sync();
app.use(bodyParser.json());


app.use('/goals', goals)
app.use(require('./middleware/headers'));
app.use('/user', user);
app.use('./usergoals', userGoals)


//Protected Routes


// app.listen(3000, function(){
//   console.log('I can hear you now ${process.env.PORT}')
// });

// var express = require('express')
// var app = express()
// var bodyParser = require('body-parser')
// var sequelize = require('./db')
// const port = process.env.PORT || 3000;
// sequelize.sync()

// app.use(bodyParser.json())
// app.use(require("./middleware/headers"))

// app.use(require('./middleware/validate-session'))

app.listen(`${process.env.PORT}`, function() {
    console.log(`server on ${process.env.PORT}`)
})

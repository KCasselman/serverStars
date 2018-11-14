require('dotenv').config();
const bodyParser = require('body-parser');

const express = require('express');
const app = express();
const sequelize=require('./db')
const user = require('./controllers/userController');

const Goal = require('./controllers/goalsController');

require('./associations.js');
sequelize.sync();

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(require('./middleware/headers'));
app.use('/user', user);
app.use('/goal', Goal);


app.listen(process.env.PORT, function() {
    console.log(`server on ${process.env.PORT}`)
})

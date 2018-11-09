require('dotenv').config();

const express = require('express');
const app = express();
const User = require('./controllers/userController');
const Goal = require('./controllers/goalsController');

const bodyParser = require('body-parser');

app.use(express.static(__dirname));

app.use(bodyParser.json());

app.use('/goal', Goal);
app.use(require('./middleware/headers'));
app.use('/user', User);

require('./associations.js')

app.listen(`${process.env.PORT}`, function() {
    console.log(`server on ${process.env.PORT}`)
})

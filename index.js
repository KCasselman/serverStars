require('dotenv').config();

const express = require('express');
const app = express();
const user = require('./controllers/userController');
const sequelize = require('./db');
const bodyParser = require('body-parser');


sequelize.sync();
app.use(bodyParser.json());


app.use(require('./middleware/headers'));
app.use('/user', user);


//Protected Routes


// app.use('/connection/test', function(req, res){
//   res.send("This is an old test from a new server.");
// })

app.listen(3000, function(){
  console.log('I can hear you now ${process.env.PORT}')
});


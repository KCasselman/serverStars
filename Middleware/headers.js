<<<<<<< HEAD
module.exports = function(req, res, next){

  res.header('access-control-allow-origin', '*');
  res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE');
  res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  next();
};
=======
module.exports = function(req,res,next){
    res.header('Access-Control-Allow-Orgin', "*")
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested With, Content-Type, Accept, Authorization")
    next()
}
>>>>>>> dev-serv

require('rootpath')();
var express = require('express');
var app = express();
var lodash = require('lodash');
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('config');
var mongoose = require('mongoose');

var session = require('express-session')
//var req.session.userId = user._id;
// app.use(session({
//   secret: 'work hard',
//   resave: true,
//   saveUninitialized: false
// }));
//var UserController = require('./user/UserController');
var User = require('./models/users');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Plant = require('./models/plants')
 User = require('./models/users')

app.use(require('./routers/api'))
//app.use(require('./controllers/AuthController'))

//connect to mongoose
mongoose.connect('mongodb://localhost/sweaca');
var db = mongoose.connection;

app.get('/home',function(req, res){
  res.send('please use a valid url');
});

// UserSchema.statics.authenticate = function (email, password, callback) {
//   User.findOne({ email: email })
//     .exec(function (err, user) {
//       if (err) {
//         return callback(err)
//       } else if (!user) {
//         var err = new Error('User not found.');
//         err.status = 401;
//         return callback(err);
//       }
//       bcrypt.compare(password, user.password, function (err, result) {
//         if (result === true) {
//           return callback(null, user);
//         } else {
//           return callback();
//         }
//       })
//     });
// }

// GET USERS
app.get('/users',function(req, res){
    User.getUsers(function(err, users){
        if(err){
            throw err;
        }
        res.json(users);
    });
});

//GET SINGLE USER
app.get('/profile/:_id',function(req, res){
    User.getUserById(req.params._id, function(err, user){
        if(err){
            throw err;
        }
        res.json(user);
    });
});

//CREATE USER
app.post('/api/register',function(req, res){
    var user = req.body;
      User.addUser(user, function(err, user){
        if(err){
            throw err;
        } else{
           // create a token     
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 3600 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
        res.json(user);
        }
    });
});
    
    


//UPDATES USER
 app.put('/api/users/:_id',function(req, res){                 
    var id = req.params._id;
    var user = req.body;
    User.updateUser(id, user, {}, function(err, user){
        if(err){
            throw err;
        }
        res.json(user);
    });
});

//DELETE USER
app.delete('/api/users/:_id',function(req, res){
    var id = req.params._id;
    var user = req.body;
    User.removeUser(id, function(err, user){
        if(err){
            throw err;
        }
        res.json(user);
    });
});

app.get('/restricted', function(req, res) {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    res.status(200).send(decoded);
  });
});


// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

module.exports = app;
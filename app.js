var express = require('express');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
require('rootpath')();
var lodash = require('lodash');
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('config');
var mongoose = require('mongoose');
var ConnectMongo = require('connect-mongo');
var User = require('./models/users');

var admin = require('firebase-admin')
var serviceAccount = require('./sweaca-nursery-firebase-adminsdk-knlyw-ec4c79b695.json')
var firebaseAdmin = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: ' https://sweaca-nursery.firebaseio.com'
})

//create authentication middleware
function isAuthenticated(req, res, next){
	//customer
}

app.set('view engine','ejs')

app.use(express.static('views'))
app.set('views', __dirname + '/views')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Plant = require('./models/plants')
 User = require('./models/users')

app.use(require('./routers/api'))
//app.use(require('./controllers/AuthController'))

//connect to mongoose
mongoose.connect('mongodb://localhost/sweaca');
var db = mongoose.connection;
//   store = new MongoStore({
//   uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
//   collection: 'mySessions'
// });

app.get('/home',function(req, res){
  res.send('please use a valid url');
});

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
        } else {
           // create a token     
    }
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 3600 
    });
    res.status(200).send({ auth: true, token: token });
        res.json(user);
    });
//    }else if (req.body.logemail && req.body.logpassword) {
//     User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
//       if (error || !user) {
//         var err = new Error('Wrong email or password.');
//         err.status = 401;
//         return next(err);
//       } else {
//         req.session.userId = user._id;
//         return res.redirect('/profile');
//       }
//     });
//   }
//  // } 
//  else {
//     res.status(400).send('All the fields are Required');
//     return next(err);
//   }
// });
 //});
});      

// GET route after registering
app.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized!');
          err.status = 400;
          return next(err);
        } else {
          return res.send(user)
        }
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

app.get('/me', function(req, res) {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
  // User.findById(decoded.id, function (err, user) {
  // if (err) return res.status(500).send("There was a problem finding the user.");
  // if (!user) return res.status(404).send("No user found.");
  
  // res.status(200).send(user);
  res.status(200).send(decoded);
});
  });
//});

app.get('/',function(req, res){
  res.render('home.ejs')
});

app.get('/Regular', isAuthenticated, function(req, res){
	res.render('regular.ejs')
})

// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

module.exports = app;
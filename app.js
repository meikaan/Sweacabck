const admin = require('./firebase-admin');
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
// var req.session.userId = user._id;
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
app.use(require('./controllers/AuthController'))

//connect to mongoose
mongoose.connect('mongodb://localhost/sweaca');
var db = mongoose.connection;

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
        } else{
           // create a token     
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 3600 
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

app.get('/me', function(req, res) {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
  User.findById(decoded.id, function (err, user) {
  if (err) return res.status(500).send("There was a problem finding the user.");
  if (!user) return res.status(404).send("No user found.");
  
  res.status(200).send(user);
});
  });
});

// login
// app.post('/api/login', function (req, res, next) {
//       // access to User methods.  
//       User.getUserById({ username: req.body.username }).exec(function (err, user) {
//           if(err) return next(err); 
//           if(!User) return res.status(401).send();
//           if (User.verifyPassword(req.body.password)) {
//           var isUserFound = false;
//           var foundUser = {};

//           for (var i = 0; i < users.length; i++) {  
//         if (users[i].user === req.body.user) {  
//             isUserFound = true;  
//             foundUser = users[i];  
//         }  
//     }  
//     if (isUserFound) {  
//         if (foundUser.password == req.body.password) {  
//             var token = jwt.sign(foundUser, config.secret, {  
//                 expiresIn: 3600 // expires in 24 hours  
//             });  
//             console.log(token);  
//             res.json({  
//                 success: true,  
//                 message: 'Here is your token!',  
//                 token: token  
//             });  
//         } else {  
//             res.json({  
//                 success: false,  
//                 message: 'Authentication failed. Wrong password!'  
//             });  
//         }  
//         res.send(foundUser);  
//     } else {  
//         res.json({  
//             success: false,  
//             message: 'Authentication failed. Couldnot find user!'  
//         });  
//     }  
// };
// });
// });  
// app.post('/login', function(req, res) {
//   User.findOne({ email: req.body.email }, function (err, user) {
//     if (err) return res.status(500).send('Error on the server.');
//     if (!user) return res.status(404).send('No user found.');
//     var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
//     if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
//     var token = jwt.sign({ id: user._id }, config.secret, {
//       expiresIn: 86400 // expires in 24 hours
//     });
//     res.status(200).send({ auth: true, token: token });
//   });
// });

// login
app.post('/api/login', function (req, res, next) {
      // access to User methods.  
      User.getUserById({ username: req.body.username }).exec(function (err, user) {
          if(err) return next(err); 
          if(!User) return res.status(401).send();
          if (User.verifyPassword(req.body.password)) {
          var isUserFound = false;
          var foundUser = {};

          for (var i = 0; i < users.length; i++) {  
        if (users[i].user === req.body.user) {  
            isUserFound = true;  
            foundUser = users[i];  
        }  
    }  
    if (isUserFound) {  
        if (foundUser.password == req.body.password) {  
            var token = jwt.sign(foundUser, config.secret, {  
                expiresIn: 3600 // expires in 24 hours  
            });  
            console.log(token);  
            res.json({  
                success: true,  
                message: 'Here is your token!',  
                token: token  
            });  
        } else {  
            res.json({  
                success: false,  
                message: 'Authentication failed. Wrong password!'  
            });  
        }  
        res.send(foundUser);  
    } else {  
        res.json({  
            success: false,  
            message: 'Authentication failed. Couldnot find user!'  
        });  
    }  
};
});
});  

//const port = process.env.APP_PORT || 4000;
const host = process.env.APP_HOST || '127.0.0.1';


// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, host, function () {
    //console.log('Server listening on port ' + port);
    console.log(`Server listening at ${host}:${port}`);
});

//app.listen(port, host);



module.exports = app;
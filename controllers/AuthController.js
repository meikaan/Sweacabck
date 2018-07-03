var firebaseMiddleware = require('express-firebase-middleware');
var express = require('express');
var app = require('express')();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs'); 
var bodyParser = require('body-parser');
var session = require('express-session');
//var req.session.userId = user._id;
app.use('/api', firebaseMiddleware.auth);
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.get('/api/hello', (req, res) => {
    res.json({
        message: `You're logged in as ${res.locals.user.email} with Firebase UID: ${res.locals.user.uid}`
    });
});
//var req.session.userId = user._id;
//var UserSchema = new mongoose.Schema({  
//     username:{
//         type: String,
//         required: true
//     },
//     email:{ 
//         type: String,
//         required: true
//     },
//     password:{
//         type: String,
//         required: true
//     },
//     contact:{
//         type: String
//         ,required: true
//     },
//     address:{
//         type: String,
//         required: true
//     }
// });
 var config = require('config.json');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// console.log("no problem");

// if (req.body.email &&
//   req.body.username &&
//   req.body.password) {
//   var userData = {
//     email: req.body.email,
//     username: req.body.username,
//     password: req.body.password,
//   }
//   //use schema.create to insert data into the db
//   User.create(userData, function (err, user) {
//     if (err) {
//       return next(err)
//     } else {
//       return res.redirect('/profile');
//     }
//   });
// }

function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
}
app.get('/profile', requiresLogin, function(req, res, next) {
  res.send('Here is the profile');
  res.json(getUserById);
});

 app.get('/api/logout', function(req, res) {
  //res.status(200).send({ auth: false, token: null });
  //if (req.session) {
    // delete session object
    //req.session.destroy(function(err) {
      //if(err) {
        //return next(err);
      //} else {
        console.log('successfully done! You are logged out, please login');
        return res.redirect('/home');
    //  }
    //res.redirect('/home');
//   });  
// }
});
 


//var User = mongoose.model('User', UserSchema);

module.exports= app;


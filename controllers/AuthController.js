var express = require('express');
var app = require('express')();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs'); 
var bodyParser = require('body-parser');
const SALT_WORK_FACTOR = 10;
var req.session.userId = user._id;
var passwordHash = require('password-hash');
var session = require('express-session')
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));
 var UserSchema = new mongoose.Schema({  
    username:{
        type: String,
        required: true
    },
    email:{ 
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    contact:{
        type: String
        ,required: true
    },
    address:{
        type: String,
        required: true
    }
});

//var User = mongoose.model('User');
//var User= mongoose.model('User',UserSchema);
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('config.json');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log("no problem");

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


if (req.body.email &&
  req.body.username &&
  req.body.password) {
  var userData = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  }
  //use schema.create to insert data into the db
  User.create(userData, function (err, user) {
    if (err) {
      return next(err)
    } else {
      return res.redirect('/profile');
    }
  });
}

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });

  // var token = jwt.sign({username:User.username}, config.secret, {expiresIn:'1h'});
              //    return res.status(200).send({message: 'You are now signed in', token: token});

 app.get('/api/logout', function(req, res) {
  //res.status(200).send({ auth: false, token: null });
   res.redirect('/home');
});
 


var User = mongoose.model('User', UserSchema);

module.exports= app;


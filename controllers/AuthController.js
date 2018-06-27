var express = require('express');
var app = require('express')();
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser');

//var passwordHash = require('password-hash');

//var User = mongoose.model('UserSchema');
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
      User.findOne({ username: req.body.username }).exec(function (err, user) {
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

//middleware  
app.use(function(req, res, next) {  
  
    // check header or url parameters or post parameters for token  
    var token = req.body.token || req.query.token || req.headers['x-access-token'];  
  
    // decode token  
    if (token) {  
        // verifies secret and checks exp  
        jwt.verify(token, config.secret, function(err, decoded) {  
            if (err) {  
                return res.json({  
                    success: false,  
                    message: 'Failed to authenticate token.'  
                });  
            } else {  
                // save to request for use in other routes  
                req.decoded = decoded;  
                next();  
            }  
        });  
    } else {  
        // if there is no token  
        // return an error  
        return res.status(403).send({  
            success: false,  
            message: 'No token provided.'  
        });  
    }  
});  


  // var token = jwt.sign({username:User.username}, config.secret, {expiresIn:'1h'});
              //    return res.status(200).send({message: 'You are now signed in', token: token});
           //  }
  //        });
 //                return res.status(404).send({ error: 'Invalid username or password: ' + req.body.username });
 //     });


 app.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});
 

app.get('/me', function(req, res) {
 var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    res.status(200).send(decoded);
  });
});

module.exports= app;


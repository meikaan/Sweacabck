var express = require('express');
var app = require('express')();
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser');
//var User = mongoose.model('UserSchema');
//var User= mongoose.model('User',UserSchema);
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('config.json');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log("no problem");

 app.post('/api/authuser', function(req,res){
     var hashedPassword = bcrypt.hashSync(req.body.password , 8);
    User.findOne({
        username : req.body.username,
        password: hashedPassword
    },
    function(err, user){
        	console.log("something is wrong...");
           if(!User){
           	res.json({
           		authsuccess: false,
           		description: 'User authentication failed..'
           	});
           	}
           		var token = jwt.Sign({ id: user._id }, config.secret,{
           	    expiresIn: 3600 ,

           	});    
        });
});

 app.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});


//     //  var token = jwt.encode({
//     //   iss : user.id,
//     //   expiresIn: 86400 // expires in 24 hours
//     // }, app.get('jwtTokenSecret'));

//     // res.json({
//     // 	token : token,
//     // 	expires: expires,
//     // 	user : user.toJSON()
//     // });

//     // res.status(200).send({ auth: true, token: token });
 

app.get('/me', function(req, res) {
 var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    res.status(200).send(decoded);
  });
});

module.exports= app;


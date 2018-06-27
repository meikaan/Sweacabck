var express = require('express');
var app = express();
var mongoose = require('mongoose');  
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

var User = mongoose.model('User', UserSchema);

//GET USERS
module.exports.getUsers =function(callback, limit){          
    User.find(callback).limit(limit);
}

//GET USER
module.exports.getUserById =function(id, callback){
    User.findById(id, callback);
}

//ADD USER
  module.exports.addUser =function(user, callback){
     User.create(user, callback);
 }

//UPDATE USER
 module.exports.updateUser =function(id, user, options, callback){
    var query = {_id: id};
    var update = {
        username: user.username,
        email:user.email,
        password: user.password,
        contact: user.contact,
        address: user.address
    }
    User.findOneAndUpdate(query, update, options, callback);
}

//DELETE USER
module.exports.removeUser =function(id, callback){
    var query = {_id: id};
    User.remove(query, callback);
}

module.exports.verifyPassword = function(id, callback){
    User.find({password:id}, callback);
}

module.exports.findOne = function(id, callback){
    User.find({username:id}, callback);
}

console.log("no problem");

module.export = app;


 


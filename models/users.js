var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs'),
    SALT_WORK_FACTOR = 10;
var express = require('express');
var app = express();  
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
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    }
});

// var User = mongoose.model('User', UserSchema);

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

// module.exports.findById = function(header, callback){
//     User
// }

console.log("no problem");

// UserSchema.pre('save', function(next) {
//     var user = this;

//     // only hash the password if it has been modified (or is new)
//     if (!user.isModified('password')) return next();

//     // generate a salt
//     bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//         if (err) return next(err);

//         // hash the password using our new salt
//         bcrypt.hash(user.password, salt, function(err, hash) {
//             if (err) return next(err);

//             // override the password with the hashed one
//             user.password = hash;
//             next();
//         });
//     });
// });

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

// UserSchema.methods.comparePassword = function(userPassword, cb) {
//     bcrypt.compare(userPassword, this.password, function(err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };


var User = mongoose.model('User', UserSchema);
module.export = app;


 


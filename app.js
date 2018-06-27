require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var bcrypt = require('bcryptjs');
var config = require('config');
var mongoose = require('mongoose');

//var UserController = require('./user/UserController');
//var User = require('./user');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

Plant = require('./models/plants')
Seed = require('./models/seeds')
Flower = require('./models/flowers')
Pots = require('./models/pots')
pebbles = require('./models/pebbles')

//User Schema
var userSchema = mongoose.Schema({
    username:{type:String,required: true},
    email:{type: String,required: true},
    password:{type: String,required: true},
    contact:{type: String,required: true},
    address:{type: String,required: true}
});

var User = module.exports = mongoose.model('User',userSchema);

//Get Users
module.exports.getUsers =function(callback, limit){
    User.find(callback).limit(limit);
}

//connect to mongoose
mongoose.connect('mongodb://localhost/sweaca');
var db = mongoose.connection;



app.get('/',function(req, res){
  res.send('please use a valid url');
});

// GET USERS
app.get('/api/users',function(req, res){
    User.getUsers(function(err, users){
        if(err){
            throw err;
        }
        res.json(users);
    });
});

// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

module.exports = app;
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

app.get('/',function(req, res){
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
app.get('/api/users/:_id',function(req, res){
    User.getPebbleById(req.params._id, function(err, user){
        if(err){
            throw err;
        }
        res.json(user);
    });
});

//CREATE USER
app.post('/register',function(req, res){
    var user = req.body;
    User.addUser(user, function(err, user){
        if(err){
            throw err;
        }
        res.json(user);
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


// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

module.exports = app;
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

// error handler
// app.use(function (err, req, res, next) {
//    if (err.name === 'UnauthorizedError') {
//         res.status(401).send('Token is not available');
//     } else {
//         throw err;
//     }
// });    

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

//GET PLANTS
app.get('/api/plants',function(req, res){
    Plant.getPlants(function(err, plants){
        if(err){
            throw err;
        }
        res.json(plants);
    });
});

//CREATE PLANT
app.post('/api/plants',function(req, res){
    var plant = req.body;
    Plant.addPlant(plant, function(err, plant){
        if(err){
            throw err;
        }
        res.json(plant);
    });
});

//GET SINGLE PLANT
app.get('/api/plants/:_id',function(req, res){
    Plant.getPlantById(req.params._id, function(err, plant){
        if(err){
            throw err;
        }
        res.json(plant);
    });
});

//UPDATE PLANT
 app.put('/api/plants/:_id',function(req, res){                 
    var id = req.params._id;
    var plant = req.body;
    Plant.updatePlant(id, plant, {}, function(err, plant){
        if(err){
            throw err;
        }
        res.json(plant);
    });
});


//DELETE PLANT
app.delete('/api/plants/:_id',function(req, res){
    var id = req.params._id;
    var plant = req.body;
    Plant.removePlant(id, function(err, plant){
        if(err){
            throw err;
        }
        res.json(plant);
    });
});

//GET SEEDS
app.get('/api/seeds',function(req, res){
    Seed.getSeeds(function(err, seeds){
        if(err){
            throw err;
        }
        res.json(seeds);
    });
});

//CREATE SEED
app.post('/api/seeds',function(req, res){
    var seed = req.body;
    Seed.addSeed(seed, function(err, seed){
        if(err){
            throw err;
        }
        res.json(seed);
    });
});    

//GET SINGLE SEED
app.get('/api/seeds/:_id',function(req, res){
    Seed.getSeedById(req.params._id, function(err, seed){
        if(err){
            throw err;
        }
        res.json(seed);
    });
});

//UPDATE SEED
 app.put('/api/seeds/:_id',function(req, res){                 
    var id = req.params._id;
    var seed = req.body;
    Seed.updateSeed(id, seed, {}, function(err, seed){
        if(err){
            throw err;
        }
        res.json(seed);
    });
});


//DELETE SEED
app.delete('/api/seeds/:_id',function(req, res){
    var id = req.params._id;
    var seed = req.body;
    Seed.removeSeed(id, function(err, seed){
        if(err){
            throw err;
        }
        res.json(seed);
    });
});

//GET FLOWERS
app.get('/api/flowers',function(req, res){
    Flower.getFlowers(function(err, flowers){
        if(err){
            throw err;
        }
        res.json(flowers);
    });
});

//GET SINGLE FLOWER
app.get('/api/flowers/:_id',function(req, res){
    Flower.getFlowerById(req.params._id, function(err, flower){
        if(err){
            throw err;
        }
        res.json(flower);
    });
});

//CREATE FLOWER
app.post('/api/flowers',function(req, res){
    var flower = req.body;
    Flower.addFlower(flower, function(err, flower){
        if(err){
            throw err;
        }
        res.json(flower);
    });
});

//UPDATES FLOWERS
 app.put('/api/flowers/:_id',function(req, res){                 //CRUD operations using mongoose
    var id = req.params._id;
    var flower = req.body;
    Flower.updateFlower(id, flower, {}, function(err, flower){
        if(err){
            throw err;
        }
        res.json(flower);
    });
});

//DELETE FLOWER
app.delete('/api/flowers/:_id',function(req, res){
    var id = req.params._id;
    var flower = req.body;
    Flower.removeFlower(id, function(err, flower){
        if(err){
            throw err;
        }
        res.json(flower);
    });
});
 
// GET POTS
app.get('/api/pots',function(req, res){
    Pot.getPots(function(err, pots){
        if(err){
            throw err;
        }
        res.json(pots);
    });
});

//GET SINGLE POT
app.get('/api/pots/:_id',function(req, res){
    Pot.getPotById(req.params._id, function(err, pot){
        if(err){
            throw err;
        }
        res.json(pot);
    });
}); 

//CREATE POT
app.post('/api/pots',function(req, res){
    var pot = req.body;
    Pot.addPot(pot, function(err, pot){
        if(err){
            throw err;
        }
        res.json(pot);
    });
});

//UPDATES POT
 app.put('/api/pots/:_id',function(req, res){                 
    var id = req.params._id;
    var pot = req.body;
    Pot.updatePot(id, pot, {}, function(err, pot){
        if(err){
            throw err;
        }
        res.json(pot);
    });
});

//DELETE POT
app.delete('/api/pots/:_id',function(req, res){
    var id = req.params._id;
    var pot = req.body;
    Pot.removePot(id, function(err, pot){
        if(err){
            throw err;
        }
        res.json(pot);
    });
});

// GET PEBBLES
app.get('/api/pebbles',function(req, res){
    Pebble.getPebbles(function(err, pebbles){
        if(err){
            throw err;
        }
        res.json(pebbles);
    });
});

//GET SINGLE PEBBLE
app.get('/api/pebbles/:_id',function(req, res){
    Pebble.getPebbleById(req.params._id, function(err, pebble){
        if(err){
            throw err;
        }
        res.json(pebble);
    });
});

//CREATE PEBBLE
app.post('/api/pebbles',function(req, res){
    var pebble = req.body;
    Pebble.addPebble(pebble, function(err, pebble){
        if(err){
            throw err;
        }
        res.json(pebble);
    });
});

//UPDATES PEBBLE
 app.put('/api/pebbles/:_id',function(req, res){                 
    var id = req.params._id;
    var pebble = req.body;
    Pebble.updatePebble(id, pebble, {}, function(err, pebble){
        if(err){
            throw err;
        }
        res.json(pebble);
    });
});

//DELETE PEBBLE
app.delete('/api/pebbles/:_id',function(req, res){
    var id = req.params._id;
    var pebble = req.body;
    Pebble.removePebble(id, function(err, pebble){
        if(err){
            throw err;
        }
        res.json(pebble);
    });
});

// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

module.exports = app;
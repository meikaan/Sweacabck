var mongoose = require('mongoose');  
var express = require('express');
var router = express.Router();
var config = require('config');
var app = express();

//Seed Schema
var seedSchema = mongoose.Schema({
    vegetable:{
        type:String,
        required: true
    },
    treeForest:{
        type: String,
        required: true 
    },
    flower:{
        type: String,
        required: true
    },
    number:{
        type: String,
        required: true
    },
    conditions:{
        type: String,
        required: true
    },
    image_url:{
        type: String,
        required: true
    }
});

var Seed = module.exports = mongoose.model('Seed',seedSchema);

//Get Seeds
module.exports.getSeeds =function(callback, limit){          
    Seed.find(callback).limit(limit);
}

//Get Seed 
module.exports.getSeedById =function(id, callback){
    Seed.findById(id, callback);
}

//Add Seed
 module.exports.addSeed =function(seed, callback){
  Seed.create(seed, callback);
}

//UPDATES SEED
 module.exports.updateSeed =function(id, seed, options, callback){
    var query = {_id: id};
    var update = {
        vegetable: seed.vegetable,
        treeForest: seed.treeForest,
        flower: seed.flower,
        number: seed.number,
        image_url: seed.image_url,
        buy_url: seed.buy_url
    }
    Seed.findOneAndUpdate(query, update, options, callback);
}

//DELETE SEED
module.exports.removeSeed =function(id, callback){
    var query = {_id: id};
    Seed.remove(query, callback);
}

//module.exports = router;
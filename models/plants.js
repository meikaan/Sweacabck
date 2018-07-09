var mongoose = require('mongoose');
var express = require('express');  
var router = express.Router();
var config = require('config');
var app = express();

//Plant Schema
var plantSchema = mongoose.Schema({
    plantname:{
        type:String,
        required: true
    },
    planttype:{
        type: String,
        required: true 
    },
    location:{
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

var Plant = module.exports = mongoose.model('Plant',plantSchema);

//Get Flowers
module.exports.getPlants =function(callback, limit){          
    Plant.find(callback).limit(limit);
}

//Get Plant 
module.exports.getPlantById =function(id, callback){
    Plant.findById(id, callback);
}

//Add Plant
 module.exports.addPlant =function(plant, callback){
  Plant.create(plant, callback);
}

//UPDATE PLANT
 module.exports.updatePlant =function(id, plant, options, callback){
    var query = {_id: id};
    var update = {
        plantname: plant.plantname,
        planttype: plant.planttype,
        location: plant.location,
        conditions: plant.conditions,
        image_url: plant.image_url,
        buy_url: plant.buy_url
    }
    Plant.findOneAndUpdate(query, update, options, callback);
}

//DELETE PLANT
module.exports.removePlant =function(id, callback){
    var query = {_id: id};
    Plant.remove(query, callback);
}

//module.exports = router;
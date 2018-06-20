var mongoose = require('mongoose');  
var express = require('express');
var router = express.Router();
var config = require('config');
var app = express();

//Flower Schema
var flowerSchema = mongoose.Schema({
    flowername:{
        type:String,
        required: true
    },
    seasonal:{
        type: String,
        required: true 
    },
    special:{
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

var Flower = module.exports = mongoose.model('Flower',flowerSchema);

//Get Flowers
module.exports.getFlowers =function(callback, limit){          
    Flower.find(callback).limit(limit);
}

//Get Flower 
module.exports.getFlowerById =function(id, callback){
    Flower.findById(id, callback);
}

//Add Flower
 module.exports.addFlower =function(flower, callback){
    Flower.create(flower, callback);
}

//Update Flower
 module.exports.updateFlower =function(id, flower, options, callback){
    var query = {_id: id};
    var update = {
        flowername: flower.flowername,
        seasonal: flower.seasonal,
        special: flower.special,
        number: flower.number,
        image_url: flower.image_url,
        buy_url: flower.buy_url
    }
    Flower.findOneAndUpdate(query, update, options, callback);
}

//Delete Flower
module.exports.removeFlower =function(id, callback){
    var query = {_id: id};
    Flower.remove(query, callback);
}

//module.exports = router;
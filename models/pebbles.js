var mongoose = require('mongoose');  
var express = require('express');
var router = express.Router();
var config = require('config');
var app = express();

//Pebble Schema
var pebbleSchema = mongoose.Schema({
	pebbleType:{
		type: String,
		required: true
	}, 
	pebbleColor:{
		type: String,
		required: true
	},
    image_url:{
        type: String,
        required: true
	}
});	

//Get Pebbles
module.exports.getPebbles =function(callback, limit){          
    Pebble.find(callback).limit(limit);
}

var Pebble = module.exports = mongoose.model('Pebble',pebbleSchema);

//Get Pebble 
module.exports.getPebbleById =function(id, callback){
    Pebble.findById(id, callback);
}

//Add Pebble
 module.exports.addPebble =function(pebble, callback){
    Pebble.create(pebble, callback);
}

// //POST PEBBLE
// router.post('/', function (req, res) {
//     Pebble.create({
//            pebbleType : req.body.pebbleType,
//            pebbleColor : req.body.pebbleColor
//         }, 
//         function (err, pebble) {
//             if (err) return res.status(500).send("There was a problem adding the information to the database.");
//             res.status(200).send(pebble);
//         });
// });

//DELETES PEBBLE
module.exports.removePebble =function(id, callback){
	var query = {_id: id};
	Pebble.remove(query, callback);
}

//UPDATE PEBBLE
 module.exports.updatePebble =function(id, pebble, options, callback){
 	var query = {_id: id};
 	var update = {
 		pebbleType: pebble.pebbleType,
 		pebbleColor: pebble.pebbleColor,
 		image_url: pebble.image_url,
 		buy_url: pebble.buy_url
 	}
 	Pebble.findOneAndUpdate(query, update, options, callback);
}


//module.exports = router;
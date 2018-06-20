var mongoose = require('mongoose');
var express = require('express');  
var router = express.Router();
var config = require('config');
var app = express();

//Pot Schema
var potSchema = mongoose.Schema({
	plantersType:{
		type: String,
		required: true
	},
	fertilizers:{
		type: String,
		required: true
	},
	plantersColor:{
		type: String,
		required: true
	},
	plantersShape:{
		type: String,
		required: true
	},
	plantersSize:{
		type: String,
		required: true
	},
	specialPlanters:{
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
	}, 
	buy_url:{
		type: String,
		required: true
	}
});

var Pot = module.exports = mongoose.model('Pot',potSchema);

//Get Pots
module.exports.getPots =function(callback, limit){          
    Pot.find(callback).limit(limit);
}

//Get Pot 
module.exports.getPotById =function(id, callback){
    Pot.findById(id, callback);
}

//Add Pot
 module.exports.addPot =function(pot, callback){
    Pot.create(pot, callback);
}

// //POST POT
// router.post('/', function (req, res) {
//     Pot.create({
//            plantersType : req.body.plantersType,
//            fertilizers : req.body.fertilizers,
//            plantersColor : req.body.plantersColor,
//            plantersShape : req.body.plantersShape,
//             plantersSize : req.body.plantersSize,
//            specialPlanters : req.body.specialPlanters,
//             conditions : req.body.conditions,
//            image_url : req.body.image_url,
//            buy_url : req.body.buy_url
//         }, 
//         function (err, pot) {
//             if (err) return res.status(500).send("There was a problem adding the information to the database.");
//             res.status(200).send(pot);
//         });
// });

//UPDATES POTS
 module.exports.updatePot =function(id, pot, options, callback){
 	var query = {_id: id};
 	var update = {
 		plantersType: pot.plantersType,
 		fertilizers: pot.fertilizers,
 		plantersColor: pot.plantersColor,
 		plantersShape: pot.plantersShape,
 		plantersSize: pot.plantersSize,
 		specialPlanters: pot.specialPlanters,
 		image_url: pot.image_url,
 		buy_url: pot.buy_url
 	}
 	Pot.findOneAndUpdate(query, update, options, callback);
}

//DELETES POT
module.exports.removePot =function(id, callback){
	var query = {_id: id};
	Pot.remove(query, callback);
}

//module.exports = router;


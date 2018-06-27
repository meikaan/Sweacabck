var express = require('express');
var app = express();
var multer = require('multer');

var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, 'uploads/')
	},
	filename: function(req, file, cb){
		cb(null, file.fieldname + '-' + Date.now() + '.jpg')
	}
});

var upload = multer({ storage: storage }).single('avatar');

app.post('/',function(req, res){
	upload(req, res, function(err){
		if(err){
			res.status(401).json({
            "message" : "UnauthorizedError: private profile"
		});
		res.json({
			success:true,
			message: 'Image Uploaded!'
		});
	}
});
});

module.exports = app;

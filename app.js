var express = require('express');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');

var admin = require('firebase-admin')
var serviceAccount = require('./sweaca-nursery-firebase-adminsdk-knlyw-ec4c79b695.json')
var firebaseAdmin = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: ' https://sweaca-nursery.firebaseio.com'
})

//create authentication middleware
function isAuthenticated(req, res, next){
	//customer
}

app.set('view engine','ejs')

app.use(express.static('views'))
app.set('views', __dirname + '/views')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.get('/',function(req, res){
  res.render('home.ejs')
});

app.get('/Regular', isAuthenticated, function(req, res){
	res.render('regular.ejs')
})

app.post('/',function(req, res){
	
})

// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
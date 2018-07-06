var express = require('express');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');

app.set('view engine','ejs')

app.use(express.static('views'))
app.set('views', __dirname + '/views')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.get('/',function(req, res){
  res.render('home.ejs')
});

app.post('/',function(req, res){
	
})

// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
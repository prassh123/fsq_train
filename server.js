var http = require('http');
var express = require("express");
var routes = require('./routes');

var app = express.createServer();
var port = process.env.PORT || 3000;
//set path to the views (template) directory

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set("view options",{ layout: 'layout' });
//set path to static files
	
	app.use(express.bodyParser());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});
app.get('/', routes.index);
app.get('/departures/*', routes.getNextDeparturesByStopName);
app.get('/test', function(req, res){
  res.render('index.jade', {title: 'Prashanth Raghavan'}); 
});

app.listen(port);
console.log ('Listening on port 3000');

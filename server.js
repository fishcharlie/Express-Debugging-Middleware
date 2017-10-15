var express = require('express');
var app = express();
var failingMiddleware = require('./failingmiddleware.js');
var successfulMiddleware = require('./successfulmiddleware.js');


app.use(function (req, res, next) {
	console.log("Before middleware 1 working");
	next();
});

app.use(failingMiddleware);

app.use(function (req, res, next) {
	console.log("After middleware 1 working");
	next();
});

app.use(successfulMiddleware);

app.use(function (req, res, next) {
	console.log("After middleware 2 working");
	next();
});

app.get("/", function(req, res) {
	res.send("Success");
});

app.listen(3000, function() {
	console.log('Example app listening on port 3000!')
});
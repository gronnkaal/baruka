// routes/ip.js

var express = require('express');
var router = express.Router();

//
//
//

module.exports = function (myIp, myDns) {

	router.get('/', function(req, res, next) {
		res.render('ip', { 
			ip : myIp.address()
		});
	});

	router.get('/json', function(req, res, next) {
		res.json({ ip: myIp.address() });
	});

	router.get('/text', function(req, res, next) {
		res.type('text');
		res.send(myIp.address());
	});	

	return router;

};

//
//
//

// routes/index.js

var request = require('request');
var express = require('express');
var router = express.Router();

//
//
//

router.get('/', function(req, res, next) {

	res.render('index', { 
		title: 'Baruka',
	});

});

router.get('/subnet', function(req, res, next) {

	res.render('index', {
		title: 'Baruka',
		showFormSubnet: 1,
	});

});

router.get('/cidr', function(req, res, next) {

	res.render('index', {
		title: 'Baruka',
		showFormCidr: 1,
	});

});

router.get('/netmask', function(req, res, next) {

	res.render('index', {
		title: 'Baruka',
		showFormNetmask: 1,
	});

});

router.post('/subnet', function(req, res, next) {

	var api = req.app.get('apiUrl');
	var url = api + "/ip/subnet/" + req.body.net + "/" + req.body.mask;

	getJson(url, function (abc) {
		return res.render('index', {
			title: 'Baruka',
			myDataNet: abc,
			showFormSubnet: 1,
		});
	});

});

router.post('/cidr', function(req, res, next) {

	var api = req.app.get('apiUrl');
	var url = api + "/ip/cidr/" + req.body.net + "/" + req.body.prefix;

	getJson(url, function (abc) {
		return res.render('index', {
			title: 'Baruka',
			myDataNet: abc,
			showFormCidr: 1,
		});
	});

});

router.post('/netmask', function(req, res, next) {

	var api = req.app.get('apiUrl');

	var url = api + "/ip/netmask/" + req.body.prefix;

	getJson(url, function (abc) {
		return res.render('index', {
			title: 'Baruka',
			myDataNetmask: abc,
			showFormNetmask: 1,
		});
	});

});

//
//
//

function getJson (myUrl, callback) {
	request({
		url: myUrl,
		json: true
	}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			return callback(body);
		} else {
			console.log(error);
		};
	});
};


module.exports = router;
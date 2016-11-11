// routes/ip.js

var express = require('express');
var router = express.Router();

//
//
//

module.exports = function (myIp, myValidate) {

	router.get('/', function(req, res, next) {
		res.json({ 
			ip: myIp.address() 
		});
	});

	router.get('/netmask/:netmaskPrefix', function(req, res, next) {

		var myError;
		var myPrefix = req.params.netmaskPrefix;

		if (myValidate.isNumeric(myPrefix) == false) {
			myError = "Prefix is not valid, should be numeric";
		};

		if (isBetween(myPrefix, 1, 32) == false) {
			myError = "Prefix is not valid, should be between 1 and 32";
		};

		if (myError.length() > 0) {
			res.json({
				error: myError,
			});
		} else {
			res.json({
				netmask: myIp.fromPrefixLen(myPrefix),
			});
		};

	});

	router.get('/subnet/:subnetIp/:subnetNetmask', function(req, res, next) {

		var myError;
		var ipNetwork = req.params.subnetIp;
		var ipNetmask = req.params.subnetNetmask;

		if (myValidate.isIP(ipNetwork) == false || myValidate.isIP(ipNetmask) == false) {
			myError = "Network or Netmask is not valid";
		};

		if (myError.length() > 0) {
			res.json({
				error: myError,
			});			
		} else {
			var ipSubnet = myIp.subnet(ipNetwork, ipNetmask);

			res.json({ 
				ipAddress: ipSubnet.networkAddress,
				ipAddressFirst: ipSubnet.firstAddress,
				ipAddressLast: ipSubnet.lastAddress,
				ipBroadcast: ipSubnet.broadcastAddress,
				ipSubnetMask: ipSubnet.subnetMask,
				ipSubnetMaskLength: ipSubnet.subnetMaskLength,
				ipNumHosts: ipSubnet.numHosts,
				ipLength: ipSubnet.length
			});
		};

	});

	router.get('/cidr/:cidrIp/:cidrPrefix', function(req, res, next) {

		var myError;
		var ipNetwork = req.params.cidrIp;
		var ipPrefix = req.params.cidrPrefix;

		if (myValidate.isIP(ipNetwork) == false) {
			myError = "Network is not valid, ex: 10.0.0.0";
		};

		if (myValidate.isNumeric(ipPrefix) == false) {
			myError = "Prefix is not valid, should be numeric";
		};

		if (isBetween(ipPrefix, 1, 32) == false) {
			myError = "Prefix is not valid, should be between 1 and 32";
		};

		if (myError.length() > 0) {
			res.json({
				error: myError,
			});			
		} else {
			var myCidr = ipNetwork + "/" + ipPrefix;
			ipCidr = myIp.cidrSubnet(myCidr);
			
			res.json({
				ipAddress: ipCidr.networkAddress,
				ipAddressFirst: ipCidr.firstAddress,
				ipAddressLast: ipCidr.lastAddress,
				ipBroadcast: ipCidr.broadcastAddress,
				ipSubnetMask: ipCidr.subnetMask,
				ipSubnetMaskLength: ipCidr.subnetMaskLength,
				ipNumHosts: ipCidr.numHosts,
				ipLength: ipCidr.length
			});
		};
	});


	return router;

};

//
//
//

function isBetween(x, min, max) {
	if (x >= min && x <= max) {
		return true;
	} else {
		return false;
	}
}

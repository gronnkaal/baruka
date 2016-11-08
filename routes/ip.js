// routes/ip.js

var express = require('express');
var router = express.Router();

//
//
//

module.exports = function (myIp) {

	router.get('/', function(req, res, next) {
		res.json({ 
			ip: myIp.address() 
		});
	});

	router.get('/netmask/:netmaskPrefix', function(req, res, next) {

		myPrefix = req.params.netmaskPrefix;

		res.json({
			netmask: myIp.fromPrefixLen(myPrefix)
		})

	});

	router.get('/subnet/:subnetIp/:subnetNetmask', function(req, res, next) {

		ipSubnet = myIp.subnet(req.params.subnetIp, req.params.subnetNetmask);

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

	});

	router.get('/cidr/:cidrIp/:cidrPrefix', function(req, res, next) {

		var myCidr = req.params.cidrIp + "/" + req.params.cidrPrefix;
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

	});


	return router;

};

//
//
//
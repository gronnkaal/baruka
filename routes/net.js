// routes/net.js

var express = require('express');
var router = express.Router();

//
//
//

module.exports = function (myIp) {

	router.get('/subnet/:ip/:netmask', function(req, res, next) {
		ipSubnet = myIp.subnet(ip, netmask);
	});

	router.get('/subnet/:ip/:netmask/json', function(req, res, next) {

		ipSubnet = myIp.subnet(req.params.ip, req.params.netmask);

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

	router.get('/cidr/:cidr/text', function(req, res, next) {
		ipCidr = myIp.cidrSubnet(cidr);
	});	

	return router;

};
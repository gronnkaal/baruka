// routes/ip.js

var express = require('express');
var router = express.Router();

//
//
//

router.get('/', function(req, res, next) {
  res.render('ip', { 
  	title: 'IP',
  	ip : myIp.address()
  });
});

//
//
//

module.exports = router;

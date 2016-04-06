var express = require('express');
var router = express.Router();
var Beer = require('../models/beer');
var User = require('../models/user');
var request = require('request');

router.get('/id', function(req, res) {
	Beer.fetch(req.body, function(err, beers) {
		res.status(err ? 400 : 200).send(err || beers);
	});
});

router.get('/id/:id', function(req, res) {
	Beer.fetch({
		id: req.params.id
	}, function(err, beer) {
		res.status(err ? 400 : 200).send(err || beers);
	})
});

router.get('/newRandom', User.authMiddleware, function(req, res) {

})
module.exports = router;
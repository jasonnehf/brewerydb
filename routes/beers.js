var express = require('express');
var router = express.Router();
var Beer = require('../models/beer');
var User = require('../models/user');
var rp = require('request-promise');
var apikey = process.env.API_KEY;

router.get('/id', function(req, res) {
	Beer.fetch(req.body, function(err, beers) {
		res.status(err ? 400 : 200).send(err || beers);
	});
});

router.get('/', function(req, res) {
	Beer.find({}, function(err, beers) {
		res.status(err ? 400 : 200).send(err || beers);
	});
});

router.get('/id/:id', function(req, res) {
	Beer.fetch({
		id: req.params.id
	}, function(err, beer) {
		res.status(err ? 400 : 200).send(err || beer);
	})
});

router.get('/newRandom', User.authMiddleware, function(req, res) {
	rp('http://api.brewerydb.com/v2/beer/random?key='+apikey)
	.then( function(newBeer) {
		var user = req.user;
		var beer = JSON.parse(newBeer);
		if(user.beersSampled.indexOf(beer.data.id)===-1) {
			Beer.store(beer.data, function(err, dbBeer) {
				if(err)
					return res.status(400).send(err);
				else
				{
					user.sampleBeer({id:dbBeer.id}, function(err) {
						if(err) return res.status(400).send(err);
						return res.status(200).send(dbBeer);
					});
				}
			});
		}
		else {
			res.redirect('/beers/newRandom');
		}
	});

});

router.post('/comment', User.authMiddleware, function(req, res) {
	var comment = req.body.comment;
	var user = req.user;
	Beer.fetch({
		id: req.body.id
	}, function(err, beer) {
		if(err)
			res.status(400).send(err);
		else
		{
			beer.addComment(user, comment, function(err, dbBeer) {
				if(err)	res.status(400).send(err);
				else {
					res.status(200).send(dbBeer);
				}
			});
		}
	});

});
module.exports = router;
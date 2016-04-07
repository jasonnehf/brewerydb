var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Beer = require('../models/beer');


router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    res.status(err ? 400 : 200).send(err || users);
  });
});

router.delete('/logout', function(req, res) {
  res.clearCookie('handstamp');
  res.send();
});

router.delete('/unsample/:id', User.authMiddleware, function(req, res) {
  var user = req.user;
  var beerid = req.params.id;
  user.unsample(beerid, function(err) {
    if(err) res.status(400).send(err);
  })
  Beer.findOne({id:req.params.id}, function(err, beer) {
    beer.uncomment(user, function(err) {
      if(err) res.status(400).send(err);
      else  res.send();

    });
  });

});

router.get('/profile', User.authMiddleware, function(req, res) {
  res.send(req.user);
});

router.post('/authenticate', function(req, res) {
  User.authenticate(req.body, function(err, user) {
    if(err) {
      res.clearCookie('handstamp');
      res.status(400).send(err);
    } else {
      var token = user.generateToken();
      res.cookie('handstamp', token).send(user);
    }
  });
});

router.put('/rateBeer', User.authMiddleware, function(req, res) {
  var user = req.user;
  user.rateBeer(req.body.id, req.body.rating,function(err, resp) {
    if(err) res.status(400).send(err);
      else  res.status(200).send(resp);
  })
});

router.put('/:username', function(req, res) {
  delete req.body._id;
  delete req.body.username;
  User.findOneAndUpdate({username:req.params.username}, {$set: req.body }, function(err, user) {
    console.log(err || user)
    res.status(err ? 400 : 200).send(err || user);
  });
});


router.post('/register', function(req, res) {
  User.register(req.body, function(err, user) {
    if(err) {
      res.clearCookie('handstamp');
      res.status(400).send(err);
    } else {
      var token = user.generateToken();
      res.cookie('handstamp', token).send(user);
    }
  });
});

module.exports = router;

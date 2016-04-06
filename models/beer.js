'use strict';
var mongoose = require('mongoose');
var Beer;
var beerSchema = new mongoose.Schema({
	id: {
		type: String,
		unique: true,
		required: true
	},
	json: {
		type: String,
		required: true
	}
});

beerSchema.statics.fetchExt = function(beerObj, cb) {

}

beerSchema.statics.fetch = function(beerObj, cb) {
	Beer.findOne({
		id: beerObj.id
	}, function(err, beer) {
		if (err || !beer) {
			return cb("Fetch failed.");
		}
	});
};

beerSchema.statics.random = function(beerObj, cb) {
}

beerSchema.statics.create = function(beerObj, cb) {
	if (err) {
		return cb(err);
	}
	Beer.create({
		id: beerObj.id,
		json: JSON.stringify(beerObj)
	}, function(err, beer) {
		if (err) {
			cb(err);
		} else {
			cb(null, beer);
		}
	});
};

Beer = mongoose.model('Beer', beerSchema);
module.exports = Beer;
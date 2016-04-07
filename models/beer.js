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
	},
	comments:[{username:{type:String, required:true}, comment:String}]
});

beerSchema.statics.fetch = function(beerObj, cb) {
	Beer.findOne({
		id: beerObj.id
	}, function(err, dbBeer) {
		if (err || !dbBeer) {
			return cb("Fetch failed.");
		}
		return cb(null, dbBeer);
	});
};

beerSchema.methods.uncomment = function(userObj, cb) {
	this.comments = this.comments.filter(function(e) {
		return e.username !== userObj.username;
	})
	this.save(cb);

}

beerSchema.methods.addComment = function(userObj, comment, cb) {
	this.comments.push({username:userObj.username, comment:comment});
	this.save(cb);
}

beerSchema.statics.store = function(beerObj, cb) {
	console.log(beerObj.id);
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
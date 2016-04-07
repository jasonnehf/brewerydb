'use strict';

var app = angular.module('breweryApp');

app.service('AuthService', function($http, UserService) {

  this.register = function(user) {
    return $http.post('/users/register', user)
      .then(function(res) {
        UserService.set(res.data);
      });
  };

  this.login = function(user) {
    return $http.post('/users/authenticate', user)
      .then(function(res) {
        UserService.set(res.data);
      });
  };

  this.logout = function() {
    $http.delete('/users/logout')
    .then(function() {
      UserService.destroy();
    });
  };

  this.init = function() {
    $http.get('/users/profile')
    .then(function(res) {
      UserService.set(res.data);
    });
  };
});


app.service('UserService', function() {
  this.set = function(user) {
    this.username = user.username;
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.image = user.image;
    this.beersSampled = user.beersSampled;
  };
  this.destroy = function() {
    this.username = null;
    this._id = null;
    this.name = null;
    this.email = null;
    this.image = null;
    this.beersSampled = null;
  };

});


app.service('BeerService', function() {
  this.set = function(beer) {
    this.id = beer.id;
    this._id = beer._id;
    this.json = beer.json;
    this.comments = beer.comments;
  };
  this.destroy = function() {
    this.id = null;
    this._id = null;
    this.json = null;
    this.comments = null;
  };

});

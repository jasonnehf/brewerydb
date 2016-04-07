'use strict';

var app = angular.module('breweryApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', { url: '/', templateUrl: '/html/home.html' })
    .state('login',    { url: '/login',    templateUrl: '/html/auth.html', controller: 'authCtrl' })
    .state('register', { url: '/register', templateUrl: '/html/auth.html', controller: 'authCtrl' })
    .state('profile', { url: '/profile', templateUrl: '/html/profile.html', controller: 'profileCtrl' })
    .state('beer', { url: '/beer', templateUrl: '/html/beer.html', controller: 'msgsCtrl' })

  $urlRouterProvider.otherwise('/');
});

app.run(function(AuthService) {
  // attempt to make an authenticated request
  // to receive the user info
  // this can set the UserService
  AuthService.init();
});

app.filter('titlecase', function() {
  return function(input) {
    return input[0].toUpperCase() + input.slice(1).toLowerCase();
  };
});


'use strict';

var app = angular.module('breweryApp');

app.controller('navCtrl', function($scope, UserService, AuthService) {
  $scope.logout = function() {
    AuthService.logout();
  };
  $scope.$watch(function() {
    return UserService.username;
  }, function(username) {
    $scope.username = username;
  });
});

app.controller('authCtrl', function($scope, $state, AuthService) {
  $scope.state = $state.current.name;
  $scope.$watch(function() {
    return UserService.username;
  }, function(username) {
    $scope.username = username;
  });

  if($scope.username) $state.go('home');
  $scope.submit = function(user) {
    if($scope.state === 'register') {
      // submit register form
      if(user.password !== user.password2) {
        $scope.user.password = $scope.user.password2 = '';
        alert('Password fields must match. Please try again.');
      } else {
        AuthService.register(user)
          .then(function() {
            $state.go('home');
          }, function(err) {
            console.error(err);
          });
      }
    } else {
      // submit login form
      AuthService.login(user)
        .then(function() {
          $state.go('home');
        }, function(err) {
          console.error(err);
        });
    }
  };
});


app.controller('profileCtrl', function($scope, $http) {
  $http.get('/users/profile')
    .then(function(res) {
      $scope.user = res.data;
    });

  $scope.updateProfile = function() {
    $http.put('/users/'+$scope.username, $scope.user)
    .then(function(res) {
      console.log('updated profile, res: ', res);
    });
  }
});


app.controller('msgsCtrl', function($scope, $http, UserService, AuthService) {
    $http.get('/msgs/'+UserService.username)
    .then(function(res) {
      $scope.messages = res.data;
    })

    $http.get('/users')
    .then(function(res) {
      $scope.users = res.data;
      var username_idx = -1;
      $scope.users.forEach(function(e, i) {
        if(e.username===UserService.username){
          username_idx=i;
        }
      })
      if(username_idx>=0) $scope.users.splice(username_idx);
      console.log(UserService.username)
      console.log(usernamei)


    });
});
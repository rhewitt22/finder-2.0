'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('LoginCtrl', function ($scope, $auth, $window, $state, toastr) {
    $scope.login = function() {
      $auth.authenticate('google').then( function (response) {
        $window.localStorage.user = JSON.stringify(response.data.user);
        toastr.success('Welcome, ' + response.data.user.email + '!', 'Login Successful');
        $state.go('species.list');
      }).catch( function (response) {
        toastr.error('Could not log you in.', response.data);
      });
    };

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
  });

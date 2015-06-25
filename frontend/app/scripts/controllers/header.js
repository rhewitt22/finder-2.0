'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('HeaderCtrl', function ($scope, $window, $auth, toastr) {
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.logout = function() {
      $auth.logout();
      delete $window.localStorage.user;
      toastr.success('You have successfully logged out.');
    };
  });

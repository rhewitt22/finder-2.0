'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('HeaderCtrl', function ($scope, $window, $auth, toastr, User) {
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.isAdmin = function() {
      return User.isAdmin();
    };

    $scope.isEditor = function() {
      return User.isEditor();
    };

    $scope.getId = function () {
      return User.getUserId();
    };

    $scope.logout = function() {
      $auth.logout();
      delete $window.localStorage.user;
      toastr.success('You have successfully logged out.');
    };
  });

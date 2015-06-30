'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('ProfileCtrl', function ($scope, toastr, User, $stateParams) {
    $scope.update = function() {
      User.update($scope.user).then(function(response) {
        $scope.user = response.data.user[0];
        toastr.success('User updated');
        $scope.getUserData();
      }).catch(function(response) {
        toastr.error(response.message, { message: 'Couldn\'t update user.' });
      });
    };

    $scope.getUserData = function() {
      User.getUser($stateParams.id).then(function(response) {
        $scope.user = response.data;
        $scope.history = response.data.history;
      }).catch(function(response) {
        toastr.error(response.message, 'Couldn\'t get user history');
      });
    };

    $scope.isAdmin = function() {
      return User.isAdmin();
    };

    $scope.isEditor = function() {
      return User.isEditor();
    };
  });

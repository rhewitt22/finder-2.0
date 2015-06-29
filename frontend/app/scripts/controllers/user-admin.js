'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:UserAdminCtrl
 * @description
 * # UserAdminCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('UserAdminCtrl', function ($scope, User, toastr) {
    $scope.getUsers = function() {
      User.getUsers().then(function(response) {
        $scope.users = response.data;
      }).catch(function(response) {
        toastr.error(response.data.message, 'Could not get users.');
      });
    };

    $scope.destroy = function(id) {
      User.destroy(id).then(function(response) {
        $scope.getUsers();
        toastr.success(response.data.message, response.statusText);
      }).catch(function(response) {
        toastr.error(response.data.message, response.statusText);
      });
    };
  });

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
    User.getUsers().then(function(response) {
      $scope.users = response.data;
    }).catch(function(response) {
      toastr.error(response.message, 'Could not get users.');
    });
  });

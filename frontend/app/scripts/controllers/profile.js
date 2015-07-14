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

      var newData = {
        email: $scope.user.email,
        accountType: $scope.user.accountType,
        phone: $scope.user.phone,
        job: $scope.user.job
      };

      User.update(newData).then(function(response) {
        $scope.user = response.data.user[0];
        toastr.success(response.data.message, response.statusText);
        $scope.getUserData();
      }).catch(function(response) {
        toastr.error(response.data.message, response.statusText);
      });
    };

    $scope.getUserData = function() {
      User.getUser($stateParams.id).then(function(response) {
        console.log(response);
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

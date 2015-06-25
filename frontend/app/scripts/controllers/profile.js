'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('ProfileCtrl', function ($scope, $http, toastr) {
    $scope.update = function() {
      var user = {
        email: $scope.user.email,
        job: $scope.user.job,
        phone: $scope.user.phone,
        accountType: $scope.user.accountType
      };

      $http.post('http://localhost:1337/user/update', user).then(function(response) {
        console.log(response);
        toastr.success('User updated');
      }).catch(function(response) {
        toastr.error(response.message, { message: 'Couldn\'t update user.' });
      });
    };

    $http.get('http://localhost:1337/user/profile').then(function(response) {
      $scope.user = response.data;
    }).catch(function(response) {
      toastr.error(response.message, 'Couldn\'t get user history');
    });
  });

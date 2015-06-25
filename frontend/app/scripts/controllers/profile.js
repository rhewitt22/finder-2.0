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
    $http.get('http://localhost:1337/user/profile').then(function(response) {
      console.log(response.data);
      $scope.user = response.data;
    }).catch(function(response) {
      toastr.error(response.message, 'Couldn\'t get user history');
    });
  });

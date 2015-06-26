'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:HistoryCtrl
 * @description
 * # HistoryCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('HistoryCtrl', function ($scope, $http, toastr) {
    $http.get('http://localhost:1337/history').then(function(response) {
      $scope.history = response.data;
    }).catch(function(response) {
      toastr.error(response.message, 'Unable to load history.');
    });
  });

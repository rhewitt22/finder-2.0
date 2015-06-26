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

        if (user.accountType !== response.data.user.accountType){
          toastr.warning('Only admin users can change account type.');
        }
        $scope.user = response.data.user[0];
        toastr.success('User updated');
        $scope.getUserData();

      }).catch(function(response) {
        toastr.error(response.message, { message: 'Couldn\'t update user.' });
      });
    };

    $scope.getUserData = function() {
      $http.get('http://localhost:1337/user/profile').then(function(response) {
        $scope.user = response.data;
        $scope.history = response.data.history;
        console.log($scope.history);
      }).catch(function(response) {
        toastr.error(response.message, 'Couldn\'t get user history');
      });
    };
  });

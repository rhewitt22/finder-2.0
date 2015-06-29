'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:SpeciesCtrl
 * @description
 * # SpeciesCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('SpeciesCtrl', function ($scope, Species, toastr, $stateParams, User) {

    $scope.createSpecies = function() {
      Species.create($scope.species).then(function (response) {
        $scope.species = {};
        toastr.success(response.data.message, 'Created!');
      }).catch(function (response) {
        toastr.error(response.data.message, 'Could not create species.');
      });
    };

    $scope.updateSpecies = function() {
      $scope.species.id = $stateParams.id;
      Species.update($scope.species).then(function (response) {
        toastr.success(response.data.message, 'Updated!');
      }).catch(function (response) {
        toastr.error(response.data.message, 'Could not update species.');
      });
    };

    $scope.getOne = function() {
      Species.getOne($stateParams.id).then(function (response) {
        $scope.species = response.data;
      }).catch(function (response) {
        toastr.error(response.data.message, 'Couldn\'t get species.');
      });
    };

    $scope.isEditor = function() {
      return User.isEditor();
    };

    $scope.isAdmin = function() {
      return User.isAdmin();
    };
  });

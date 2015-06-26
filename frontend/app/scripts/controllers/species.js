'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:SpeciesCtrl
 * @description
 * # SpeciesCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('SpeciesCtrl', function ($scope, Species, toastr, $stateParams) {
    var params = {
        scientificName: $scope.scientificName,
        commonName: $scope.commonName,
        taxon: $scope.taxon,
        leadOffice: $scope.leadOffice,
        range: $scope.range
      };

    $scope.createSpecies = function() {
      Species.createSpecies(params).then(function (response) {
        toastr.success(response.data.message, 'Created!');
      }).catch(function (response) {
        toastr.error(response.data.message, 'Could not create species.');
      });
    };

    $scope.updateSpecies = function() {
      Species.updateSpecies(params).then(function (response) {
        toastr.success(response.data.message, 'Updated!');
      }).catch(function (response) {
        toastr.error(response.data.message, 'Could not update species.');
      });
    };

    $scope.getOne = function() {
      Species.getOne($stateParams.id).then(function (response) {
        console.log(response);
        $scope.species = response.data;
      }).catch(function (response) {
        toastr.error(response.data.message, 'Couldn\'t get species.');
      });
    };
  });

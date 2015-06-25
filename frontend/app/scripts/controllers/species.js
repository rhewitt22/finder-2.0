'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:SpeciesCtrl
 * @description
 * # SpeciesCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('SpeciesCtrl', function ($scope, $http, toastr) {

    $scope.createSpecies = function() {
      var params = {
        scientificName: $scope.scientificName,
        commonName: $scope.commonName,
        taxon: $scope.taxon,
        leadOffice: $scope.leadOffice,
        range: $scope.range
      };

      $http.post('http://localhost:1337/species/create', params).then(function (response) {
        toastr.success(response.data.message, 'Created!');
      }).catch(function (response) {
        toastr.error(response.data.message, 'Could not create species');
      });
    };

    $scope.getSpecies = function() {
      $http.get('http://localhost:1337/species/').then( function (response) {
        $scope.species = response.data;
      }).catch( function (response) {
        if (response.status === 401){
          toastr.error('You must be logged in to view the species list.', response.statusText);
        } else {
          toastr.error('Could not get species data.', response.statusText);
        }
      });
    };

  });

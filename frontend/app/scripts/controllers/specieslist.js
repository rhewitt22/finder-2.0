'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:SpecieslistCtrl
 * @description
 * # SpecieslistCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('SpecieslistCtrl', function ($scope, Species, toastr) {
    Species.getSpecies().then(function(response) {
      $scope.species = response.data;
    }).catch( function (response) {
      if (response.status === 401){
        toastr.error(response.statusText, 'You must be logged in to view the species list.');
      } else {
        toastr.error(response.statusText, 'Could not get species data.');
      }
    });
  });

'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:SpecieslistCtrl
 * @description
 * # SpecieslistCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('SpeciesListCtrl', function ($scope, $state, User, Species, toastr) {
    $scope.$state = $state;
    $scope.isAdmin = function() {
      return User.isAdmin();
    };

    $scope.isEditor = function() {
      return User.isEditor();
    };

    $scope.getSpecies = function() {
      Species.getSpecies().then(function(response) {
        $scope.species = Species.alphabetizeRange(response.data);
      }).catch( function (response) {
        if (response.status === 401){
          toastr.error(response.statusText, 'You must be logged in to view the species list.');
        } else {
          toastr.error(response.statusText, 'Could not get species data.');
        }
      });
    };

    $scope.destroy = function(species) {
      Species.destroy(species).then(function(response) {
        toastr.success(response.data.message, response.statusText);
        $scope.getSpecies();
      }).catch(function (response) {
        toastr.error(response.data.message, response.statusText);
      });
    };
  });

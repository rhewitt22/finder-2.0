'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:SpeciesCtrl
 * @description
 * # SpeciesCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('UpdateSpeciesCtrl',
    function ($scope, Species, toastr, $stateParams, User, Office, $state, Map) {
      $scope.$state = $state;
      $scope.center = {
        lat: 34.8934492,
        lng: -94.1480978,
        zoom: 3
      };

    Office.getOffices().then(function (response) {
      $scope.offices = response.data;
    });

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
        $scope.loadMap();
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

    $scope.loadMap = function() {
      Map.getStates($scope.species.range).then(function (response) {
        angular.extend($scope, {
          geojson: {
            data: response.data,
            style: Map.geoStyle
          }
        });
        $scope.$on('leafletDirectiveGeoJson.click', function(ev, payload) {
          Map.toggleState(payload, $scope.species.range).then(function (response) {
            $scope.species.range = response.range;
            Map.updateStyle(response.payload);
          });
        });
      });
    };
  });

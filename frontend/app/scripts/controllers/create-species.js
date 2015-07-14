'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:CreateSpeciesCtrl
 * @description
 * # CreateSpeciesCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('CreateSpeciesCtrl', function ($scope, $filter, Species, Map, toastr) {
    var clickHandler = false;
    $scope.species = { range: [], status: [{}] };
    $scope.center = {
      lat: 34.8934492,
      lng: -94.1480978,
      zoom: 3
    };

    $scope.createSpecies = function() {
      if ($scope.species.status[$scope.species.status.length -1] === ''){
        $scope.species.status.pop();
      }
      Species.create($scope.species).then(function (response) {
        $scope.species = { range: [], status: [{}] };
        Map.clearStates($scope.geojson).then(function (response) {
          $scope.geojson = response.data;
          $scope.loadMap();
        });
        toastr.success(response.data.message, 'Created!');
      }).catch(function (response) {
        toastr.error(response.data.message, 'Could not create species.');
      });
    };

    $scope.loadMap = function() {
      Map.getGeoJSON().then(function (response) {
        angular.extend($scope, {
          geojson: {
            data: response.data,
            style: Map.geoStyle
          }
        });
        if (!clickHandler) {
          clickHandler = true;
          $scope.$on('leafletDirectiveGeoJson.click', function(ev, payload) {
            Map.toggleState(payload, $scope.species.range).then(function (response) {
              $scope.species.range = response.range;
              Map.updateStyle(response.payload);
            });
          });
        }
      });
    };

    $scope.changeStatus = function(index) {
      // If status has a name and date, add a placeholder for another status
      if(index === $scope.species.status.length -1 && $scope.species.status[index].name && $scope.species.status[index].date) {
        $scope.species.status.push('');
      }
    };
  });

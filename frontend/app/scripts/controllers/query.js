'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:QueryCtrl
 * @description
 * # QueryCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('QueryCtrl', function ($scope, Species, Map, toastr) {
    $scope.query = { range: [] };
    $scope.center = {
      lat: 34.8934492,
      lng: -94.1480978,
      zoom: 3
    };

    $scope.queryDatabase = function() {
      Species.query($scope.query).then(function (response) {
        $scope.results = response.data;
      }).catch(function (response) {
        toastr.error(response.statusText, 'Query unsuccessful.');
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
        $scope.$on('leafletDirectiveGeoJson.click', function(ev, payload) {
          Map.toggleState(payload, $scope.query.range).then(function (response) {
            $scope.query.range = response.range;
            Map.updateStyle(response.payload);
          });
        });
      });
    };
  });

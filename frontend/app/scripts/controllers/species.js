'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:SpeciesCtrl
 * @description
 * # SpeciesCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('SpeciesCtrl',
    function ($scope, Species, toastr, $stateParams, User, Map) {
      $scope.center = {
        lat: 34.8934492,
        lng: -94.1480978,
        zoom: 3
      };
      $scope.species = { range: []};

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
            style: geoStyle
          }
        });
        $scope.$on('leafletDirectiveGeoJson.click', function(ev, payload) {
          payload = toggleState(payload, $scope.species.range);
          updateStyle(payload);
        });
      });
    };

    function geoStyle(feature) {
      var props = {
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.5
      };

      if (feature.properties.inRange) {
        props.fillColor = 'red';
      } else {
        props.fillColor = 'green';
      }
      return props;
    }

    function updateStyle(feature) {
      var layer = feature.leafletEvent.target;
      if (feature.model.properties.inRange) {
        layer.setStyle({ fillColor: 'red' });
      } else {
        layer.setStyle({ fillColor: 'green' });
      }
    }

    function toggleState(payload) {
      var state = payload.model.properties.name;

      if (_.contains($scope.species.range, state)) {
        $scope.species.range = _.without($scope.species.range, state);
        payload.model.properties.inRange = false;
        toastr.info('Removed ' + state + ' from species range.');
      } else {
        $scope.species.range.push(state);
        payload.model.properties.inRange = true;
        toastr.info('Added ' + state + ' to species range.');
      }

      return payload;
    }
  });

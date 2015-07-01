'use strict';

/**
 * @ngdoc service
 * @name frontendApp.Map
 * @description
 * # Map
 * Service in the frontendApp.
 */
angular.module('frontendApp')
  .service('Map', function ($http, $q, toastr) {
    var geojson = null;

    function getGeoJSON() {
      return $http.get('../scripts/data/usa.geo.json');
    }

    function getStates(states) {
      if (states.length > 0){
        var deferred = $q.defer();
        getGeoJSON().then(function (response) {
          geojson = response;
          _.each(states, function(state) {
            _.each(geojson.data.features, function(value) {
              if (value.properties.name === state) {
                value.properties.inRange = true;
              }
            });
          });
          deferred.resolve(geojson);
        });
        return deferred.promise;
      } else {
        return getGeoJSON;
      }
    }

    function clearStates(geojson) {
      var deferred = $q.defer();
      _.each(geojson.data.features, function(value) {
        value.properties.inRange = false;
      });
      deferred.resolve(geojson);
      return deferred.promise;
    }

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

    function toggleState(payload, range) {
      var deferred = $q.defer();
      var state = payload.model.properties.name;

      if (_.contains(range, state)) {
        range = _.without(range, state);
        payload.model.properties.inRange = false;
        toastr.info('Removed ' + state + ' from species range.');
      } else {
        range.push(state);
        payload.model.properties.inRange = true;
        toastr.info('Added ' + state + ' to species range.');
      }
      deferred.resolve({
        payload: payload,
        range: range
      });

      return deferred.promise;
    }

    return {
      getStates: getStates,
      clearStates: clearStates,
      getGeoJSON: getGeoJSON,
      geoStyle: geoStyle,
      updateStyle: updateStyle,
      toggleState: toggleState
    };
  });

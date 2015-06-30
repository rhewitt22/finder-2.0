'use strict';

/**
 * @ngdoc service
 * @name frontendApp.Map
 * @description
 * # Map
 * Service in the frontendApp.
 */
angular.module('frontendApp')
  .service('Map', function ($http, $q) {
    var geojson = null;

    function getGeoJSON() {
      return $http.get('../scripts/data/usa.geo.json');
    }

    function getStates(states) {
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
    }

    return {
      getStates: getStates
    };
  });

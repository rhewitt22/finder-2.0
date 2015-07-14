'use strict';

/**
 * @ngdoc service
 * @name frontendApp.query
 * @description
 * # query
 * Service in the frontendApp.
 */
angular.module('frontendApp')
  .service('Query', function ($http, API_URL) {

    function endemic(state) {
      return $http.post(API_URL + 'query/endemic', state);
    }

    function nonEndemic(state) {
      return $http.post(API_URL + 'query/non-endemic', state);
    }

    function otherRegion() {
      return $http.get(API_URL + 'query/other-region');
    }

    return {
      otherRegion: otherRegion,
      nonEndemic: nonEndemic,
      endemic: endemic
    };
  });

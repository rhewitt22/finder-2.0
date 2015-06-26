'use strict';

/**
 * @ngdoc service
 * @name frontendApp.User
 * @description
 * # User
 * Service in the frontendApp.
 */
angular.module('frontendApp')
  .service('User', function ($http, API_URL) {

    function getUsers() {
      return $http.get(API_URL + 'user');
    }

    return {
      getUsers: getUsers
    };
  });

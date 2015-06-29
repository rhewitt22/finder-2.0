'use strict';

/**
 * @ngdoc service
 * @name frontendApp.User
 * @description
 * # User
 * Service in the frontendApp.
 */
angular.module('frontendApp')
  .service('User', function ($http, API_URL, $auth) {

    function getUsers() {
      return $http.get(API_URL + 'user');
    }

    function getUser(id) {
      return $http.get(API_URL + 'user/' + id);
    }

    function destroy(id) {
      return $http.post(API_URL + 'user/destroy/',{ id:id });
    }

    function update(user) {
      return $http.post(API_URL + 'user/update/', user);
    }

    function isEditor() {
      var payload = $auth.getPayload();
      if (!payload) {return  false;}
      return  payload.act === 'editor';
      
    }

    function isAdmin() {
      var payload = $auth.getPayload();
      if (!payload) {return false;}
      return  payload.act === 'admin';
    }

    function getUserId() {
      var payload = $auth.getPayload();
      if(!payload) {return false;}
      return payload.sub;
    }

    return {
      getUsers: getUsers,
      getUser: getUser,
      getUserId: getUserId,
      destroy: destroy,
      update: update,
      isEditor: isEditor,
      isAdmin: isAdmin
    };
  });

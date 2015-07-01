'use strict';

/**
 * @ngdoc service
 * @name frontendApp.species
 * @description
 * # species
 * Service in the frontendApp.
 */
angular.module('frontendApp')
  .service('Species', function ($http, API_URL) {

    function getSpecies() {
      return $http.get(API_URL + 'species/');
    }

    function getOne(id) {
      return $http.get(API_URL + 'species/' + id);
    }

    function create(species) {
      return $http.post(API_URL + 'species/create', species);
    }

    function update(species) {
      return $http.post(API_URL + 'species/update/' + species.id, species);
    }

    function destroy(species) {
      return $http.post(API_URL + 'species/destroy/', species);
    }

    function query(params) {
      if (params.range.length === 0) {
        delete params.range;
      }
      console.log(params);
      //return $http.post(API_URL + 'species/', params);
    }

    return {
      getSpecies: getSpecies,
      getOne: getOne,
      create: create,
      update: update,
      destroy: destroy,
      query: query
    };
  });

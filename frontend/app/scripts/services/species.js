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

    function createSpecies(species) {
      return $http.post(API_URL + 'species/create', species);
    }

    function updateSpecies(species) {
      return $http.post(API_URL + 'species/update/' + species.id, species);
    }

    return {
      getSpecies: getSpecies,
      getOne: getOne,
      createSpecies: createSpecies,
      updateSpecies: updateSpecies
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:PremadeQueryCtrl
 * @description
 * # PremadeQueryCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('PremadeQueryCtrl', function ($scope, toastr, Query, Species) {
    $scope.query = {};
    $scope.toggle = {
      endemic: false,
      nonEndemic: false,
      otherRegion: false
    };
    $scope.loading = false;

    $scope.queryEndemic = function() {
      $scope.loading = true;
      toggleResults('endemic');
      Query.endemic({ state: $scope.query.endemic })
        .then(onSuccess)
        .catch(onError)
        .finally(stopLoader);
    };

    $scope.queryNonEndemic = function() {
      $scope.loading = true;
      toggleResults('nonEndemic');
      Query.nonEndemic({ state: $scope.query.nonEndemic })
        .then(onSuccess)
        .catch(onError)
        .finally(stopLoader);
    };

    $scope.otherRegion = function() {
      $scope.loading = true;
      toggleResults('otherRegion');
      Query.otherRegion()
        .then(onSuccess)
        .catch(onError)
        .finally(stopLoader);
    };

    function onSuccess(response) {
      $scope.results = Species.alphabetizeRange(response.data);
      toastr.success(response.statusText);
    }

    function onError(response) {
      toastr.error(response.message);
    }

    function stopLoader() {
      $scope.loading = false;
    }

    function toggleResults(query) {
      _.each($scope.toggle, function(value, key, list) {
        if (key === query) {
          list[key] = true;
        } else {
          list[key] = false;
        }
      });
    }
  });

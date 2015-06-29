'use strict';

angular.module('frontendApp')
  .config(function($urlRouterProvider, $stateProvider, $authProvider, toastrConfig) {
    $urlRouterProvider.otherwise('/');

    $stateProvider

      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'LoginCtrl'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })

      .state('species', {
        url: '/species',
        templateUrl: 'views/species/main.html',
        controller: 'SpeciesCtrl'
      })

      .state('species.list', {
        url: '/list',
        templateUrl: 'views/species/list.html',
        controller: 'SpecieslistCtrl'
      })

      .state('species.create', {
        url: '/create',
        templateUrl: 'views/species/create.html',
        controller: 'SpeciesCtrl'
      })

      .state('species.update', {
        url: '/update/:id',
        templateUrl: 'views/species/update.html',
        controller: 'SpeciesCtrl'
      })

      .state('species.detail', {
        url: '/detail/:id',
        templateUrl: 'views/species/detail.html',
        controller: 'SpeciesCtrl'
      })

      .state('species.history', {
        url: '/history',
        templateUrl: 'views/species/history.html',
        controller: 'HistoryCtrl'
      })

      .state('user', {
        url: '/user',
        templateUrl: 'views/user/main.html',
        controller: 'ProfileCtrl'
      })

      .state('user.profile', {
        url: '/profile',
        templateUrl: 'views/user/profile.html',
        controller: 'ProfileCtrl'
      })

      .state('user.update', {
        url: '/update/:id',
        templateUrl: 'views/user/profile.html',
        controller: 'ProfileCtrl'
      })

      .state('user.admin', {
        url: '/admin',
        templateUrl: 'views/user/admin.html',
        controller: 'UserAdminCtrl'
      });

    $authProvider.loginUrl = 'http://localhost:1337/auth/login';
    $authProvider.registerUrl = 'http://localhost:1337/auth/register';
    $authProvider.google({
      url: 'http://localhost:1337/auth/google',
      redirectUri: 'http://localhost:9000/',
      clientId: '302206927623-i66d9a66fda2g1v0cpr6tinglhlasbj0.apps.googleusercontent.com'
    });

    angular.extend(toastrConfig, {
      positionClass: 'toast-bottom-right'
    });
  })
  .constant('API_URL', 'http://localhost:1337/');

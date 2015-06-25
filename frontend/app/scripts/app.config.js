'use strict';

angular.module('frontendApp')
  .config(function($urlRouterProvider, $stateProvider, $authProvider) {
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
        templateUrl: 'views/species/home.html',
        controller: 'SpeciesCtrl'
      })

      .state('species.list', {
        url: '/list',
        templateUrl: 'views/species/list.html',
        controller: 'SpeciesCtrl'
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

      .state('profile', {
        url: '/user/profile',
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      });

    $authProvider.loginUrl = 'http://localhost:1337/auth/login';
    $authProvider.registerUrl = 'http://localhost:1337/auth/register';
    $authProvider.google({
      url: 'http://localhost:1337/auth/google',
      redirectUri: 'http://localhost:9000/',
      clientId: '302206927623-i66d9a66fda2g1v0cpr6tinglhlasbj0.apps.googleusercontent.com'

    });
  });

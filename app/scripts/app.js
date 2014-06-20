'use strict';

/**
 * @ngdoc overview
 * @name badgerApp
 * @description
 * # badgerApp
 *
 * Main module of the application.
 * Copyright Jeremy Nevill (c) 2014
 */
angular
  .module('badgerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/csv', {
        templateUrl: 'views/csv.html',
        controller: 'MainCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

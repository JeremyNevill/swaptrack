'use strict';

/**
 * @ngdoc function
 * @name badgerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the badgerApp
 * Copyright Jeremy Nevill (c) 2014
 */
angular.module('badgerApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

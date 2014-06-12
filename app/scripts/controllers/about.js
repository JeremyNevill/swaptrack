'use strict';

/**
 * @ngdoc function
 * @name badgerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the badgerApp
 */
angular.module('badgerApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

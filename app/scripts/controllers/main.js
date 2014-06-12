'use strict';

/**
 * @ngdoc function
 * @name badgerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the badgerApp
 */
angular.module('badgerApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

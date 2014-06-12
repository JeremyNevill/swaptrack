'use strict';

/**
 * @ngdoc function
 * @name badgerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the badgerApp
 */
angular.module('badgerApp')
    .controller('MainCtrl', function ($scope, $firebase) {

        var peopleRef = new Firebase("https://badger.firebaseio.com/people");
        $scope.people = $firebase(peopleRef);


        $scope.people = $firebase(peopleRef);
        $scope.addPerson = function () {
            $scope.people.$add($scope.newPerson);
            $scope.newPerson = "";
        }


        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];


    });

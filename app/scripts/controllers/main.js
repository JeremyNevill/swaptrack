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

        $scope.userId = "112233";

        var userBaseUrl = "https://badger.firebaseio.com/users/" + $scope.userId;
        var userBase = new Firebase(userBaseUrl);
        var userMissingsBase = new Firebase(userBaseUrl + '/missings');
        var userSwapsBase = new Firebase(userBaseUrl + '/swaps');

        $scope.user = $firebase(userBase);
        $scope.userMissings = $firebase(userMissingsBase);
        $scope.userSwaps = $firebase(userSwapsBase);

        $scope.addMissing = function () {
            $scope.userMissings.$add($scope.newMissing);
            $scope.newMissing = "";
        }

        $scope.addSwap = function () {
            $scope.userSwaps.$add($scope.newSwap);
            $scope.newSwap = "";
        }


    });

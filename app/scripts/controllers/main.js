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
        $scope.userSwaps = [];//$firebase(userSwapsBase);
        $scope.otherSwaps = [];

        $scope.addMissing = function () {
            $scope.userMissings.$add($scope.newMissing);
            //$scope.userMissings.push({"name": $scope.newMissing});

            


            $scope.newMissing = "";
        }

        $scope.addSwap = function () {
            //$scope.userSwaps.$add($scope.newSwap);
            $scope.userSwaps.push({"name": $scope.newSwap});
            $scope.newSwap = "";
        }

        $scope.addOtherSwap = function () {
            $scope.otherSwaps.push({"name": $scope.newOtherSwap});
            $scope.newOtherSwap = "";
        }


//        $scope.deleteMissing = function (e) {
//            $scope.userMissings.splice(index, 1);
//       };

        $scope.deleteMissing = function (id) {
            $scope.userMissings.$remove(id);
        };

        $scope.deleteSwap = function (index) {
            $scope.userSwaps.splice(index, 1);
        };

        $scope.clearMissings = function () {
            $scope.userMissings = [];
        };

        $scope.clearSwaps = function () {
            $scope.userSwaps = [];
        };

        $scope.clearOtherSwaps = function () {
            $scope.otherSwaps = [];
        };

    });

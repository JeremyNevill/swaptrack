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

        var baseRef = new Firebase('https://badger.firebaseio.com');
        var auth = new FirebaseSimpleLogin(baseRef, function (error, user) {
            $scope.userId = user.uid;

            userBaseUrl = "https://badger.firebaseio.com/users/" + $scope.userId;
            userBase = new Firebase(userBaseUrl);
            userMissingsBase = new Firebase(userBaseUrl + '/missings');
            userSwapsBase = new Firebase(userBaseUrl + '/swaps');

            $scope.user = $firebase(userBase);
            $scope.userMissings = $firebase(userMissingsBase);
            $scope.userSwaps = $firebase(userSwapsBase);
        });

        $scope.userId = '';

        var userBaseUrl = "https://badger.firebaseio.com/users/" + $scope.userId;
        var otherUserBaseUrl = "";

        var userBase = new Firebase(userBaseUrl);
        var userMissingsBase = new Firebase(userBaseUrl + '/missings');
        var userSwapsBase = new Firebase(userBaseUrl + '/swaps');

        $scope.user = [];
        $scope.userMissings = [];
        $scope.userSwaps = [];
        $scope.otherSwaps = [];
        $scope.matches=[];


        // Anon Login

        auth.login('anonymous', {
            rememberMe: true
        });


        // Missings

        $scope.addMissing = function () {
            $scope.userMissings.$add($scope.newMissing);
            //$scope.userMissings.push({"name": $scope.newMissing});
            $scope.newMissing = "";

        }

        $scope.deleteMissing = function (id) {
            $scope.userMissings.$remove(id);
        };

        $scope.clearMissings = function () {
            $scope.userMissings = [];
        };


        // Swaps

        $scope.addSwap = function () {
            $scope.userSwaps.$add($scope.newSwap);
            $scope.newSwap = "";
        }

        $scope.deleteSwap = function (index) {
            $scope.userSwaps.splice(index, 1);
        };

        $scope.clearSwaps = function () {
            $scope.userSwaps = [];
        };


        /// Other Swaps - pull from other user's id

        $scope.getOtherData = function () {

            $scope.otherSwaps = ['Loading...'];

            otherUserBaseUrl = "https://badger.firebaseio.com/users/" + $scope.otherUserId + '/swaps';
            var otherUserBase = new Firebase(otherUserBaseUrl);
            console.log(otherUserBaseUrl);
            $scope.otherSwaps = $firebase(otherUserBase);

        };



        $scope.$watch('otherSwaps', function() {

            var keys = $scope.otherSwaps.$getIndex();
            console.log("count: " + keys.length);



        });



        $scope.matchSwaps = function () {

            var uM = $scope.userMissings.$getIndex();
            var oS = $scope.otherSwaps.$getIndex();

            var i = 0;
            var j = 0;

            for (i = 0; i < uM.length; i++) {

                for (j = 0; j < oS.length; j++) {

                    if ($scope.userMissings[i] === $scope.otherSwaps[j]) {

                         $scope.matches.push($scope.userMissings[i]);
                        alert("Match:" + $scope.userMissings[i]);

                    }
                }
            }


        };
    });

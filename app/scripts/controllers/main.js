'use strict';

/**
 * @ngdoc function
 * @name badgerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the badgerApp
 * Copyright Jeremy Nevill (c) 2014
 */
angular.module('badgerApp')
    .controller('MainCtrl', function ($scope, $firebase) {

        var baseRef = new Firebase('https://badger.firebaseio.com');


        $scope.userId = '';
        $scope.isLoggedIn = false;

        var userBaseUrl = "https://badger.firebaseio.com/users/" + $scope.userId;
        var otherUserBaseUrl = "";

        var userBase = new Firebase(userBaseUrl);
        var userMissingsBase = new Firebase(userBaseUrl + '/missings');
        var userSwapsBase = new Firebase(userBaseUrl + '/swaps');

        $scope.user = [];
        $scope.userMissings = [];
        $scope.userSwaps = [];
        $scope.otherSwaps = [];
        $scope.matches = [];


        var auth = new FirebaseSimpleLogin(baseRef, function (error, user) {
            if (error) {
                // an error occurred while attempting login
                console.log(error);
            } else if (user) {
                // user authenticated with Firebase
                console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
                $scope.userId = user.uid;

                userBaseUrl = "https://badger.firebaseio.com/users/" + $scope.userId;
                userBase = new Firebase(userBaseUrl);
                userMissingsBase = new Firebase(userBaseUrl + '/missings');
                userSwapsBase = new Firebase(userBaseUrl + '/swaps');

                $scope.user = $firebase(userBase);
                $scope.userMissings = $firebase(userMissingsBase);
                $scope.userSwaps = $firebase(userSwapsBase);
                $scope.userDisplayName = user.displayName;

                $scope.isLoggedIn = true;
            } else {
                // user is logged out
            }
        });

        $scope.FacebookLogin = function () {
            auth.login('facebook', {
                rememberMe: true
            });
        };

        $scope.Logout = function () {
            auth.logout();
            $scope.userId = '';
        };


        // Missings
        $scope.addMissing = function () {
            var newMissingsSplit = $scope.newMissing.split(",");
            for (var m in newMissingsSplit) {
                if (newMissingsSplit[m].length > 0) {
                    $scope.userMissings.$add(newMissingsSplit[m]);
                }
            }
            $scope.newMissing = "";
            //$scope.matchSwaps();
        }

        $scope.deleteMissing = function (id) {
            $scope.userMissings.$remove(id);
            $scope.matchSwaps();

        };

        $scope.clearMissings = function () {
            $scope.userMissings = [];
            $scope.matchSwaps();
        };


        /// Other Swaps - pull from other user's id
        $scope.getOtherData = function () {
            otherUserBaseUrl = baseRef + "/users/" + $scope.otherUserId + '/swaps';
            var otherUserBase = new Firebase(otherUserBaseUrl);
            $scope.otherSwaps = $firebase(otherUserBase);
        };

        // Match swaps with other user
        $scope.matchSwaps = function () {

            $scope.matches = [];
            $scope.userMissings.$getIndex().forEach(function (key, i) {
                $scope.otherSwaps.$getIndex().forEach(function (swapKey, j) {
                    if ($scope.userMissings[key] === $scope.otherSwaps[swapKey]) {
                        var match = ($scope.otherSwaps[swapKey]);
                        $scope.matches.push(match);
                    }
                });
            });

        };


        // Swaps
        $scope.addSwap = function () {

            var newSwapsSplit = $scope.newSwap.split(",");
            for (var m in newSwapsSplit) {
                if (newSwapsSplit[m].length > 0) {
                    $scope.userSwaps.$add(newSwapsSplit[m]);
                }
            }
            $scope.newSwap = "";
        }

        $scope.deleteSwap = function (index) {
            $scope.userSwaps.$remove(index);
            $scope.matchSwaps();
        };

        $scope.clearSwaps = function () {
            $scope.userSwaps = [];
        };

        // Anon Login
        /*
         $scope.AnonLogin = function () {
         auth.login('anonymous', {
         rememberMe: true
         });
         };
         */
    });

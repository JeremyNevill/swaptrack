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

            } else {
                // user is logged out
            }
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
        $scope.matches = [];


        // Anon Login
        /*
        $scope.AnonLogin = function () {
            auth.login('anonymous', {
                rememberMe: true
            }); 
        };
        */

      
        $scope.FacebookLogin = function () {
            auth.login('facebook', {
                rememberMe: true
            });
        };

        $scope.Logout = function () {
            auth.logout();
        };

        // Missings
        $scope.addMissing = function () {
            $scope.userMissings.$add($scope.newMissing);
            $scope.newMissing = "";
            $scope.matchSwaps();
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
            $scope.userSwaps.$add($scope.newSwap);
            $scope.newSwap = "";
        }

        $scope.deleteSwap = function (index) {
            $scope.userSwaps.$remove(index);
            $scope.matchSwaps();
        };

        $scope.clearSwaps = function () {
            $scope.userSwaps = [];
        };
    });

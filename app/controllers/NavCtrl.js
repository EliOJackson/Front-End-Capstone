"use strict";

angular.module("Datr").controller("NavCtrl", function ($scope, AuthFactory) {
    
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $scope.$apply($scope.user = true);
            $scope.uid = firebase.auth().currentUser.uid;
            
        } else {
            $scope.$apply($scope.user = false);
        }
    });
    // LOGIN USER
    // call auth factory to log in user
    $scope.login = () => {
        AuthFactory.login()
            .then(() => {
                console.log("Yay, logged in");
                // $scope.uid = firebase.auth().currentUser.uid;
                })
            .catch(err => {
                console.log("error", err);
            });
    };

    // LOGOUT USER
    // call auth factory to log out user
    $scope.logout = () => {
        AuthFactory.logout()
            .then(() => {
                $scope.$apply($scope.user = false);
                $scope.uid = 0;
                
                console.log("You is gone");
            });
    };

});
"use strict";

angular.module("Datr").controller("NavCtrl", function ($scope, AuthFactory) {
    
    // LOGIN USER
    // call auth factory to log in user
    $scope.login = () => {
        AuthFactory.login()
            .then(() => {
                console.log("Yay, logged in");
                $scope.uid = firebase.auth().currentUser.uid;
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
                console.log("You is gone");
            });
    };

});
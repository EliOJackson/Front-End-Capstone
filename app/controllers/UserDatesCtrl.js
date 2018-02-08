"use strict";

angular.module("Datr").controller("UserDatesCtrl", function ($scope, DateFactory, $routeParams) {
    $scope.title = "User's Dates";

 
    DateFactory.getSavedDates($routeParams.uid)
        .then(data => {
            $scope.dates = data;
        });
});
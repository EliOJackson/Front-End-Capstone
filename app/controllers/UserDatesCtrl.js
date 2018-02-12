"use strict";

angular.module("Datr").controller("UserDatesCtrl", function ($scope, DateFactory, $routeParams, $q) {
    $scope.title = "User's Dates";
    // $scope.dates = [];
 
    DateFactory.getSavedDates($routeParams.uid)
        .then(data => {
            let promiseArray = [];
            let savedDateIds = Object.entries(data);
            savedDateIds.forEach(savedDateId => {
                console.log(savedDateId[1].dateId);
                let saved = DateFactory.datesToPrint(savedDateId[1].dateId);
                promiseArray.push(saved);

            });
            return $q.all(promiseArray)
                .then((dates) => {
                    console.log("who knows", dates);
                });
        });
});
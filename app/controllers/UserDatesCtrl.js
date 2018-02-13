"use strict";

angular.module("Datr").controller("UserDatesCtrl", function ($scope, DateFactory, $routeParams, $q, RatingFactory) {
    $scope.title = "User's Dates";
    $scope.dates = [];
 
    DateFactory.getSavedDates($routeParams.uid)
        .then(data => {
            let promiseArray = [];
            let savedDateIds = Object.entries(data);
            savedDateIds.forEach(savedDateId => {
                console.log("test",savedDateId[1].dateId);
                let saved = DateFactory.datesToPrint(savedDateId[1].dateId);
                promiseArray.push(saved);
                

            });
            return $q.all(promiseArray)
                .then(( dates ) => {
                    console.log(dates, "pls");
                    dates.forEach(date => {
                        console.log('date',date);
                        console.log('savedDateId',savedDateIds);
                    //     // console.log(RatingFactory.rateDates(date.data));
                    //     console.log('date.data',date.data);
                    //     $scope.dates.push(date.data);
                    });
                    console.log(RatingFactory.rateDates($scope.dates));
                    console.log('$scope.dates',$scope.dates);
                });
        });
});
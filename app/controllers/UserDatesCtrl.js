"use strict";

angular.module("Datr").controller("UserDatesCtrl", function ($scope, DateFactory, $routeParams, $q, RatingFactory, $http, FBUrl, FilterFactory) {
    $scope.title = "User's Dates";
    $scope.dates = [];
    $scope.search = FilterFactory;
    
    DateFactory.getSavedDates($routeParams.uid)
        .then(data => {
            let promiseArray = [];
            let savedDateIds = Object.entries(data);
            savedDateIds.forEach(savedDateId => {
                savedDateId[1].fbKey = savedDateId[0];
                console.log('savedDateId', savedDateId[0]);
                console.log("test", savedDateId[1]);
                let saved = DateFactory.datesToPrint(savedDateId[1].dateId, savedDateId[1].fbKey);
                promiseArray.push(saved);



            });
            return $q.all(promiseArray)
                .then((dates) => {
                    dates.forEach(date => {
                        $scope.dates.push(date.data);
                        RatingFactory.rateDates($scope.dates);
                    });
                });
        });

    $scope.delete = (savedKey) => {
        return $q((resolve, reject) => {
            $http
                .delete(`${FBUrl}/saved/${savedKey}.json`
                )
                .then(() => {
                    $scope.dates = [];
                    resolve();
                    DateFactory.getSavedDates($routeParams.uid)
                        .then(data => {
                            let promiseArray = [];
                            let savedDateIds = Object.entries(data);
                            savedDateIds.forEach(savedDateId => {
                                savedDateId[1].fbKey = savedDateId[0];
                                let saved = DateFactory.datesToPrint(savedDateId[1].dateId, savedDateId[1].fbKey);
                                promiseArray.push(saved);



                            });
                            return $q.all(promiseArray)
                                .then((dates) => {
                                    dates.forEach(date => {
                                        $scope.dates.push(date.data);
                                        RatingFactory.rateDates($scope.dates);
                                    });
                                });
                        });
                });
        });
    };
});
"use strict";

angular.module("Datr").controller("DateInfoCtrl", function ($scope, DateFactory, $routeParams, RatingFactory) {
    $scope.title = "Date Info";
    $scope.dateId = $routeParams;
    

    DateFactory.getOneDate($scope.dateId.dateId)
    .then(data => {
        $scope.dates = [];
        $scope.dates.push(data);
        RatingFactory.rateDates($scope.dates);
        console.log($scope.dates, "idk");
    });

});
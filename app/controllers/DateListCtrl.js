"use strict";

angular.module("Datr").controller("DateListCtrl", function ($scope, DateFactory) {
    $scope.title = "Date List";

    DateFactory.getAllDates()
    .then(data => {
        $scope.dates = data;
        //run get all dates from Date Factory and print to partial.
    });

    

});
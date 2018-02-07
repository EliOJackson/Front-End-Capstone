"use strict";

angular.module("Datr").controller("UserDatesCtrl", function ($scope, DateFactory) {
    $scope.title = "User's Dates";

 
    DateFactory.getSavedDates()//uid)
        .then(data => {
            //get UID and loop over saved dates in FB to pull the
        });
});
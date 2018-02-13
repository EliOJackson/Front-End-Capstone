"use strict";

angular.module("Datr").controller("AddDateCtrl", function ($scope, DateFactory) {
    $scope.title = "Add Date";
    $scope.inputOne = "Date Name";
    $scope.inputTwo = "Date Description";
    $scope.inputThree = "Date Address";
    $scope.inputFour = "Img Url";
    $scope.buttonName = "Upload Date";

    $scope.date = {
        name: '',
        description: '',
        location: '',
        url: '',
    };

    $scope.saveItem = () => {
        DateFactory.addDate($scope.date, "dates")
            .then((data) => {

            });
    };

});
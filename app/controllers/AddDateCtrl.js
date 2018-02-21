"use strict";

angular.module("Datr").controller("AddDateCtrl", function ($scope, DateFactory, GoogleFactory, $window) {
    $scope.title = "Add Date";
    $scope.inputOne = "Date Name";
    $scope.inputTwo = "Date Description";
    $scope.inputThree = "Date Address";
    $scope.inputFour = "Img Url";
    $scope.buttonName = "Upload Date";

   $scope.searchInput = "";

    $scope.date = {
        name: '',
        description: '',
        location: '',
        url: '',
    };

    $scope.saveItem = () => {
        DateFactory.addDate($scope.date, "dates")
            .then((data) => {
            $window.alert(`Great Job! You saved ${$scope.date.name} as a date!`);
                $scope.date = {
                    name: '',
                    description: '',
                    location: '',
                    url: '',
                };

            });
    };

    $scope.getSearch = () => {
        let searchString = $scope.searchInput;
        console.log(searchString);
        GoogleFactory.search(searchString)
        .then((data) => {
            console.log(data[0].id);
            let placeId = data[0].place_id;
            GoogleFactory.placeDetails(placeId)
            .then((placeInfo) => {
                console.log("places data", placeInfo);
            
            });
        });
    };

});
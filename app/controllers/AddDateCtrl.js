"use strict";

angular.module("Datr").controller("AddDateCtrl", function ($scope, DateFactory, GoogleFactory, $window, $route) {
    $scope.title = "Add Date";
    $scope.inputOne = "Date Name";
    $scope.inputTwo = "Date Description";
    $scope.inputThree = "Date Address";
    $scope.inputFour = "Img Url";
    $scope.buttonName = "Upload Date";
    $scope.searchInput = "";
    $scope.places = [];

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $scope.$apply($scope.user = true);
            $scope.uid = firebase.auth().currentUser.uid;
        } else {
            $scope.$apply($scope.user = false);
        }
    });

    $scope.date = {
        name: '',
        description: '',
        location: '',
        url: '',
    };

    $scope.reload = () => {
        $route.reload();
    };

    $scope.googleRadio = () => {
        $scope.userAdd = false;
        $scope.google = true;
    };

    $scope.userRadio = () => {
        $scope.google = false;
        $scope.userAdd = true;
    };

    $scope.saveItem = () => {
        if ($scope.date.name !== "" && $scope.date.location !== "") {
            DateFactory.addDate($scope.date, "dates")
                .then((data) => {
                    let saveObj = {
                        dateId: data.data.name,
                        uid: $scope.uid
                    };
                    DateFactory.save(saveObj);
                    $scope.createdName = $scope.date.name;
                    $scope.toggleCreateDate();
                    $scope.date = {
                        name: '',
                        description: '',
                        location: '',
                        url: '',
                    };

                });
        } else {
            $scope.toggleRequiredInfo();
        }
    };

    $scope.getSearch = () => {
        $scope.googleSelected = false;
        let searchString = $scope.searchInput;
        GoogleFactory.search(searchString)
            .then((searchedPlaces) => {
                $scope.places = searchedPlaces;
                $scope.searched = true;

            });
    };

    $scope.keySearch = (event) => {
        if (event.keyCode === 13 && $scope.searchInput !== undefined) {
            $scope.googleSelected = false;
            let searchString = $scope.searchInput;
            GoogleFactory.search(searchString)
                .then((searchedPlaces) => {
                    $scope.places = searchedPlaces;
                    $scope.searched = true;
                });
        }
    };

    $scope.toggleCreateDate = () => {
        document.querySelector("#createDate").classList.toggle("is-active");
    };
    $scope.toggleRequiredInfo = () => {
        document.querySelector("#requiredInfo").classList.toggle("is-active");
    };

    $scope.addToForm = function () {
        $scope.googleSelected = true;
        $window.scrollTo(500, 500);
        $scope.date = {
            name: this.place.name,
            description: '',
            location: this.place.formatted_address,
            phone: this.place.formatted_phone_number,
            url: this.place.image,
            website: this.place.website,
            tags: ''
        };
    };
});
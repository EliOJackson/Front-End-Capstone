"use strict";

angular.module("Datr").controller("AddDateCtrl", function ($scope, DateFactory, GoogleFactory, $window) {
    $scope.title = "Add Date";
    $scope.inputOne = "Date Name";
    $scope.inputTwo = "Date Description";
    $scope.inputThree = "Date Address";
    $scope.inputFour = "Img Url";
    $scope.buttonName = "Upload Date";

   $scope.searchInput = "";
   $scope.places = [];

    $scope.date = {
        name: '',
        description: '',
        location: '',
        url: '',
    };

    $scope.googleRadio = () => {
        $scope.userAdd = false;
        $scope.google = true;
        console.log('$scope.google',$scope.google);
    };

    $scope.userRadio = () => {
        console.log('$scope.google',$scope.google);
        $scope.google = false;
        $scope.userAdd = true;
    };



    $scope.saveItem = () => {
        DateFactory.addDate($scope.date, "dates")
            .then((data) => {
                $scope.createdName = $scope.date.name;
            $scope.toggleCreateDate();
                $scope.date = {
                    name: '',
                    description: '',
                    location: '',
                    url: '',
                };

            });
    };

    $scope.getSearch = () => {
        $scope.googleSelected = false;
        let searchString = $scope.searchInput;
        console.log(searchString);
        GoogleFactory.search(searchString)
        .then((searchedPlaces) => {
            console.log('searchedPlaces',searchedPlaces);
           $scope.places = searchedPlaces;
           console.log("scope.places", $scope.places);
            
            // console.log(data[0].id);
            // let placeId = data[0].place_id;
            // GoogleFactory.placeDetails(placeId)
            // .then((placeInfo) => {
            //     console.log("place info", placeInfo);
            //     $scope.places.push(placeInfo);
                $scope.searched = true;
        //     });
        });
    };
    $scope.keySearch = (event) => {
        if (event.keyCode === 13 && $scope.searchInput !== undefined) {
        $scope.googleSelected = false;            
        let searchString = $scope.searchInput;
        console.log(searchString);
        GoogleFactory.search(searchString)
        .then((searchedPlaces) => {
            console.log('searchedPlaces',searchedPlaces);
           $scope.places = searchedPlaces;
           console.log("scope.places", $scope.places);
                $scope.searched = true;
        });
    }
};

    $scope.toggleCreateDate = () => {
        document.querySelector("#createDate").classList.toggle("is-active");
    };

    $scope.addToForm = function() {
        $scope.googleSelected = true;
        console.log('$scope.googleSelected',$scope.googleSelected);
        $window.scrollTo(0,0);
        $scope.date = {
            name: this.place.name,
            description: '',
            location: this.place.formatted_address,
            phone: this.place.formatted_phone_number,
            url: this.place.image,
            website: this.place.website
        };
    };

});
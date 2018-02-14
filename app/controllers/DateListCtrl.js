"use strict";

angular.module("Datr").controller("DateListCtrl", function ($scope, DateFactory, $q, RatingFactory, FilterFactory, $window, $route, $routeParams) {
    $scope.title = "Date List";
    $scope.saved = {};
    $scope.search = FilterFactory;

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $scope.$apply($scope.user = true);
            $scope.uid = firebase.auth().currentUser.uid;

        } else {
            $scope.$apply($scope.user = false);
        }
    });

    // this runs on page load and gets all dates. Also called in my rating functions to auto update the page.
    function load() { 
        DateFactory.getAllDates()
            .then(data => {
                $scope.dates = data;
                RatingFactory.rateDates(data); // MAGIC, automatically updates $scope.dates
            });
    }

    //function to save a date to a users Profile. Creates a Saved Object in Firebase.
    $scope.saveDate = function () { 
        DateFactory.getSavedDates($scope.uid)
            .then((data) => {
                let saveObj = {                 // this obj will be passed into the save function
                    dateId: this.date.dateId,
                    uid: $scope.uid
                };
                let saveArray = [];
                let dateArrays = (Object.entries(data));
                dateArrays.forEach(dateArray => {
                    if (dateArray[1].dateId === this.date.dateId && dateArray[1].uid === $scope.uid) {  
                        saveArray.push(dateArray[1]);    //checks to find if this date is already saved by this user, if it is, pushes that into an array.
                    }
                });
                if (saveArray[0] !== undefined) {     // if a duplicate date has been pushed to this array, will run alert
                    $window.alert("You've already saved this date you Dingus!");
                }
                else {                                  // if no date has been pushed, save function is ran.
                    DateFactory.save(saveObj);
                    $window.alert(`You just saved ${this.date.name} as a date!`);
                }
            });
    };

    //rate function to be called in the partial on click. This will check to see if user has rated this date before or not.
    $scope.rate = function (rating) {
        let rateArray = [];
        let obj = {                         //obj to be passed into either rating function
            dateId: this.date.dateId,
            rating: rating,
            uid: firebase.auth().currentUser.uid
        };
        let dateId = this.date.dateId; 
        RatingFactory.getDateRating(dateId)   // passes date id and gets all ratings for this date
            .then((data) => {
                let rateObjects = Object.entries(data);
                rateObjects.forEach(rateObject => {
                    if (rateObject[1].uid === firebase.auth().currentUser.uid) {
                        rateArray.push(rateObject);   // if rating exists for user, pushes the rating ob into an empty array
                    }
                });
                if (rateArray !== undefined) {       // if array has an object, the patch function wil run, updating the users rating
                    let ratingToUpdate = rateArray[0][0];
                    RatingFactory.patchRate(obj, ratingToUpdate)
                        .then(() => {
                            patchRateAlert(obj);
                            load();
                        });
                }
                else {                              // if no rating object exists for user, posts new rating.
                    RatingFactory.newRate(obj)
                        .then(() => {
                            newRateAlert(obj);
                            load();
                        });
                }
            });
    };

    function newRateAlert(obj) {
        $window.alert(`You just rated it a ${obj.rating} out of 5!`);
    }
    function patchRateAlert(obj) {
        $window.alert(`You just updated your rating to ${obj.rating} out of 5!`);
    }

    load();
});
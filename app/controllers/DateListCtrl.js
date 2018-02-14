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

    console.log($scope.uid);


    function load() {
        DateFactory.getAllDates()
            .then(data => {
                $scope.dates = data;
                RatingFactory.rateDates(data); // MAGIC, automatically updates $scope.dates
            });
    }

    $scope.saveDate = function () {
        DateFactory.getSavedDates($scope.uid)
            .then((data) => {
                let saveObj = {
                    dateId: this.date.dateId,
                    uid: $scope.uid
                };
                let saveArray = [];
                let dateArrays = (Object.entries(data));
                dateArrays.forEach(dateArray => {
                    if (dateArray[1].dateId === this.date.dateId && dateArray[1].uid === $scope.uid) {
                        saveArray.push(dateArray[1]);
                    }
                });
                if (saveArray[0] !== undefined) {
                    $window.alert("You've already saved this date you Dingus!");
                }
                else {
                    DateFactory.save(saveObj);
                    $window.alert(`You just saved ${this.date.name} as a date!`);
                }
            });
    };

    $scope.rate = function (rating) {
        let rateArray = [];
        let obj = {
            dateId: this.date.dateId,
            rating: rating,
            uid: firebase.auth().currentUser.uid
        };
        let dateId = this.date.dateId;
        console.log(this.date.dateId, "rate click");
        RatingFactory.getDateRating(dateId)
            .then((data) => {
                let rateObjects = Object.entries(data);
                rateObjects.forEach(rateObject => {
                    if (rateObject[1].uid === firebase.auth().currentUser.uid) {
                        rateArray.push(rateObject);
                    }
                });
                if (rateArray !== undefined) {
                    let ratingToUpdate = rateArray[0][0];
                    RatingFactory.patchRate(obj, ratingToUpdate)
                        .then(() => {
                            patchRateAlert(obj);
                            load();
                        });
                }
                else {
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
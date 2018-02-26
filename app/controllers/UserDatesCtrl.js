"use strict";

angular.module("Datr").controller("UserDatesCtrl", function ($scope, DateFactory, $routeParams, $q, RatingFactory, $http, FBUrl, FilterFactory, $route, $window) {
    $scope.title = "User's Dates";
    $scope.dates = [];
    $scope.search = FilterFactory;
    
    function load() {
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
    }
    
        function deleteAlert() {
            $window.alert("Your date has been removed!");
            $route.reload();
        }
    
        $scope.toggleDelete = () => {
            document.querySelector("#deleteBtn").classList.toggle("is-active");         
        };
        
        $scope.delete = (savedKey) => {
            $scope.toggleDelete();
            DateFactory.deleteSaved(savedKey)
            .then(() => {
            });
        };
        
       $scope.refresh = () => {
           $route.reload();
    };

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
                if (rateArray.length > 0) {       // if array has an object, the patch function wil run, updating the users rating

                    let ratingToUpdate = rateArray[0][0];
                    RatingFactory.patchRate(obj, ratingToUpdate)
                        .then(() => {
                            console.log("obj.rating", obj.rating);
                            $scope.updateRating = obj.rating;
                            $scope.togglePatchRate();
                            load();
                        });
                }
                else {                              // if no rating object exists for user, posts new rating.
                    RatingFactory.newRate(obj)
                        .then(() => {
                            $scope.ratingName = this.$parent.date.name;
                            $scope.newRating = obj.rating;
                            console.log('$scope.ratingName', $scope.ratingName);
                            $scope.toggleNewRate();
                            load();
                        });
                }
            });
    };

    $scope.toggleNewRate = () => {
        document.querySelector("#newRate").classList.toggle("is-active");
    };
    $scope.togglePatchRate = () => {
        document.querySelector("#patchRate").classList.toggle("is-active");
    };

    load();

});

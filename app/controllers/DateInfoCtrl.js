"use strict";

angular.module("Datr").controller("DateInfoCtrl", function ($scope, DateFactory, $routeParams, RatingFactory, $window) {
    $scope.title = "Date Info";
    $scope.dateId = $routeParams;
    $scope.saved = {};
    $scope.disqusConfig = {
        disqus_shortname: 'Datr',
        disqus_identifier: $routeParams.dateId,
        disqus_url: `http://127.0.0.1:8080/#!/dates/${$routeParams.dateId}`
    };


    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $scope.$apply($scope.user = true);
            $scope.uid = firebase.auth().currentUser.uid;

        } else {
            $scope.$apply($scope.user = false);
        }
    });

    function load() {
        DateFactory.getOneDate($scope.dateId.dateId)
            .then(data => {
                $scope.dates = [];
                $scope.dates.push(data);
                RatingFactory.rateDates($scope.dates);
            });
    }

    $scope.toggleSaveModal = () => {
        document.querySelector("#saveBtn").classList.toggle("is-active");
    };
    $scope.toggleAlreadySaveModal = () => {
        document.querySelector("#alreadySaveBtn").classList.toggle("is-active");
    };

    DateFactory.getOneDate($scope.dateId.dateId)
    .then(data => {
        $scope.dates = [];
        $scope.dates.push(data);
        RatingFactory.rateDates($scope.dates);
        console.log($scope.dates, "idk");
    });

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
                    $scope.toggleAlreadySaveModal();
                
                }
                else {                                  // if no date has been pushed, save function is ran.
                    DateFactory.save(saveObj);
                    $scope.savedName = this.date.name;
                    $scope.toggleSaveModal();                }
            });
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
                            $scope.updateRating = obj.rating;
                            $scope.togglePatchRate();
                            load();
                        });
                }
                else {                              // if no rating object exists for user, posts new rating.
                    RatingFactory.newRate(obj)
                        .then(() => {
                            $scope.ratingName = this.date.name;
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

});
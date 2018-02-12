"use strict";

angular.module("Datr").controller("DateListCtrl", function ($scope, DateFactory, $q, lodash) {
    $scope.title = "Date List";
    $scope.saved = {};

    DateFactory.getAllDates()
        .then(data => {
            $scope.dates = data;
            let promiseArray = []; // setting a promise array to push all of my calls to FB for Ratings
            $scope.dates.forEach(date => {
                let dateId = date.dateId;
                let ratings = DateFactory.getDateRating(dateId);
                promiseArray.push(ratings); //pushing all of the dates from get date rating in to the array

            });
            return $q.all(promiseArray) // promise all on the array of the rating promises
                .then((dates) => {
                    dates.forEach(date => {
                        let ratingArray = [];
                        if (Object.keys(date).length > 0) { // if to filter out any objects returned without ratings
                            let ratingKeys = Object.keys(date);
                            ratingKeys.forEach(ratingKey => {
                                ratingArray.push(parseInt(date[ratingKey].rating));
                            });
                            let ratingAverage = average(ratingArray); // averages each array of dates using the function below
                            dateLoop(ratingAverage, date); //loops through the averaged ratings and adds them as a key on to their date
                        }
                    });
                });

            //internal function called on line 25
            function average(array) {
                let sum = array.reduce((b, a) => a += b);
                let avg = (sum / array.length).toFixed(2);
                return avg;
            }
            //internal function called on line 26
            function dateLoop(rating, dates) {
                let datesArrays = Object.entries(dates);
                datesArrays.forEach(dateArray => {
                    let dateId = dateArray[1].dateId;
                    for (let i = 0; i < $scope.dates.length; i++) {
                        if (dateId === $scope.dates[i].dateId) {
                            $scope.dates[i].rating = rating;
                        }
                    }
                });
            }
        });

    $scope.saveDate = function () {
        $scope.saved.dateId = this.date.dateId;
        $scope.saved.uid = firebase.auth().currentUser.uid;
        DateFactory.save($scope.saved);
        console.log('this.date.dateId',this.date.dateId);
        console.log('firebase.auth().currentUser.uid',firebase.auth().currentUser.uid);
    };


    // function getAllPreferredEvents() {
    //     var promises = [];
    //     for (var i = 0; i < $scope.preferences.length; i++) {
    //         var promise = EventFactory.getEventsByType($scope.preferences[i]);
    //         promises.push(promise);
    //     }
    //     console.log("promises", promises);
    //     $q.all(promises).then((data) => {
    //         flattenObjects(data);
    //     });
    // }

});
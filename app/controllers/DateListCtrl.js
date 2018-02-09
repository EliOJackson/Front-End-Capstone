"use strict";

angular.module("Datr").controller("DateListCtrl", function ($scope, DateFactory, $q, lodash) {
    $scope.title = "Date List";

    DateFactory.getAllDates()
        .then(data => {
            $scope.dates = data;
            let promiseArray = [];
            console.log('$scope.dates', $scope.dates);
            // let dateIdArray = [];
            $scope.dates.forEach(date => {
                let dateId = date.dateId;
                let ratings = DateFactory.getDateRating(dateId);
                promiseArray.push(ratings);

            });
            console.log('promiseArray', promiseArray);
            return $q.all(promiseArray)
                .then((dates) => {
                    dates.forEach(date => {
                        let ratingArray = [];
                        if (Object.keys(date).length > 0) {
                            console.log(date, "date with rating");
                            let ratingKeys = Object.keys(date);
                            console.log('ratingKeys', ratingKeys);
                            let ratingTotal = 0;
                            ratingKeys.forEach(ratingKey => {
                                console.log('date[ratingKey].rating', date[ratingKey].rating);
                                ratingArray.push(parseInt(date[ratingKey].rating));
                            });
                            let ratingAverage= average(ratingArray);
                            dateLoop(ratingAverage, date);
                            // date.rating = ratingAverage;
                            console.log(ratingArray, "ratingArray");
                            console.log('ratingTotal', ratingTotal);
                            console.log("dateid", date);
                            console.log('$scope.dates BIG MONEY',$scope.dates);

                        }
                    });
                });

            //internal function
            function average(array) {
                let sum = array.reduce((b, a) => a += b);
                let avg = (sum / array.length).toFixed(2);
                console.log(avg, "avg");
                return avg;
            }

            function dateLoop (rating, dates) {
                let datesArrays = Object.entries(dates);
                datesArrays.forEach(dateArray => {
                    let dateId= dateArray[1].dateId;
                    console.log (dateId, "dateId maybe");
                    for (let i = 0; i < $scope.dates.length; i++) {
                        if(dateId === $scope.dates[i].dateId) {
                            console.log("yahtzee", rating);
                            $scope.dates[i].rating = rating;
                        }
                        
                    }
                });
            }

            //run get all dates from Date Factory and print to partial.
            // call next promise, comments promise
            // return factory.nextfunction
            //.then 

        });


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
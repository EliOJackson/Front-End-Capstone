"use strict";

angular.module("Datr").factory("RatingFactory", function (FBUrl, $q, $http) {

    function rateDates(dates) {
        return $q((resolve, reject) => {
            let allDates = dates;
            let promiseArray = []; //setting a promise array to push all of my calls to FB for Ratings
            dates.forEach(date => {
                let dateId = date.dateId;
                let ratings = getDateRating(dateId);
                promiseArray.push(ratings); //pushing all of the dates from get date rating in to the array
            });
            return $q.all(promiseArray) //promise all on the array of the rating promises  
                .then((dates) => {
                    dates.forEach(date => {
                        let ratingArray = [];
                        if (Object.keys(date).length > 0) { //if to filter out any objects returned without ratings
                            let ratingKeys = Object.keys(date);
                            ratingKeys.forEach(ratingKey => {
                                ratingArray.push(parseInt(date[ratingKey].rating));
                            });
                            let ratingAverage = average(ratingArray); //averages each array of dates using the function below
                            dateLoop(ratingAverage, date, allDates); //loops through the averaged ratings and adds them as a key on to their date
                        }
                    });
                    resolve(dates);
                });
        });
    }
    //internal function called on line 25
    function average(array) {
        let sum = array.reduce((b, a) => a += b);
        let avg = (sum / array.length).toFixed(2);
        return avg;
    }
    //internal function called on line 26
    function dateLoop(rating, dates, allDates) {
        let datesArrays = Object.entries(dates);
        datesArrays.forEach(dateArray => {
            let dateId = dateArray[1].dateId;
            allDates.forEach(date => {
                if (dateId === date.dateId) {
                    date.rating = rating;
                }
            });
        });
    }

    function getDateRating(dateId) {
        return $q((resolve, reject) => {
            $http
                .get(`${FBUrl}rating.json?orderBy="dateId"&equalTo="${dateId}"`)
                .then(({ data }) => {
                    resolve(data);
                })
                .catch(error => {
                });
        });
    }
    function newRate(obj) {
        return $q((resolve, reject) => {
            $http
                .post(`${FBUrl}/rating.json`, JSON.stringify(obj))
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    function patchRate(obj, ratingKey) {
        return $q((resolve, reject) => {
            $http
                .patch(`${FBUrl}/rating/${ratingKey}.json`, JSON.stringify(obj))
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    return { rateDates, average, dateLoop, getDateRating, newRate, patchRate };
});
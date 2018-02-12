"use strict";

angular.module("Datr").factory("DateFactory", function (FBUrl, $q, $http) {

    function getAllDates() {
        return $q((resolve, reject) => {
            $http.get(`${FBUrl}/dates.json`)
                .then(({ data }) => {
                    Object.keys(data).map(dateKey => {
                        data[dateKey].dateId = dateKey;
                        return (data[dateKey]);
                    });
                    resolve(Object.values(data));
                });
        });
    }
    // returns a promise for all Dates from the Dates collection in firebase

    function post(item) {
        // return a promise to post an saved date to the SAVED colletion in firebase
        return $q((resolve, reject) => {
            $http
                .post(`${FBUrl}/saved.json`, JSON.stringify(item))
                .then(data => {
                    console.log("New Image posted");
                    resolve(data);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    }


    function addDate(item, location) {
        // return a promise to post a date to the Date colletion in firebase
        // may also use this to add date to saved dates as well?
    }

    function getSavedDates(uid) {
        let dateArray = [];
        return $q((resolve, reject) => {
            $http
                .get(`${FBUrl}saved.json?orderBy="uid"&equalTo="${uid}"`)
                .then(({ data }) => {
                    for (let saved in data) {
                        dateArray.push(data[saved]);
                    }
                    resolve(dateArray);
                });

        });
    }

    function getDateRating(dateId) {
        return $q((resolve, reject) => {
            $http
                .get(`${FBUrl}rating.json?orderBy="dateId"&equalTo="${dateId}"`)
                .then(({ data }) => {
                    resolve(data);
                });
        });

    }

    function getDateComments(uid, dateKey) {

        //internal function like date rating. Will need to pass both UID and DateKey to get User Name and Date it applies to
    }

    return { getAllDates, addDate, getSavedDates, getDateRating, getDateComments };
});   
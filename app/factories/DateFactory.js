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

    function save(date) {
        // return a promise to post an saved date to the SAVED colletion in firebase
        return $q((resolve, reject) => {
            $http
                .post(`${FBUrl}/saved.json`, JSON.stringify(date))
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


    function addDate(item) {
            // return a promise to post an image to the IMAGES colletion in firebase
            return $q((resolve, reject) => {
                $http
                    .post(`${FBUrl}/dates.json`, JSON.stringify(item))
                    .then(data => {
                        console.log("New Date posted");
                        resolve(data);
                    })
                    .catch(error => {
                        console.log(error);
                        reject(error);
                    });
            });
        }

    function getSavedDates(uid) {
        return $q((resolve, reject) => {
            $http
                .get(`${FBUrl}saved.json?orderBy="uid"&equalTo="${uid}"`)
                .then(({ data }) => {
                    resolve(data);
                });

        });
    }

    function datesToPrint(dateId) {
        return $q((resolve, reject) => {
            $http
                .get(`${FBUrl}dates/${dateId}.json`)
                .then(data => {
                    console.log(data, "dates to print");
                    resolve(data);
                })
                .catch(error => {
                    console.log("dates to print error", error);
                });
        });

    }

    function getDateComments(uid, dateKey) {

        //internal function like date rating. Will need to pass both UID and DateKey to get User Name and Date it applies to
    }

    return { getAllDates, addDate, getSavedDates, getDateComments, save, datesToPrint };
});   
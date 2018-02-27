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

    function getOneDate(dateId) {
        return $q((resolve, reject) => {
            $http.get(`${FBUrl}/dates/${dateId}.json`)
                .then(({ data }) => {
                    data.dateId = dateId;
                    console.log("one date", data);
                    resolve(data);
                });
        });
    }
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

    function datesToPrint(dateId, fbKey) {
        console.log("tuck test", dateId, fbKey);
        return $q((resolve, reject) => {
            $http
                .get(`${FBUrl}dates/${dateId}.json`)
                .then(data => {
                    data.data.dateId = dateId;
                    data.data.savedKey = fbKey;
                    console.log(data.data, "dates to print");
                    resolve(data);
                })
                .catch(error => {
                    console.log("dates to print error", error);
                });
        });

    }

    function deleteSaved (savedKey) {
        return $q((resolve, reject) => {
            $http
                .delete(`${FBUrl}/saved/${savedKey}.json`
                )
                .then(data => {
                    resolve();
                });
        });
    }

    function patchTags(obj, dateId) {
        return $q((resolve, reject) => {
            $http
                .patch(`${FBUrl}/dates/${dateId}.json`, JSON.stringify(obj))
                .then(data => {
                    console.log("UpdatedR Tags!", data);
                    resolve(data);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    }

    function patchDescription(obj, dateId) {
        return $q((resolve, reject) => {
            $http
                .patch(`${FBUrl}/dates/${dateId}.json`, JSON.stringify(obj))
                .then(data => {
                    console.log("UpdatedR Description!", data);
                    resolve(data);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    }

    return { getAllDates, addDate, getSavedDates, patchTags, patchDescription, save, datesToPrint, getOneDate, deleteSaved };
});   
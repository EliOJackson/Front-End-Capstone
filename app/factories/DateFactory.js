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
                    resolve(data);
                });
        });
    }

    // return a promise to post an saved date to the SAVED colletion in firebase
    function save(date) {
        return $q((resolve, reject) => {
            $http
                .post(`${FBUrl}/saved.json`, JSON.stringify(date))
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    // return a promise to post an image to the IMAGES colletion in firebase
    function addDate(item) {
        return $q((resolve, reject) => {
            $http
                .post(`${FBUrl}/dates.json`, JSON.stringify(item))
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
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
        return $q((resolve, reject) => {
            $http
                .get(`${FBUrl}dates/${dateId}.json`)
                .then(data => {
                    data.data.dateId = dateId;
                    data.data.savedKey = fbKey;
                    resolve(data);
                })
                .catch(error => {
                });
        });
    }

    function deleteSaved(savedKey) {
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
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    function patchDescription(obj, dateId) {
        return $q((resolve, reject) => {
            $http
                .patch(`${FBUrl}/dates/${dateId}.json`, JSON.stringify(obj))
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    return { getAllDates, addDate, getSavedDates, patchTags, patchDescription, save, datesToPrint, getOneDate, deleteSaved };
});   
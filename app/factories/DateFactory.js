"use strict";

angular.module("Datr").factory("DateFactory", function (FBUrl, $q, $http) {

function getAllDates() {
    return $q((resolve, reject) => {
        $http.get(`${FBUrl}/dates.json`)
            .then(({ data }) => {
                Object.keys(data).map(dateKey => {
                    data[dateKey].id = dateKey;
                    return (data[dateKey]);
                    // console.log('data[dateKey]',data[dateKey]);
                });
                console.log('Object.values(data)',Object.values(data));
        });
    });
}
    // returns a promise for all Dates from the Dates collection in firebase


function addDate(item, location) {
        // return a promise to post a date to the Date colletion in firebase
        // may also use this to add date to saved dates as well?
    }
   
function getSavedDates(uid) {
        // returns a promise that queries firebase for saved dates that match the given user id
    }

function getDateRating(dateKey) {
    //internal function to be called in get all dates, that gets the date rating.
    //Do I need to pass UID in here as well??? Maybe if its saved dates.
    }

function getDateComments(uid, dateKey) {

    //internal function like date rating. Will need to pass both UID and DateKey to get User Name and Date it applies to
}

    return { getAllDates, addDate, getSavedDates, getDateRating, getDateComments};
});   
"use strict";

angular.module("Datr").factory("DateFactory", function (FBUrl, $q, $http) {

function getAllDates() {
    // returns a promise for all Dates from the Dates collection in firebase
}

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
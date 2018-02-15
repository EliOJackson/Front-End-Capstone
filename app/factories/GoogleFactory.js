'use strict';

angular.module("Datr").factory("GoogleFactory", function (GoogleCreds, $http, $q) {

    function search(searchString) {
        return $q((resolve, reject) => {
            $http.get(`https://tj-datr.herokuapp.com/api/maps/api/place/textsearch/json?query=${searchString}&key=${GoogleCreds.apiKey}`)
                .then((places) => {
                    console.log("goole search places", places);
                    resolve(places.data.results);
                });
        });
    }

    function placeDetails(placeId) {
        return $q((resolve, reject) => {
            $http.get(`https://tj-datr.herokuapp.com/api/maps/api/place/details/json?placeid=ChIJKYO9OElvZIgRtcwuV00lItw&key=${GoogleCreds.apiKey}`)
            .then((data) => {
                resolve(data);
            });
        });
    }

    return { search, placeDetails };
});
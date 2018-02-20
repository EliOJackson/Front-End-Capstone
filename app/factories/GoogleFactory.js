'use strict';

angular.module("Datr").factory("GoogleFactory", function (GoogleCreds, $http, $q) {

    function search(searchString) {
        return $q((resolve, reject) => {
            console.log('searchString',searchString);
            $http.get(`https://tj-datr.herokuapp.com/api/maps/api/place/textsearch/json?query=${searchString} in Nashville&key=${GoogleCreds.apiKey}`)
                .then((places) => {
                    console.log("goole search places", places);
                    resolve(places.data.results);
                });
        });
    }

    function placeDetails(placeId) {
        return $q((resolve, reject) => {
            $http.get(`https://tj-datr.herokuapp.com/api/maps/api/place/details/json?placeid=${placeId}&key=${GoogleCreds.apiKey}`)
            .then((data) => {
                resolve(data);
            });
        });
    }

    function placeImages(searchedPlace) {
        return $q((resolve, reject) => {
            console.log(searchedPlace.photos[0].photo_reference, "photo ref ih ope");
            let imageRef = searchedPlace.photos[0].photo_reference;
            $http.get(`https://tj-datr.herokuapp.com/api/maps/api/place/photo?maxwidth=400&photoreference=${imageRef}&key=${GoogleCreds.apiKey}`)
            .then((data) => {
                resolve(data);
            });
        });
    }

    return { search, placeDetails, placeImages };
});
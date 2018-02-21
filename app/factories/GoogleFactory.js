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
            .then((searchedPlace) => {
                placeImages(searchedPlace.data.result);
                console.log("after add", searchedPlace);
                resolve(searchedPlace.data.result);
            });
        });
    }

    

    function placeImages(searchedPlace) {
        console.log(searchedPlace, "test");
            let imageRef = searchedPlace.photos[0].photo_reference;
            searchedPlace.image = `https://tj-datr.herokuapp.com/api/maps/api/place/photo?maxwidth=400&photoreference=${imageRef}&key=${GoogleCreds.apiKey}`;
    }

    return { search, placeDetails, placeImages };
});
'use strict';

angular.module("Datr").factory("GoogleFactory", function (GoogleCreds, $http, $q) {

    function search(searchString) {
        return $q((resolve, reject) => {
            $http.get(`https://tj-datr.herokuapp.com/api/maps/api/place/textsearch/json?query=${searchString} in Nashville&key=${GoogleCreds.apiKey}`)
                .then((places) => {
                    let promiseArray = [];
                    let results = places.data.results;
                    results.forEach(result => {
                        promiseArray.push(placeDetails(result.place_id));
                    });
                    return $q.all(promiseArray)
                        .then((data1) => {
                            resolve(data1);
                        });
                });
        });
    }

    function placeDetails(placeId) {
        return $q((resolve, reject) => {
            $http.get(`https://tj-datr.herokuapp.com/api/maps/api/place/details/json?placeid=${placeId}&key=${GoogleCreds.apiKey}`)
                .then((searchedPlace) => {
                    placeImages(searchedPlace.data.result);
                    resolve(searchedPlace.data.result);
                });
        });
    }

    function placeImages(searchedPlace) {
        if (searchedPlace.photos !== undefined) {
            let imageRef = searchedPlace.photos[0].photo_reference;
            searchedPlace.image = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${imageRef}&key=${GoogleCreds.apiKey}`;
        }
        else {
            searchedPlace.image = "../../img/placeholder4.png";
        }
    }

    return { search, placeDetails, placeImages };
});
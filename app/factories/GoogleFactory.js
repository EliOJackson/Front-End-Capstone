'use strict';

angular.module("Datr").factory("GoogleFactory", function (GoogleCreds, $http, $q) {

    function search(searchString) {
        return $q((resolve, reject) => {
            console.log('searchString',searchString);
            $http.get(`https://tj-datr.herokuapp.com/api/maps/api/place/textsearch/json?query=${searchString} in Nashville&key=${GoogleCreds.apiKey}`)
                .then((places) => {
                    let promiseArray = [];
                    console.log("goole search places", places.data.results);
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
                console.log('searchedPlace',searchedPlace);
                placeImages(searchedPlace.data.result);
                resolve(searchedPlace.data.result);
            });
        });
    }

    

    function placeImages(searchedPlace) {
        if (searchedPlace.photos !== undefined){
            let imageRef = searchedPlace.photos[0].photo_reference;
            searchedPlace.image = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${imageRef}&key=${GoogleCreds.apiKey}`;
        }
        else {
            searchedPlace.image = `http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder4.png`
        }
    }

    return { search, placeDetails, placeImages };
});
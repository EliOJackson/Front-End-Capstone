"use strict";

angular.module("Datr").controller("DateListCtrl", function ($scope, DateFactory, $q) {
    $scope.title = "Date List";

    DateFactory.getAllDates()
    .then(data => {
        $scope.dates = data;
        let promiseArray = [];
        console.log('$scope.dates',$scope.dates);
        // let dateIdArray = [];
        $scope.dates.forEach(date => {
            let dateId = date.dateId;
            let ratings = DateFactory.getDateRating(dateId);
            promiseArray.push(ratings);

            });
            console.log('promiseArray',promiseArray);
            return $q.all(promiseArray)
            .then( (dates) => {
                dates.forEach(date => {
                    if (Object.keys(date).length > 0) {
                        console.log(date, "date with rating");
                        let ratingKeys = Object.keys(date);
                        console.log('ratingKeys',ratingKeys);
                        ratingKeys.forEach(ratingKey => {
                            console.log('date[ratingKey].rating',date[ratingKey].rating);
                        });
                        

                    }

                });

                
            });
        
        
        //run get all dates from Date Factory and print to partial.
        // call next promise, comments promise
    // return factory.nextfunction
    //.then 
    
    });
    

    // function getAllPreferredEvents() {
    //     var promises = [];
    //     for (var i = 0; i < $scope.preferences.length; i++) {
    //         var promise = EventFactory.getEventsByType($scope.preferences[i]);
    //         promises.push(promise);
    //     }
    //     console.log("promises", promises);
    //     $q.all(promises).then((data) => {
    //         flattenObjects(data);
    //     });
    // }

});
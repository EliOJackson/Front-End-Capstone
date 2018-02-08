"use strict";

angular.module("Datr").controller("DateListCtrl", function ($scope, DateFactory) {
    $scope.title = "Date List";

    DateFactory.getAllDates()
    .then(data => {
        $scope.dates = data;
        $scope.dates.forEach(date => {
            console.log(date.dateId, "dates");
        })
        // let dateId = data.dateId;
        // console.log('dateId',dateId);
        // $scope.dates.forEach(date => {
        //     DateFactory.getDateRating((dateId) => {
        //         console.log(data, "other try");
        //     });

        // });
        
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
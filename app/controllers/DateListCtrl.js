"use strict";

angular.module("Datr").controller("DateListCtrl", function ($scope, DateFactory) {
    $scope.title = "Date List";

    DateFactory.getAllDates()
    .then(data => {
        $scope.dates = data;
        let promiseArray = [];
        console.log('$scope.dates',$scope.dates);
        // let dateIdArray = [];
        $scope.dates.forEach(date => {
            let dateId = date.dateId;
            console.log('date.',dateId);
            let ratings = DateFactory.getDateRating(dateId);
            promiseArray.push(ratings);

            });
            console.log('promiseArray',promiseArray);
        // $scope.dates.forEach(date => {
        //     for (let i = 0; i < $scopes.dates.length; i++) {

        //     }
            // console.log(dateIdArray, "dates");
        //         console.log(data, "other try");
            // });

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
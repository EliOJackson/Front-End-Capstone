"use strict";

angular.module("Datr").controller("UserDatesCtrl", function ($scope, DateFactory, $routeParams, $q, RatingFactory) {
    $scope.title = "User's Dates";
    $scope.dates = [];
 
    DateFactory.getSavedDates($routeParams.uid)
        .then(data => {
            let promiseArray = [];
            let savedDateIds = Object.entries(data);
            console.log('savedDateIds',savedDateIds);
            savedDateIds.forEach(savedDateId => {
                console.log("test",savedDateId[1].dateId);
                let saved = DateFactory.datesToPrint(savedDateId[1].dateId);
                promiseArray.push(saved);
                

            });
            return $q.all(promiseArray)
                .then((dates ) => {
                    dates.forEach(date => {
                    console.log(date.data, "pls");
                    $scope.dates.push(date.data);
                        
                });
                
                // RatingFactory.rateDates(dates);
                // }
                    console.log(RatingFactory.rateDates($scope.dates));
                    console.log('$scope.dates',$scope.dates);
                });
        });

    $scope.delete = (dateId) => {
        // return $q((resolve, reject) => {
            // $http
            // .delete(`${FBUrl}/saved/${boardId}.json`
        // console.log("this", dateId); 
        // $scope.saved.dateId = this.date.dateId;
        // $scope.saved.uid = firebase.auth().currentUser.uid;
        console.log('this.date.dateId', this.date);
        console.log('firebase.auth().currentUser.uid', firebase.auth().currentUser.uid);
    };
});
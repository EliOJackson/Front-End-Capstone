"use strict";

angular.module("Datr").controller("UserDatesCtrl", function ($scope, DateFactory, $routeParams, $q, RatingFactory, $http, FBUrl, FilterFactory, $route, $window) {
    $scope.title = "User's Dates";
    $scope.dates = [];
    $scope.search = FilterFactory;
    
    function load() {
        DateFactory.getSavedDates($routeParams.uid)
        .then(data => {
            let promiseArray = [];
            let savedDateIds = Object.entries(data);
            savedDateIds.forEach(savedDateId => {
                savedDateId[1].fbKey = savedDateId[0];
                console.log('savedDateId', savedDateId[0]);
                console.log("test", savedDateId[1]);
                let saved = DateFactory.datesToPrint(savedDateId[1].dateId, savedDateId[1].fbKey);
                promiseArray.push(saved);
            });
            return $q.all(promiseArray)
            .then((dates) => {
                dates.forEach(date => {
                    $scope.dates.push(date.data);
                    RatingFactory.rateDates($scope.dates);
                });
            });
        });
    }
    
        function deleteAlert() {
            $window.alert("Your date has been removed!");
            $route.reload();
        }
    
        $scope.toggleDelete = () => {
            document.querySelector("#deleteBtn").classList.toggle("is-active");         
        };
        
        $scope.delete = (savedKey) => {
            $scope.toggleDelete();
            DateFactory.deleteSaved(savedKey)
            .then(() => {
            });
        };
        
       $scope.refresh = () => {
           $route.reload();
    };

    load();

});

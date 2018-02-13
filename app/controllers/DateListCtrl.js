"use strict";

angular.module("Datr").controller("DateListCtrl", function ($scope, DateFactory, $q, RatingFactory) {
    $scope.title = "Date List";
    $scope.saved = {};

    DateFactory.getAllDates()
        .then(data => {
            $scope.dates = data;
            console.log($scope.dates, "huh??");
            RatingFactory.rateDates(data);
                // .then(info => {
                //     console.log($scope.dates, "why???");
                //     console.log(info, "what???");
                // });
            });

    $scope.saveDate = function () {
        $scope.saved.dateId = this.date.dateId;
        $scope.saved.uid = firebase.auth().currentUser.uid;
        DateFactory.save($scope.saved);
        console.log('this.date.dateId',this.date.dateId);
        console.log('firebase.auth().currentUser.uid',firebase.auth().currentUser.uid);
    };


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
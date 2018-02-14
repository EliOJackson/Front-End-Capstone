"use strict";

angular.module("Datr").controller("DateInfoCtrl", function ($scope, DateFactory, $routeParams, RatingFactory, $window) {
    $scope.title = "Date Info";
    $scope.dateId = $routeParams;
    $scope.saved = {};
    $scope.disqusConfig = {
        disqus_shortname: 'Datr',
        disqus_identifier: $routeParams.dateId,
        disqus_url: `http://127.0.0.1:8080/#!/dates/${$routeParams.dateId}`
    };

    DateFactory.getOneDate($scope.dateId.dateId)
    .then(data => {
        $scope.dates = [];
        $scope.dates.push(data);
        RatingFactory.rateDates($scope.dates);
        console.log($scope.dates, "idk");
    });

    $scope.saveDate = function () {
        console.log('this',this.date.dateId);
        $scope.saved.dateId = this.date.dateId;
        $scope.saved.uid = firebase.auth().currentUser.uid;
        DateFactory.save($scope.saved);
        $window.alert(`You saved ${this.date.name} to your saved dates!`);
    };

});
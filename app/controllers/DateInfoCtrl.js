"use strict";

angular.module("Datr").controller("DateInfoCtrl", function ($scope, DateFactory, $routeParams, RatingFactory) {
    $scope.title = "Date Info";
    $scope.dateId = $routeParams;
    
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



});
"use strict";

angular.module("Datr").controller("DateListCtrl", function ($scope, DateFactory, $q, RatingFactory) {
    $scope.title = "Date List";
    $scope.saved = {};

    DateFactory.getAllDates()
        .then(data => {
            $scope.dates = data;
            console.log($scope.dates, "huh??");
            RatingFactory.rateDates(data); // MAGIC, automatically updates $scope.dates
            });

    $scope.saveDate = function () {
        $scope.saved.dateId = this.date.dateId;
        $scope.saved.uid = firebase.auth().currentUser.uid;
        DateFactory.save($scope.saved);
        console.log('this.date.dateId',this.date.dateId);
        console.log('firebase.auth().currentUser.uid',firebase.auth().currentUser.uid);
    };

    $scope.rateFive = function () {
        let obj = {
            dateId: this.date.dateId,
            rating: 5,
            uid: firebase.auth().currentUser.uid
        };
        DateFactory.rate(obj);
    };
    $scope.rateFour = function () {
        let obj = {
            dateId: this.date.dateId,
            rating: 4,
            uid: firebase.auth().currentUser.uid
        };
        DateFactory.rate(obj);
    };
    $scope.rateThree = function () {
        let obj = {
            dateId: this.date.dateId,
            rating: 3,
            uid: firebase.auth().currentUser.uid
        };
        DateFactory.rate(obj);
    };
    $scope.rateTwo = function () {
        let obj = {
            dateId: this.date.dateId,
            rating: 2,
            uid: firebase.auth().currentUser.uid
        };
        DateFactory.rate(obj);
    };
    $scope.rateOne = function () {
        let obj = {
            dateId: this.date.dateId,
            rating: 1,
            uid: firebase.auth().currentUser.uid
        };
        DateFactory.rate(obj);
    };

});
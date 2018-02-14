"use strict";

angular.module("Datr").controller("DateListCtrl", function ($scope, DateFactory, $q, RatingFactory, FilterFactory, $window, $route) {
    $scope.title = "Date List";
    $scope.saved = {};
    $scope.search = FilterFactory;

    function load() {
    DateFactory.getAllDates()
        .then(data => {
            $scope.dates = data;
            RatingFactory.rateDates(data); // MAGIC, automatically updates $scope.dates
            });
        }

    $scope.saveDate = function () {
        $scope.saved.dateId = this.date.dateId;
        $scope.saved.uid = firebase.auth().currentUser.uid;
        DateFactory.save($scope.saved);
        $window.alert(`You saved ${this.date.name} to your saved dates!`);
    };

    $scope.rateFive = function () {
        let obj = {
            dateId: this.date.dateId,
            rating: 5,
            uid: firebase.auth().currentUser.uid
        };
        DateFactory.rate(obj);
        saveAlert(obj);
        load();
    };
    $scope.rateFour = function () {
        let obj = {
            dateId: this.date.dateId,
            rating: 4,
            uid: firebase.auth().currentUser.uid
        };
        DateFactory.rate(obj);
        saveAlert(obj);     
        load();   
    };
    $scope.rateThree = function () {
        let obj = {
            dateId: this.date.dateId,
            rating: 3,
            uid: firebase.auth().currentUser.uid
        };
        DateFactory.rate(obj);
        saveAlert(obj);   
        load();     
    };
    $scope.rateTwo = function () {
        let obj = {
            dateId: this.date.dateId,
            rating: 2,
            uid: firebase.auth().currentUser.uid
        };
        DateFactory.rate(obj);
        saveAlert(obj);  
        load();      
    };
    $scope.rateOne = function () {
        let obj = {
            dateId: this.date.dateId,
            rating: 1,
            uid: firebase.auth().currentUser.uid
        };
        DateFactory.rate(obj);
        saveAlert(obj);     
        load();   
    };

    function saveAlert(obj) {
       $window.alert(`You just rated it a ${obj.rating} out of 5!` );
    }

    load();
});
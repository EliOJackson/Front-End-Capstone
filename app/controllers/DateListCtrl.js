"use strict";

angular.module("Datr").controller("DateListCtrl", function ($scope, DateFactory, $q, RatingFactory, FilterFactory, $window, $route, $routeParams) {
    $scope.title = "Date List";
    $scope.saved = {};
    $scope.search = FilterFactory;

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $scope.$apply($scope.user = true);
            $scope.uid = firebase.auth().currentUser.uid;

        } else {
            $scope.$apply($scope.user = false);
        }
    });

    console.log($scope.uid);


    function load() {
        DateFactory.getAllDates()
            .then(data => {
                $scope.dates = data;
                RatingFactory.rateDates(data); // MAGIC, automatically updates $scope.dates
            });
    }

    $scope.saveDate = function () {
        DateFactory.getSavedDates($scope.uid)
            .then((data) => {
                let saveObj = {
                    dateId: this.date.dateId,
                    uid: $scope.uid
                };
                let saveArray = [];
                let dateArrays = (Object.entries(data));
                dateArrays.forEach(dateArray => {
                    if (dateArray[1].dateId === this.date.dateId && dateArray[1].uid === $scope.uid) {
                        saveArray.push(dateArray[1]);
                    }
                });
                if (saveArray[0] !== undefined) {
                    $window.alert("You've already saved this date you Dingus!");
                }
                else {
                    DateFactory.save(saveObj);
                }
            });
    };

    //     console.log('this.date.dateId',this.date.dateId);
    //     });
    //     // $scope.saved.dateId = this.date.dateId;
    //     // $scope.saved.uid = firebase.auth().currentUser.uid;
    //     // DateFactory.save($scope.saved);
    //     // $window.alert(`You saved ${this.date.name} to your saved dates!`);
    // };

    $scope.rate = function (rating) {
        let obj = {
            dateId: this.date.dateId,
            rating: rating,
            uid: firebase.auth().currentUser.uid
        };
        DateFactory.rate(obj)
            .then(() => {
                saveAlert(obj);
                load();
            });
    };
    // $scope.rateFour = function () {
    //     let obj = {
    //         dateId: this.date.dateId,
    //         rating: 4,
    //         uid: firebase.auth().currentUser.uid
    //     };
    //     DateFactory.rate(obj);
    //     saveAlert(obj);     
    //     load();   
    // };
    // $scope.rateThree = function () {
    //     let obj = {
    //         dateId: this.date.dateId,
    //         rating: 3,
    //         uid: firebase.auth().currentUser.uid
    //     };
    //     DateFactory.rate(obj);
    //     saveAlert(obj);   
    //     load();     
    // };
    // $scope.rateTwo = function () {
    //     let obj = {
    //         dateId: this.date.dateId,
    //         rating: 2,
    //         uid: firebase.auth().currentUser.uid
    //     };
    //     DateFactory.rate(obj);
    //     saveAlert(obj);  
    //     load();      
    // };
    // $scope.rateOne = function () {
    //     let obj = {
    //         dateId: this.date.dateId,
    //         rating: 1,
    //         uid: firebase.auth().currentUser.uid
    //     };
    //     DateFactory.rate(obj);
    //     saveAlert(obj);     
    //     load();   
    // };

    function saveAlert(obj) {
        $window.alert(`You just rated it a ${obj.rating} out of 5!`);
    }

    load();
});
'use strict'; 

angular.module("Datr", ["ngRoute"])
    .constant("FBUrl", "https://tucker-jackson-capstone.firebaseio.com/")
    .config(($routeProvider) => {
        $routeProvider
        .when("/dates", {
            templateUrl: "DateList.html",
            controller: "DatelistCtrl"
        })
        .when("/add", {
            templateUrl: "AddDate.html",
            controller: "AddDateCtrl"
        })
        .when("/dates/:dateId", {
            templateUrl: "DateInfo.html",
            controller: "DateInfoCtrl"
        })
        .when("/user/:userId", {
            templateUrl: "UserDates.html",
            controller: "UserDatesCtrl"
        })
        .otherwise("/", {
            templateUrl: "DateList.html",
            controller: "DatelistCtrl"
        });
    })    
    .run(FBCreds => {
        let authConfig = {
            apiKey: FBCreds.apiKey,
            authDomain: FBCreds.authDomain
        };
        firebase.initializeApp(authConfig);
    });
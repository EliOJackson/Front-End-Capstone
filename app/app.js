'use strict'; 

angular.module("Datr", ["ngRoute", "angularUtils.directives.dirDisqus"])
    .constant("FBUrl", "https://tucker-jackson-capstone.firebaseio.com/")
    .config(($routeProvider) => {
        $routeProvider
        .when("/dates", {
            templateUrl: "partials/DateList.html",
            controller: "DateListCtrl"
        })
        .when("/add", {
            templateUrl: "partials/AddDate.html",
            controller: "AddDateCtrl"
        })
        .when("/dates/:dateId", {
            templateUrl: "partials/DateInfo.html",
            controller: "DateInfoCtrl"
        })
        .when("/user/:uid", {
            templateUrl: "partials/UserDates.html",
            controller: "UserDatesCtrl"
        })
        .otherwise("/dates", {
            templateUrl: "partials/DateList.html",
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
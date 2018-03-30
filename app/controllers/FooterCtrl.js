"use strict";

angular.module("Datr").controller("FooterCtrl", function ($scope, $window) {
    $scope.title = "Footer";
    $scope.top = () => {
        $window.scrollTo(0, 0);
    };
});
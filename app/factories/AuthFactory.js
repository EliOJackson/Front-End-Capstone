'use strict';

angular.module("Datr").factory("AuthFactory", function (FBCreds) {

    // this is from Joe's auth example.

    function login() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider);
    }

    function logout() {
        return firebase.auth().signOut();
    }

    return { login, logout };

});
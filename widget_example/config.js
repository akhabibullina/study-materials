/**
 * Created by annakh on 9/16/15.
 */

'use strict';

var myApp = angular.module('widgetExample', []);

//myApp.config(function ($routeProvider, $interpolateProvider) {
//    $interpolateProvider.startSymbol('{$');
//    $interpolateProvider.endSymbol('$}');
//
//    $routeProvider
//        .when("/", {
//            templateUrl: "../station/floor.html",
//            controller: "FloorCtrl"
//        })
//        // todo: add other views
//        .otherwise({redirectTo: "/"});
//
//});
//
//// todo: move to common.js
///*
// * Provides a convenience extension to _.isEmpty which allows for
// * determining an object as being empty based on either the default
// * implementation or by evaluating each property to undefined, in
// * which case the object is considered empty.
// */
//_.mixin(function () {
//    // reference the original implementation
//    var _isEmpty = _.isEmpty;
//    return {
//        // If defined is true, and value is an object, object is considered
//        // to be empty if all properties are undefined, otherwise the default
//        // implementation is invoked.
//        isEmpty: function (value, defined) {
//            if (defined && _.isObject(value)) {
//                return !_.any(value, function (value, key) {
//                    return value !== undefined;
//                });
//            }
//            return _isEmpty(value);
//        }
//    }
//}());
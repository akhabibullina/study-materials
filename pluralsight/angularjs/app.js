/**
 * Created by admin on 7/28/2015.
 */
(function(){

  'use strict';

  var app = angular.module("githubViewer", ["ngRoute"]);

  //app.run(['$route', function($route)  {
  //  $route.reload();
  //}]);

  app.config(function($routeProvider, $locationProvider){
    $routeProvider
      .when("/main", {
        templateUrl: "html/main.html",
        controller: "js/MainController"
      })
      .when("/user/:username", {
        templateUrl: "html/user.html",
        controller: "js/UserController"
      })
      .when("/repo/:username/:reponame", {
        templateUrl: "html/repo.html",
        controller: "js/RepoController"
      })
      .otherwise({redirectTo:"/"});

    //$locationProvider
    //  .html5Mode({enabled:true, requireBase:false});
  });



}());
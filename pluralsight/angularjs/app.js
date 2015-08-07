/**
 * Created by admin on 7/28/2015.
 */
(function(){

  'use strict';

  var app = angular.module("githubViewer", ["ngRoute"]);

  //app.run(['$route', function($route)  {
  //  $route.reload();
  //}]);

  app.config(function($routeProvider){
    $routeProvider
      .when("/", {
        templateUrl: "html/main.html",
        controller: "MainController"
      })
      .when("/user/:username", {
        templateUrl: "html/user.html",
        controller: "UserController"
      })
      .when("/repo/:username/:reponame", {
        templateUrl: "html/repo.html",
        controller: "RepoController"
      })
      .otherwise({redirectTo:"/"});

  });



}());
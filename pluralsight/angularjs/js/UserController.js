/**
 * Created by akhabibullina on 8/4/2015.
 */
/**
 * Created by admin on 7/28/2015.
 */
(function(){

  var app = angular.module('githubViewer');

  var UserController = function($scope, github, $routeParams) {

    $scope.username = $routeParams.username;
    $scope.repoSortOrder = '-stargazers_count';
    $scope.count = 3;

    function onUserComplete(data){
      $scope.person = data;
      github.getRepos($scope.person).then(onRepos, onError);
    }

    function onRepos(data){
      $scope.repos = data;
    }

    function onError(error){
      $scope.error = "Could not fetch the user";
    }

    github.getUser($scope.username).then(onUserComplete, onError);

  };

  app.controller("UserController", UserController);
})();
/**
 * Created by admin on 8/6/2015.
 */
/**
 * Created by akhabibullina on 8/4/2015.
 */
/**
 * Created by akhabibullina on 7/28/2015.
 */
(function(){

  var app = angular.module('githubViewer');

  var RepoController = function($scope, github, $routeParams) {

    $scope.username = $routeParams.username;
    $scope.reponame = $routeParams.reponame;
    $scope.repoSortOrder = '-stargazers_count';

    function onRepoDetailsComplete(data){
      $scope.repo = data;
      github.getRepoContributors($scope.repo).then(onRepoContributorsComplete, onError);
    }

    function onRepoContributorsComplete(data){
      $scope.repo.contributors = data;
    }

    function onError(error){
      $scope.error = "Could not fetch the repo info";
    }

    github.getRepoDetails($scope.username, $scope.reponame).then(onRepoDetailsComplete, onError);

  };

  app.controller("RepoController", RepoController);
})();
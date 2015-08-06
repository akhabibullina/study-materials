/**
 * Created by admin on 7/28/2015.
 */
(function(){

  var app = angular.module('MyGithubApp', []);

  var MainController = function($scope, github, $interval, $log, $anchorScroll, $location) {

    var countdownInterval = null;

    $scope.message = "Hello, ";
    $scope.username = 'Angular';
    $scope.repoSortOrder = '-stargazers_count';
    $scope.count = 3;

    $scope.changeColor = function() {
        $scope.personColour = {color: 'red'};
    };

    $scope.search = function() {
      $log.info('Searching for...' + $scope.username);
      github.getUser($scope.username).then(onUserComplete, onError);
      if(countdownInterval) {
        $interval.cancel(countdownInterval);
        $scope.count = null;
      }
    };

    function onUserComplete(data){
      $scope.person = data;
      github.getRepos($scope.person).then(onRepos, onError);
    }

    function onRepos(data){
      $scope.repos = data;
      //$location.hash('userDetails');
      //$anchorScroll();
    }

    function onError(error){
      $scope.error = "Could not fetch the user";
    }

    countdownInterval = $interval(function() {
      $scope.count -= 1;
      if ($scope.count < 1) {
        $scope.search($scope.username);
      }
    }, 1000);

  };

  app.controller("MainController", MainController);
})();
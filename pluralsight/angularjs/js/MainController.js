/**
 * Created by admin on 7/28/2015.
 */
(function(){

  var app = angular.module('githubViewer');

  var MainController = function($scope, github, $interval, $log, $location) {

    var countdownInterval = null;

    $scope.message = "Hello, ";
    $scope.username = 'Angular';
    $scope.repoSortOrder = '-stargazers_count';
    $scope.count = 10;

    $scope.changeColor = function() {
        $scope.personColour = {color: 'red'};
    };

    $scope.search = function() {
      $log.info('Searching for...' + $scope.username);
      if(countdownInterval) {
        $interval.cancel(countdownInterval);
        $scope.count = null;
      }
      $location.path('/user/' + $scope.username);
    };

    countdownInterval = $interval(function() {
      $scope.count -= 1;
      if ($scope.count < 1) {
        $scope.search($scope.username);
      }
    }, 1000);

  };

  app.controller("MainController", MainController);
})();
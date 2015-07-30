/**
 * Created by admin on 7/28/2015.
 */
(function(){
  var app = angular.module('MyGithubApp',[]);

  var MainController = function($scope, $http, $interval, $log, $anchorScroll, $location) {

    var url = 'https://api.github.com/users/';
    var defaultUser = 'Angular';
    var countdownInterval = null;

    $scope.message = "Hello, ";
    $scope.username = 'Angular';
    $scope.repoSortOrder = '-stargazers_count';
    $scope.url = url + defaultUser;
    $scope.count = 3;

    $scope.changeColor = function() {
        $scope.personColour = {color: 'red'};
    };

    $scope.search = function() {
      $log.info('Searching for...' + $scope.username);
      $scope.url = url + ($scope.username || defaultUser);
      $http.get($scope.url).then(onUserComplete, onError);
      if(countdownInterval) {
        $interval.cancel(countdownInterval);
        $scope.count = null;
      }
    };

    function onUserComplete(response){
      $scope.person = response.data;
      $http.get($scope.person.repos_url)
        .then(onRepos, onError);
    }

    function onRepos(response){
      $scope.repos = response.data;
      $location.hash('userDetails');
      $anchorScroll();
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

  app.controller("MainController", ["$scope", "$http", "$interval", '$log', '$anchorScroll', '$location', MainController]);
})();
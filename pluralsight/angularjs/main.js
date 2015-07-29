/**
 * Created by admin on 7/28/2015.
 */
(function(){
  var app = angular.module('MyGithubApp',[]);

  var MainController = function($scope, $http) {

    var url = 'https://api.github.com/users/';
    var defaultUser = 'Angular';

    $scope.message = "Hello, ";
    $scope.username = 'Angular';
    $scope.url = url + defaultUser;

    $scope.search = function() {
      $scope.url = url + ($scope.username || defaultUser);
      $http.get($scope.url).then(onUserComplete, onError);
    }

    function onUserComplete(response){
      $scope.person = response.data;
      $http.get($scope.person.repos_url)
        .then(onRepos, onError);
    }

    function onRepos(response){
      $scope.repos = response.data;
    }

    function onError(error){
      $scope.error = "Could not fetch the user";
    }

    $http.get($scope.url).then(onUserComplete, onError);

  };

  app.controller("MainController", ["$scope", "$http", MainController]);
})();
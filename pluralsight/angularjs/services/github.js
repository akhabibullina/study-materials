(function () {

  'use strict';

  var github = function ($http) {

    var url = 'https://api.github.com/users/';
    var defaultUser = 'Angular';

    function getUser(username) {
      return $http.get(url + (username || defaultUser)).then(function (response) {
        return response.data;
      });
    }

    function getRepos(repos_url) {
      return $http.get(repos_url.repos_url).then(function (response) {
        return response.data;
      });
    }

    return {
      getUser: getUser,
      getRepos: getRepos
    }
  }

  // Register the service in the module
  var module = angular.module('githubViewer');
  module.factory('github', github);

})();
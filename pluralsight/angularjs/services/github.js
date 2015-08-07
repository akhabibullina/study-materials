(function () {

  'use strict';

  var github = function ($http) {

    var url = 'https://api.github.com/';
    var defaultUser = 'Angular';

    function getUser(username) {
      return $http.get(url + 'users/' + (username || defaultUser)).then(function (response) {
        return response.data;
      });
    }

    function getRepos(data) {
      return $http.get(data.repos_url).then(function (response) {
        return response.data;
      });
    }

    function getRepoDetails(username, reponame) {
      // https://api.github.com/users/akhabibullina/repos
      // https://api.github.com/repos/akhabibullina/chat_support
      return $http.get(url + 'repos/' + (username || defaultUser) + '/' + reponame).then(function (response) {
        return response.data;
      });
    }

    function getRepoContributors(data) {
      return $http.get(data.contributors_url).then(function (response) {
        return response.data;
      });
    }

    return {
      getUser: getUser,
      getRepos: getRepos,
      getRepoDetails: getRepoDetails,
      getRepoContributors: getRepoContributors
    }
  }

  // Register the service in the module
  var module = angular.module('githubViewer');
  module.factory('github', github);

})();
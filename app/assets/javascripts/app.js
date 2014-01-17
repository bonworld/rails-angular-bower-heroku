'use strict';

var RabhApp = angular.module('RabhApp', ['ngResource', 'ngRoute']);

RabhApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/posts', {
        templateUrl: '/assets/partials/post-list.html',
        controller: 'PostsController'
      }).
      when('/posts/:postId', {
        templateUrl: '/assets/partials/post-detail.html',
        controller: 'SinglePostController'
      }).
      otherwise({
        redirectTo: '/posts'
      });
  }]);

// Siehe https://groups.google.com/forum/#!topic/angular/v6cEdI2Bv24/discussion

RabhApp.config(['$httpProvider', function(provider) {
  provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
}]);



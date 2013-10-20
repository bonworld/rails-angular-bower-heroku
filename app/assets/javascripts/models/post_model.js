'use strict';

RabhApp.factory('PostModel', ['$resource', function($resource) {
  return $resource('/posts/:post_id', {post_id:'@id'});
}]);
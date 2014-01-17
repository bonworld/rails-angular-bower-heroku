'use strict';

RabhApp.controller('PostsController', 
  function PostsController($scope, PostModel, $filter) {
    $scope.posts = PostModel.query();
  }
);

RabhApp.controller('SinglePostController', 
  function SinglePostController($scope, $routeParams, PostModel) {
    $scope.post = PostModel.get({'post_id': $routeParams.postId});
  }
);

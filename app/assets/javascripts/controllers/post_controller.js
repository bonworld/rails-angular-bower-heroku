'use strict';

RabhApp.controller('PostsController', ['$scope', 'PostModel', '$filter',
  function PostsController($scope, PostModel, $filter) {
    $scope.posts = PostModel.query();
 /*   $scope.filteredPosts = [];
   
    $scope.filterPosts = function() {
      $scope.filteredPosts = filterFilter($scope.posts, $scope.query);
    };

    $scope.$watch('query', $scope.filterPosts); */
  }
]);

RabhApp.controller('SinglePostController', ['$scope', '$routeParams', 'PostModel',
  function SinglePostController($scope, $routeParams, PostModel) {
    $scope.post = PostModel.get({'post_id': $routeParams.postId});
  }
]);

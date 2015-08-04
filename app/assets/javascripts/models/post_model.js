'use strict';




RabhApp.factory('PostModel', 
	function($resource) {
  		return $resource('/posts/:post_id', {post_id:'@id'});
  	}
);
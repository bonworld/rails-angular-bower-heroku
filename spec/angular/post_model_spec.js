'use strict';

describe('Post Model Test', function(){
	before(angular.module('RabhApp.PostModel'));
	
    describe('when I call myService.one', function(){
        it('returns 1', function(){
            var $injector = angular.injector([ 'PostModel' ]);
            var myService = $injector.get( 'PostModel' );
            expect( myService.one ).toEqual(1);
        	}
        )}
	)}
);
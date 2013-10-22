# rails-angular-bower-heroku #

Sample application for using bower to manage JavaScript packages for Rails on Heroku

## Objective ##

My objective for this project was create a boilerplate template for projects with [Rails 4.0] (http://rubyonrails.org), [AngularJS] (https://angularjs.org) and [Bootstrap] (https://getbootstrap.com) to be deployed on [Heroku] (https://www.heroku.com) with optimized package management for client JavaScript and stylesheets via [Bower] (https://www.bower.io).

Additionally I added tests for Rails and AngularJs and setup a continous delivery environment on [Codeship.io] (https://codeship.io).

Feedback welcome!

## Basic Steps ##

#### Installation Bower ####
	
	```bash
    npm install bower
    ```

#### Setup Bower ####

	```js
    // .bowerrc
    {
      "directory": "vendor/assets/components"
    }
    ```

#### Install Packages ####

	```bash
	bower install angular
	bower install angular-resource
	bower install bootstrap
	```

### Create bower.json ####

	```bash
	bower init
	```

	The script will ask you some questions and using the existing packages to create the bower.json file. Alternatively the bower.json can be written manually and the packages installed by 

	```bash
	bower install
	```

#### Configure Rails ####

	```ruby
	// ./config/application.rb
	config.assets.paths << Rails.root.join('vendor', 'assets', 'components')
    config.assets.paths << Rails.root.join('vendor', 'assets', 'components', 'bootstrap', 'dist', 'fonts')
    config.assets.paths << Rails.root.join('vendor', 'assets', 'fonts')

    # Precompile additional asset types
    config.assets.precompile += %w( .svg .eot .woff .ttf )
	```ruby

#### Configure Heroku ####

	```bash
    heroku config:set BUILDPACK_URL='git://github.com/qnyp/heroku-buildpack-ruby-bower.git#run-bower'
    ```

#### Install on Heroku ####

	```bash
	git push git@heroku.com:rails-angular-bower-heroku.git master
	```

	Heroku will now install all JavaScript packages via Bower and compile the assets so that JavaScript and stylesheets are minified.

#### Compressing Ressources ####

	Compression of JavaScript and Stylesheets is quickly added by adding the gem 'heroku_rails_deflate' to the Gemfile and installing it.

	```ruby
	// .Gemfil
	group :production, :staging do
	  gem 'heroku_rails_deflate'
	  gem 'rails_12factor'
	end
	```ruby

## Issues with Bootstrap ##

The Bower package for [Bootstrap] (http://getbootstrap.com) contains not only the dist folder but the complete website for whatever reason. Additionally it contains fonts used for the glyphicons. 

	```ruby
    // ./config/initializers/rack_rewrite.rb
	RailsAngularBowerHeroku::Application.config.middleware.insert_before(Rack::Runtime, Rack::Rewrite) do
	  rewrite %r{/fonts/(.*)}, '/assets/bootstrap/fonts/$1'
	  rewrite %r{/font/(.*)}, '/assets/bootstrap/font/$1'
	end
	```

## Continous Integration and Deployment ##

Finally I configured an application on [Codeship.io] to build the application, execute all tests and if tests succeed to deploy it automatically on [http://rails-angular-bower-heroku.herokuapp.com] ([http://rails-angular-bower-heroku.herokuapp.com).

#### Setup commands ####

    rvm use 2.0.0
    bundle install
    export RAILS_ENV=test
    bundle exec rake db:schema:load
    npm install bower
    bower install

Important is only that Bower had to be installed via npm.

#### Test commands ####

    bundle exec rspec


## Build Status ##

[ ![Codeship Status for stiebitzhofer/rails-angular-bower-heroku](https://www.codeship.io/projects/a4bfc1d0-1d1e-0131-6161-2e26d21abb16/status?branch=master)](https://www.codeship.io/projects/8390)


## Resources and References ##

[Heroku Buildpack for Ruby and Bower] (https://github.com/qnyp/heroku-buildpack-ruby-bower)

[Gist by Aidan Feldman describing the basic steps] (https://gist.github.com/afeld/5704079)

[Matt Garrison on Bower and Rails 4] (http://www.iconoclastlabs.com/blog/bower-and-rails-4)

[http://rails-angular-bower-heroku.herokuapp.com] (http://rails-angular-bower-heroku.herokuapp.com)



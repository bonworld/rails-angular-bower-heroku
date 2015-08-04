# rails-angular-bower-heroku #

Sample application for using Bower to manage JavaScript packages for Rails on Heroku.

## Objective ##

My objective for this project was to create a boilerplate template for projects with [Rails 4.0] (http://rubyonrails.org), [AngularJS] (https://angularjs.org) and [Bootstrap] (https://getbootstrap.com) to be deployed on [Heroku] (https://www.heroku.com) with optimized package management for client JavaScript and stylesheets via [Bower] (https://www.bower.io).

In addtion I added some tests for Rails and AngularJS and a continous delivery environment on [Codeship.io] (https://codeship.io).

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

#### Create bower.json ####

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

config.assets.precompile.shift

# Add additional asset pathes
config.assets.paths << Rails.root.join('vendor', 'assets', 'components')
config.assets.paths << Rails.root.join('vendor', 'assets', 'components', 'bootstrap', 'dist', 'fonts')
config.assets.paths << Rails.root.join('vendor', 'assets', 'fonts')

# Precompile additional asset types
config.assets.precompile.push(Proc.new do |path|
  File.extname(path).in? [
    '.html', '.erb', '.haml',                 # Templates
    '.png',  '.gif', '.jpg', '.jpeg', '.svg', # Images
    '.eot',  '.otf', '.svc', '.woff', '.ttf', # Fonts
  ]
end)
```

For the production environment enable asset compilation

```ruby
# config/environments/production.rb
config.assets.compile = true
```

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
```

## Issues with Bootstrap ##

The Bower package for [Bootstrap] (http://getbootstrap.com) contains not only the dist folder but the complete website for whatever reason. Additionally it contains fonts used for the glyphicons. The assets compilation creates a wrong path for the fonts which can be rewritten. Special thanks for the hint to [Matt Garrison](https://github.com/mattsgarrison).

```ruby
// ./config/initializers/rack_rewrite.rb
RailsAngularBowerHeroku::Application.config.middleware.insert_before(Rack::Runtime, Rack::Rewrite) do
  rewrite %r{/fonts/(.*)}, '/assets/bootstrap/fonts/$1'
  rewrite %r{/font/(.*)}, '/assets/bootstrap/font/$1'
end
```

## Continous Integration and Deployment ##

Finally I configured an application on [Codeship.io] (http://www.codeship.io) to build the application, execute all tests and if tests succeed to deploy it automatically on [http://rails-angular-bower-heroku.herokuapp.com] ([http://rails-angular-bower-heroku.herokuapp.com).

#### Node package installation ####

To automate the installation of Bower and all other components a package.json is required:

```js
// .package.json
{
  "name": "rails-angular-bower-heroku",
  "version": "0.0.0",
  "devDependencies": {
    "bower": "~1.2.6",
    "karma": "~0.10.4",
    "karma-jasmine": "~0.1.3",
    "karma-chrome-launcher": "~0.1.0",
    "karma-phantomjs-launcher":"~0.1.0"
  }
}
```

Install everything now with

```bash
npm install
bower install
```

#### Karma configuration ####

With karma init a file can be generated. The important section if files in which all JavaScript in the correct order has to loaded. The JavaScript libraries of Angular are loaded from vendor/assets/components, the application files from app/assets and the tests from spec.

```js
//. karma.conf.js
// Karma configuration
// Generated on Sun Oct 27 2013 20:48:21 GMT+0100 (CET)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // frameworks to use
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'vendor/assets/components/angular/angular.js',
      'vendor/assets/components/angular-resource/angular-resource.js',
      'app/assets/javascripts/application.js',
      'app/assets/javascripts/app.js',
      'app/assets/javascripts/**/*.js',
      'spec/angular/*_spec.js'
    ],

    // list of files to exclude
    exclude: [

    ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    // browsers: ['Chrome', 'PhantomJS'],
    browsers: ['PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
```

### Codeship.io ###

To build and test the application the settings for the following sections have to be adapted:

#### Setup commands ####

```bash
rvm use 2.2.2
bundle install
export RAILS_ENV=test
bundle exec rake db:schema:load
npm install
bower install
```

#### Test commands ####

The test commands for Codeship:

```bash
bundle exec rspec
karma start --single-run
```

## Build Status ##

[ ![Codeship Status for stiebitzhofer/rails-angular-bower-heroku](https://www.codeship.io/projects/a4bfc1d0-1d1e-0131-6161-2e26d21abb16/status?branch=master)](https://www.codeship.io/projects/8390)


## Resources and References ##

[Heroku Buildpack for Ruby and Bower] (https://github.com/qnyp/heroku-buildpack-ruby-bower)

[Gist by Aidan Feldman describing the basic steps] (https://gist.github.com/afeld/5704079)

[Matt Garrison on Bower and Rails 4] (http://www.iconoclastlabs.com/blog/bower-and-rails-4)

[http://rails-angular-bower-heroku.herokuapp.com] (http://rails-angular-bower-heroku.herokuapp.com)

[Bootstrapping an AngularJS app in Rails 4.0] (http://asanderson.org/posts/2013/06/03/bootstrapping-angular-rails-part-1.html) is an excellent tutorial explaining in detail what I have done in this project.

[Slides for Vienna.rb Meetup] (https://speakerdeck.com/stiebitzhofer/rails-angularjs-bower-heroku).

## TODOs ##
See issue list.

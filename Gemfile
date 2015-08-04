source 'https://rubygems.org'
ruby '2.2.2'

group :development, :test  do
  gem 'byebug'
  gem 'rspec-rails'
end

group :doc do
  gem 'sdoc', require: false
end

group :production, :staging do
  # Compression of JavaScript and Stylesheets on Heroku
  gem 'heroku_rails_deflate'
  gem 'rails_12factor'
  gem 'ngannotate-rails'
end

gem 'rails', '4.2.3'
gem 'pg'
gem 'haml'
gem 'sass-rails'
gem 'uglifier', '>= 1.3.0'
gem 'therubyracer', platforms: :ruby
gem 'turbolinks'
gem 'jbuilder', '~> 1.2'
# Alternative multithreaded webserver
gem 'puma'
# Required for font path of Bootstrap
gem 'rack-rewrite'

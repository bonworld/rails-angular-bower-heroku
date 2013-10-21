RailsAngularBowerHeroku::Application.config.middleware.insert_before(Rack::Runtime, Rack::Rewrite) do
  
  #rewrite '/fonts' requests to '/assets'
  rewrite %r{/fonts/(.*)}, '/assets/bootstrap/fonts/$1'
  rewrite %r{/font/(.*)}, '/assets/bootstrap/font/$1'
end
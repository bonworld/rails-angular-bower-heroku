RailsAngularBowerHeroku::Application.config.middleware.insert_before(Rack::Runtime, Rack::Rewrite) do
  
  #rewrite '/fonts' requests to '/assets'
  rewrite %r{/fonts/(.*)}, '/assets/$1'
  rewrite %r{/font/(.*)}, '/assets/$1'
end
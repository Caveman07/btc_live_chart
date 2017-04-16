Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'
  root 'homepage#index'

  get 'three_hour_chart/index'
  get 'three_hour_chart/get_data', :defaults => { :format => 'json' }
  get 'homepage/show'
end

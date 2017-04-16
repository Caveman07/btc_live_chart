Rails.application.routes.draw do
  get 'rooms/show'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'
  root 'homepage#index'

  mount ActionCable.server => '/cable'

  get 'three_hour_chart/index'
  get 'three_hour_chart/get_data', :defaults => { :format => 'json' }
  get 'three_hour_chart/show'
  get 'homepage/show'

  get 'rooms/show'
end

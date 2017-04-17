Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  require 'sidekiq/web'
  # mount Sidekiq::Web => '/sidekiq'
  mount ActionCable.server => '/cable'

  root 'three_hour_chart#show'


  get 'three_hour_chart/get_data', :defaults => { :format => 'json' }
  get 'three_hour_chart/show'
end

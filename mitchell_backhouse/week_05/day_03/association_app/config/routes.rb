Rails.application.routes.draw do
  root to: 'manufacturers#index'

  resources :manufacturers
  resources :cars
end

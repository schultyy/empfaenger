Empfaenger::Application.routes.draw do
  root 'home#index'
  resources :feeds, only: [:new, :create]
end

SuccessTrackIo::Application.routes.draw do
  resources :goals


  devise_for :users

  root :to => "goals#index"
  resources :goals
end

SuccessTrackIo::Application.routes.draw do
  resources :goals
  resources :goal_tags
  resources :tags

  devise_for :users

  root :to => "goals#index"
  resources :goals
end

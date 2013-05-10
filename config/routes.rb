SuccessTrackIo::Application.routes.draw do
  root :to => "goals#splash"  
  resources :goals
  resources :goal_tags
  resources :tags

  devise_for :users
  resources :goals
end

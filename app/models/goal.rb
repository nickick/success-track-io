class Goal < ActiveRecord::Base
  attr_accessible :name, :description, :user_id, :dependent_goal_id, :finish_date, :finished
  
  validates :name, :presence => true
  validates :finished, :inclusion => {:in => [true, false]}
end

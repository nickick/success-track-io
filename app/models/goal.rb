class Goal < ActiveRecord::Base
  attr_accessible :name, :description, :user_id, :dependent_goal_id,
                  :finish_date, :finished, :time_frame_id

  validates :name, :time_frame_id, :presence => true
  validates :finished, :inclusion => {:in => [true, false]}
end

class GoalTag < ActiveRecord::Base
  attr_accessible :goal_id, :tag_id

  belongs_to :goal
  belongs_to :tag
end

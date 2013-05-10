class Goal < ActiveRecord::Base
  attr_accessible :name, :description, :user_id, :dependent_goal_id,
                  :finish_date, :finished, :time_frame_id, :archived,
                  :tags_attributes

  has_many :tags
  accepts_nested_attributes_for :tags
  
  belongs_to :user

  validates :name, :time_frame_id, :presence => true
  validates :finished, :inclusion => {:in => [true, false]}
end

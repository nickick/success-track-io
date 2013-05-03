class Tag < ActiveRecord::Base
  attr_accessible :title, :goal_id, :goal, :created_at, :updated_at

  belongs_to :goal
  accepts_nested_attributes_for :goal

  validates :title, :presence => true
  validates_uniqueness_of :title, :scope => [:goal_id]
end

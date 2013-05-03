class AddGoalIdToTags < ActiveRecord::Migration
  def change
    add_column :tags, :goal_id, :integer
  end
end

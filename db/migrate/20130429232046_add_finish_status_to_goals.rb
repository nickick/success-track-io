class AddFinishStatusToGoals < ActiveRecord::Migration
  def change
    add_column :goals, :finished, :boolean
  end
end

class AddTimeFrameToGoals < ActiveRecord::Migration
  def change
    add_column :goals, :time_frame_id, :integer
  end
end

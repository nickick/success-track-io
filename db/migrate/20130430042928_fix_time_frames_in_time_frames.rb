class FixTimeFramesInTimeFrames < ActiveRecord::Migration
  def change
    add_column :time_frames, :frame, :string
    remove_column :time_frames, :time_frames
  end
end

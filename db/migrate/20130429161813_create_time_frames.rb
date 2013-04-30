class CreateTimeFrames < ActiveRecord::Migration
  def change
    create_table :time_frames do |t|
      t.string        :time_frames

      t.timestamps
    end
  end
end

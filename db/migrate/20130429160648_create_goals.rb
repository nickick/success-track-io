class CreateGoals < ActiveRecord::Migration
  def change
    create_table :goals do |t|
      t.string        :name
      t.text          :description
      t.datetime      :finish_date
      t.references    :user
      t.integer       :dependent_goal_id

      t.timestamps
    end
  end
end

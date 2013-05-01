class AddArchiveToGoals < ActiveRecord::Migration
  def change
    add_column :goals, :archived, :boolean
  end
end

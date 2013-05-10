class AddGuestToUser < ActiveRecord::Migration
  def up
    add_column :users, :guest_user, :boolean
  end
  
  def down
    remove_column :users, :guest_user
  end
end

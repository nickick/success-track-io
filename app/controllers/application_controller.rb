class ApplicationController < ActionController::Base
  protect_from_forgery
  
  helper_method :current_or_guest_user
  
  def after_sign_in_path_for(resource)
    goals_url
  end
  
  def current_or_guest_user
     if current_user
       if cookies[:guest_user_id]
         logging_in
         guest_user.destroy
         cookies[:guest_user_id] = nil
       end
       current_user
     else
       guest_user
     end
   end
   
 # find guest_user object associated with the current cookies,
   # creating one as needed
   def guest_user
     # Cache the value the first time it's gotten.
     @cached_guest_user ||= User.find(cookies[:guest_user_id] ||= create_guest_user.id)

   rescue ActiveRecord::RecordNotFound # if cookies[:guest_user_id] invalid
      cookies[:guest_user_id] = nil
      guest_user
   end

   private

   # called (once) when the user logs in, insert any code your application needs
   # to hand off from guest_user to current_user.
   def logging_in
     # For example:
     guest_goals = guest_user.goals.all
     guest_goals.each do |goal|
       goal.user_id = current_user.id
       goal.save!
       goal.tags.each do |tag|
         tag.goal_id = goal.id
         tag.save!
       end
     end
   end

   def create_guest_user
     u = User.create(:email => "guest_#{Time.now.to_i}#{rand(99)}@example.com", :guest_user => true)
     u.save!(:validate => false)
     cookies[:guest_user_id] = u.id
     u
   end
end

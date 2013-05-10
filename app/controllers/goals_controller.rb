class GoalsController < ApplicationController
  before_filter(:except => [:splash]) do
  end
  
  def splash
    redirect_to goals_url if current_user
  end

  def new
  end

  def index  
    @goals = Goal.where("user_id = ?", current_or_guest_user.id)
    @time_frames = TimeFrame.all
    @tags = Tag.all
  end

  def create
    if params[:goal][:tags_attributes].nil?
      params[:goal].delete(:tags_attributes)
    end
    params[:goal][:user_id] = current_or_guest_user.id
    @goal = Goal.new(params[:goal])
    if @goal.save
      render :json => @goal
    else
      render :json => @goal.errors.full_messages.join(", "), :status => 422
    end
  end

  def update
    if params[:goal][:tags_attributes].nil?
      params[:goal].delete(:tags_attributes)
    end
    @goal = Goal.find(params[:id])
    if @goal.update_attributes(params[:goal])
      render :json => @goal
    else
      render :json => @goal.errors.full_messages.join(", "), :status => 422
    end
  end

  def destroy
    @goal = Goal.find(params[:id])
    @goal.destroy;
    render :nothing => true
  end
end

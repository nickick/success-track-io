class GoalsController < ApplicationController
  before_filter :authenticate_user!

  def new
  end

  def index
    @goals = Goal.where("user_id = ?", current_user.id)
    @time_frames = TimeFrame.all
  end

  def create
    params[:goal][:user_id] = current_user.id
    @goal = Goal.new(params[:goal])
    if @goal.save
      render :json => @goal
    else
      render :json => @goal.errors
    end
  end

  def update
    @goal = Goal.find(params[:id])
    @goal.update_attributes(params[:goal])
    render :json => @goal
  end

  def destroy
    @goal = Goal.find(params[:id])
    @goal.destroy;
    render :nothing => true
  end
end

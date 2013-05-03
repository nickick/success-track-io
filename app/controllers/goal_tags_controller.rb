class GoalTagsController < ApplicationController
  def index
    @goal_tags = GoalTag.all
    render :json => @goal_tags
  end

  def create
    @goal_tag = GoalTag.new(params[:tag])
    if @goal_tag.save
      render :json => @goal_tag
    else
      render :json => @goal_tag.errors, :status => 422
    end
  end
end

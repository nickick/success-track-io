class TagsController < ApplicationController
  def index
    @tags = Tag.all
    render :json => @tags
  end

  def create
    @tag = Tag.new(params[:tag])
    if @tag.save
      render :json => @tag
    else
      render :json => @tag.errors, :status => 422
    end
  end

  def destroy
    @tag = Tag.find(params[:id])
    if @tag.delete
      render :json => @tag
    else
      render :json => @tag.errors, :status => 422
    end
  end
end

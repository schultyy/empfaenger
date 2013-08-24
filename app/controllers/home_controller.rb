class HomeController < ApplicationController
  def index
  end
  def create
    feed = Feed.new(feed_params)
    if feed.save
      redirect_to "/"
     else
      render nothing: true
    end
  end
  private
  
  def feed_params
    params.require(:feed).permit(:address)
  end
end

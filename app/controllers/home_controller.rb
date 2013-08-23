require 'pp'

class HomeController < ApplicationController
  def index
  end
  def create
    pp params[:feed]
    
    @feed = Feed.new(params[:feed])
    if @feed.save
      pp "saved"
      redirect "/"
     else
      render nothing: true
    end
  end
end

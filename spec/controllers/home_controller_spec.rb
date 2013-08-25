require 'spec_helper'

describe HomeController do
  describe "GET #index" do
    it "should render index view" do
      get :index
      response.should render_template :index
    end
  end
end

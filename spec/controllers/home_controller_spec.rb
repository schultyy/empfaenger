require 'spec_helper'
require 'pp'

describe HomeController do
  describe "POST #create" do
    context "with valid attributes" do
      it "saves the new feed in the database" do
        pp FactoryGirl.attributes_for(:valid_feed)
        expect{
          post :create, feed: FactoryGirl.attributes_for(:valid_feed)
        }.to change(Feed,:count).by(1)
      end
    end
    context "with invalid attributes" do
      it "does not save the feed" do
        expect{
          post :create, feed: FactoryGirl.build(:invalid_feed)
        }.to_not change(Feed,:count)
      end
    end
  end
end

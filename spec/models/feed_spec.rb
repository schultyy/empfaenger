require 'spec_helper'

describe Feed do
  it "should have a valid factory" do
    FactoryGirl.build(:valid_feed).should be_valid
  end
  it "should require a feed address" do
    FactoryGirl.build(:valid_feed, :address => "").should_not be_valid
  end
end

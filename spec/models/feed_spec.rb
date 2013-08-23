require 'spec_helper'

describe Feed do
  it "should have a valid factory" do
    FactoryGirl.build(:feed).should be_valid
  end
  it "should require a feed address" do
    FactoryGirl.build(:feed, :address => "").should_not be_valid
  end
end

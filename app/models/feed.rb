class Feed < ActiveRecord::Base
  validates :address, presence: true
end

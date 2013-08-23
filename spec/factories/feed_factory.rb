FactoryGirl.define do
  factory :valid_feed, class: Feed do
    title "CRE"
    address "http://cre.fm/feed/m4a/"
  end
  factory :invalid_feed, parent: :valid_feed do |f|
    f.address nil
  end
end

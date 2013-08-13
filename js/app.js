$(function(){

  var PodcastFeed = Backbone.Model.extend({ });

  var PodcastFeedList = Backbone.Collection.extend({
    model: PodcastFeed
  });

  var cre = new PodcastFeed({ title: "CRE", image: "http://meta.metaebene.me/media/cre/cre-logo-1400x1400.jpg"});
  var fanboys = new PodcastFeed(
  { 
      title: "fanboys", 
      image: "http://fanboys.fm/images/cover.jpg"
  });

  var feeds = new PodcastFeedList([cre, fanboys]);

  var PodcastView = Backbone.View.extend({
    el: $("#feed-list"),
    render: function(){
      var data = {"listItems": this.model.toJSON()};
      var template = _.template($("#feed-list-template").html(), data);

      this.$el.html(template);
    }
  });
  var podcastView = new PodcastView({model: feeds});
  podcastView.render();
});
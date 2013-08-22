$(function(){

  var PodcastFeed = Backbone.Model.extend({ });

  var PodcastDetailViewModel = Backbone.Model.extend({ });

  var PodcastFeedList = Backbone.Collection.extend({
    model: PodcastFeed
  });

  var cre = new PodcastFeed(
    { 
      id: "1",
      title: "CRE", 
      image: "http://meta.metaebene.me/media/cre/cre-logo-1400x1400.jpg",
      feed_address: "http://cre.fm/feed/m4a/"
    });
  var fanboys = new PodcastFeed(
  { 
      id: "2",
      title: "fanboys", 
      image: "http://fanboys.fm/images/cover.jpg",
      feed_address: "http://fanboys.fm/episodes.m4a.rss"
  });

  var feeds = new PodcastFeedList([cre, fanboys]);

  var PodcastListView = Backbone.View.extend({
    tagName: "ul",
    className: "list-group",
    renderPodcast: function(model){
      var podcastView = new PodcastView({model: model});
      podcastView.render();
      $(this.el).append(podcastView.el);
    },
    initialize: function(){
      _.bindAll(this, "renderPodcast");
    },
    render: function(){
      this.collection.each(this.renderPodcast);
    }
  });

  var PodcastView = Backbone.View.extend({
    tagName: "li",
    className: "list-group-item",
    events: {
      "click .thumbnail img": "clicked"
    },
    clicked: function(e){
      e.preventDefault();

      var detailModel = new PodcastDetailViewModel({
        title: this.model.get("title"),
      });

      $.get(this.model.feed_address, function(data){
        results= [];
        $(data).find("entry").each(function(){
          var el = $(this);
          results.push(el.find("title"));
        });

        var detailView = new PodcastDetailView({model: detailModel});
        detailView.render();
        $("#feed-content").html(detailView.el);
      });
    },
    render: function(){
      var template = $("#item-template");
      var html = template.tmpl(this.model.toJSON());
      $(this.el).append(html);
    }
  });

  var PodcastDetailView = Backbone.View.extend({
    tagName: "div",
    render: function(){
      var template = $("#podcast-detail-template");
      var html = template.tmpl(this.model.toJSON());
      $(this.el).append(html);
    }
  });

  var view = new PodcastListView({collection: feeds});
  view.render();
  $("#feed-list").html(view.el);
});
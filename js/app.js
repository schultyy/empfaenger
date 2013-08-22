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
      episodes: ["CRE203", "CRE202","CRE201","CRE200"]
    });
  var fanboys = new PodcastFeed(
  { 
      id: "2",
      title: "fanboys", 
      image: "http://fanboys.fm/images/cover.jpg",
      episodes:["Episode #133 - Guck irgendwohin", "Episode #132 - Bluetoothkabel", "Episode #131 - Käse Tetris"]
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


      var detailView = new PodcastDetailView({model: this.model});
      detailView.render();
      $("#feed-content").html(detailView.el);
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
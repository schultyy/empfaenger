$(function(){

  var PodcastFeed = Backbone.Model.extend({ });

  var PodcastFeedList = Backbone.Collection.extend({
    model: PodcastFeed
  });

  var cre = new PodcastFeed(
    { 
      id: "1",
      title: "CRE", 
      image: "http://meta.metaebene.me/media/cre/cre-logo-1400x1400.jpg"
    });
  var fanboys = new PodcastFeed(
  { 
      id: "2",
      title: "fanboys", 
      image: "http://fanboys.fm/images/cover.jpg"
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
      var name = this.model.get("name");
      alert("name");
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

    }
  });

  var view = new PodcastListView({collection: feeds});
  view.render();
  $("#feed-list").html(view.el);
});
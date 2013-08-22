$(function(){

  var PodcastFeed = Backbone.Model.extend({ });

  var PodcastEpisode = Backbone.Model.extend({ });

  var PodcastDetailViewModel = Backbone.Model.extend({ });

  var PodcastFeedList = Backbone.Collection.extend({
    model: PodcastFeed
  });

  var cre = new PodcastFeed(
    { 
      id: "1",
      title: "CRE", 
      image: "http://meta.metaebene.me/media/cre/cre-logo-1400x1400.jpg",
      episodes: [
        new PodcastEpisode({
            title: "CRE203 Online-Journalismus", 
            imageUrl:"http://meta.metaebene.me/media/cre/cre203-online-journalismus.jpg",
            description: "Kaum eine Branche ist so tief betroffen und verstört vom digitalen Wandel wie der Journalismus und doch bietet gerade Digitalisierung und die Einbeziehung des Netzes ganz neue Chancen der Betätigung. Datenjournalismus und Crowdsourcing bilden sich als neue Werkzeuge innovativer Journalisten heraus und Crowdfunding könnte einst eine Alternative zum etablierten werbefinanzierten Distributionsmodell werden."
          }),
        new PodcastEpisode({
          title: "CRE202 Hackerfilme", 
          imageUrl: "http://meta.metaebene.me/media/cre/cre202-hackerfilme.jpg",
          description: "Die Filmbranche ist fasziniert von Hackern und ihrer Kultur, doch ist das Bild des Hackers in der Öffentlichkeit auch stark geprägt von der Art, wie Hacker in Filmen der Traumfabriken präsentiert werden. Dabei ist es interessant anzusehen, wie das Bild des technisch versierten Experten, der komplexe Systeme unter seiner Kontrolle sich über die Zeit gewandelt hat und immer noch wandelt. Caspar Clemens Mierau ist Medienkulturwissenschaftler und Cineast und hat sich intensiv mit Filmen beschäftigt, die in den letzten 30 Jahren das Bild des Hackers genutzt und geprägt haben. Im Gespräch mit Tim Pritlove stellt Caspar eine Reihe von Filmen vor, die repräsentativ für den Auseinandersetzung der Filmschaffenden mit der Hackerkultur sind." 
        }),
        new PodcastEpisode({
          title: "CRE201 Höhlenforschung", 
          imageUrl: "http://meta.metaebene.me/media/cre/cre201-hoehlenforschung.jpg",
          description: "Es gibt nur noch wenige weiße Flecke auf dieser Erde, die noch nie ein Mensch zuvor betreten hat - und diese liegen unter der Erde. Viele Regionen der Welt sind geologisch günstig für die Entstehung von Höhlengebieten und eine kleine Gemeinde von Menschen kümmert sich um die Entdeckung aber auch den Schutz dieser Geotope: die Höhlenforscher. Obwohl bereits eine Vielzahl von Höhlen bekannt sind, ermöglichen es neue Technologien, dass auch bisher versteckte Untergrundsituationen aufgespürt werden können. Auch Fortschritte in der Abseil- und Lichttechnik trugen zum Fortschritt bei doch ist am Ende des Tages das Höhlenforscher-Geschäft auch sehr untechnologisch und im wahrsten Sinne des Wortes erdverbunden. Im Gespräch mit Tim Pritlove berichtet Doobee von Höhlen, Höhlenforschung und welchen Wert dieses Hobby für ihn persönlich und vor allem für die Wissenschaft und Gesellschaft darstellt."
        }),
        new PodcastEpisode({
          title: "CRE200 Stadtplanung", 
          imageUrl: "http://meta.metaebene.me/media/cre/cre200-stadtplanung.jpg",
          description: "Die Städte spielen seit dem Übergang des Menschen von Jäger und Sammler zum Ackerbau die entscheidende Rolle in der Entwicklung der Menschheit und ihre Bedeutung nimmt im 21. Jahrhundert weiter zu. Städte stehen heute vor der Herausforderung, die großen ökologischen, ökonomischen und gesellschaftlichen Probleme der Zeit abzufedern und neue Innovationen zu gebären, um das Wachstum und den Klimawandel zu bewältigen. Im Gespräch mit Tim Pritlove erzählt der Architekt und Stadtplaner Thomas Stellmach von der Geschichte der Städte seit dem Alten Orient über die Antike, dem Römischen Reich, dem Mittelalter, dem Barock, der Renaissance bis zur Moderne und schildert die aktuellen Herausforderungen der Stadtplanung."
        })
      ]
    });
  var fanboys = new PodcastFeed(
  { 
      id: "2",
      title: "fanboys", 
      image: "http://fanboys.fm/images/cover.jpg",
      episodes: [
        new PodcastEpisode({title: "Episode #133 - Guck irgendwohin"}),
        new PodcastEpisode({title: "Episode #132 - Bluetoothkabel"}),
        new PodcastEpisode({title: "Episode #131 - Käse Tetris"})
      ]
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
    },
    render: function(){
      var template = $("#item-template");
      var html = template.tmpl(this.model.toJSON());
      $(this.el).append(html);
    }
  });

  var PodcastDetailView = Backbone.View.extend({
    el: "#feed-content",
    events: {
      "click .podcast-title": "clicked"
    },
    clicked: function(e){
      e.preventDefault();
      var title = $(e.target).html();
      var element = this.findByTitle(title);
      $("#podcast-episode-title").text(element.get("title"));
      $("#podcast-episode-description").text(element.get("description"));
      $("#podcast-episode-thumbnail").attr("src",element.get("imageUrl"));
    },
    findByTitle: function(title){
      for(var i = 0; i < this.model.get("episodes").length; i++){
        var element = this.model.get("episodes")[i];
        if(element.get("title") == title)
          return element;
      }
      return null;
    },
    render: function(){
      $(this.el).empty();
      var template = $("#podcast-detail-template");
      var html = template.tmpl(this.model.toJSON());
      $(this.el).append(html);
    }
  });

  var view = new PodcastListView({collection: feeds});
  view.render();
  $("#feed-list").html(view.el);
});
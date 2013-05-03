ST.Views.SideBarView = Backbone.View.extend({
	initialize: function() {
    this.listenTo(ST.Store.indexGoals, "add", this.render);
    this.listenTo(ST.Store.indexGoals, "change", this.render);
    this.listenTo(ST.Store.indexGoals, "remove", this.render);
	},

  events: {
    "click .goal-node" : "bookmarkDirect",
    "mouseover .goal-node" : "growNode",
    "mouseout .goal-node" : "shrinkNode",
  },

  bookmarkDirect: function(e){
    $(document.body).animate({
      scrollTop: $('#goal-'+$(e.currentTarget).attr('id')+'-name').offset()['top'] - 100
    }, 600);
  },

  growNode: function(e) {
    $(e.target).addClass('focus-node', 100);
    $($(e.target).closest('li')).addClass('focus-node', 100);
  },

  shrinkNode: function(e) {
    $(e.target).removeClass('focus-node', 100);
    $($(e.target).closest('li')).removeClass('focus-node', 100);
  },

  totalGoals: 0,

  tagName: 'ul',

  attributes: {
    class: 'side-nav'
  },

  render: function() {
    totalGoals = this.collection.length;
    //this.shortcutLinks();

		var renderedContent = JST["goals/sideBar"]({
			goals: this.collection
		})

		this.$el.html(renderedContent);

    this.activateShortcutLinks();
    this.$('a').click(function() {
      event.preventDefault();
    });
		return this;
  },

  activateShortcutLinks: function() {
    var that = this;
    that.collection.each(function(goal) {
      var $goalIdNode = $('#goal-'+goal.escape('id')+'-node')
      that.addScrollClicking($goalIdNode);
    });
  },

  addScrollClicking: function($node) {
    $node.click(function() {
      $(document.body).animate({
        scrollTop: $node.attr('href').offset().top
      }, 600);
    })
  }
});
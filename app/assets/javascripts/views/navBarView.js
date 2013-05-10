ST.Views.NavBarView = Backbone.View.extend({

	initialize: function() {
    this.listenTo(ST.Store.indexGoals, "add", this.render);
    this.listenTo(ST.Store.indexGoals, "change", this.render);
    this.listenTo(ST.Store.indexGoals, "remove", this.render);
	},

  events: {
    "keyup #search_bar" : "searchFilter"
  },

  render: function() {
    var renderedContent = JST['navbar/nav']({
      thisURL: this.currentPath()
    });

    this.$el.html(renderedContent);

    this.selectNavLi();

    return this
  },

  currentPath: function() {
    var url = window.location.href;
    var pathString = url.split('/')[3];
    return pathString;
  },

  searchFilter: function(e) {
		var searchString = $(e.target).val();
		_.delay(function(){
			if ($(e.target).val() === searchString) {
		    ST.Store.searchString.set({
		      string: searchString
		    });
			};
		}, 500);
  },

  selectNavLi: function() {
    this.$('.active').removeClass('active');
    var url = window.location.href;
    var pathString = 'a[href="/' + url.split('/')[3] + '"]';
    this.$(pathString).parent().addClass('active');
  },
});
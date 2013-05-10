ST.Views.IndexGoalView = Backbone.View.extend({
  navLinkNodes: [],

	events: {
		"click .button"              : "show",
		"click .finished-clickable"  : "switchFinished",
	},
	
	filterCollection: function(){
		var that = this;
    var filteredCollection = that.collection.filterStatus(
      that.pathToFilter[that.currentPath()]
    );

    filteredCollection = filteredCollection.filterSearch(
      that.options.search
    );
		return filteredCollection
	},

	render: function() {
		var that = this;
    var filteredCollection = that.filterCollection();

    var renderedTopContent = JST["goals/index"]({
			goals: filteredCollection
		});
		that.$el.html(renderedTopContent);
		
		that.addDetailView();

    that.appendSideView($('.side-nav'));

		return that;
	},
	
	addDetailView: function() {
		var that = this;
		
    var filteredCollection = that.filterCollection();
		
		filteredCollection.each(function(goal) {
			var goalDetailView = new ST.Views.GoalDetailView({
				model: goal
			})
			that.$el.append(goalDetailView.render().$el);
      that.$el.fadeIn(300);
		});
	},

  appendSideView: function($el) {
    var filteredCollection = this.filterCollection();
				
    var sideBarView = new ST.Views.SideBarView({
      collection: filteredCollection
    })

    $el.html(sideBarView.render().$el);
  },

  pathToFilter: {
    'goals' : 'all',
    'goals#' : 'all',
    'goals#active': false,
    'goals#completed' : true,
    'goals#archived': 'archived'
  },

  currentPath: function() {
    var url = window.location.href;
    var pathString = url.split('/')[3];
    return pathString;
  },

	show: function(){
		$('#new-goal').fadeIn(200);
	},
})
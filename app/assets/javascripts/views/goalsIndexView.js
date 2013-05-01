ST.Views.IndexGoalView = Backbone.View.extend({

	events: {
		"click .button": "show",
		"click .finished-clickable": "switchFinished"
	},

	render: function() {
		var that = this;
    that.collection = that.collection.filterStatus(
      that.pathToFilter[that.currentPath()]
    );

		var renderedTopContent = JST["goals/index"]({
			goals: that.collection
		});
		that.$el.html(renderedTopContent);

		that.collection.each(function(goal) {
			var goalDetailView = new ST.Views.GoalDetailView({
				model: goal
			})
			that.$el.append(goalDetailView.render().$el);
      that.$el.fadeIn(300);
		})

		return that;
	},

  pathToFilter: {
    '#' : 'all',
    '#active': false,
    '#completed' : true,
    '#archived': 'archived'
  },

  currentPath: function() {
    var url = window.location.href;
    var pathString = url.split('/')[3];
    return pathString;
  },

	show: function(){
		$('#new-goal').fadeIn(200);
	},

	switchFinished: function(e) {

	}
})
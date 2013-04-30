ST.Views.GoalDetailView = Backbone.View.extend({
	events: {
		"click .finished" : "switchFinish",
		"dblclick " : "editGoal"
	},

	render: function() {
		var renderedContent = JST["goals/detail"]({
			goal: this.model,
			finished: this.model.escape("finished"),
      timeFrames: ST.Store.timeFrames
		})
		this.$el.html(renderedContent);

		return this;
	},

	switchFinish: function() {
		var new_finish = function(current_finish) {
			if (current_finish == "true") {
				return false;
			} else {
				return true;
			}
		};
		var that = this;
		var current_finish = that.model.escape("finished")
		setTimeout( function() {
			that.model.set({
				finished: new_finish(current_finish)
			});
			that.model.save({},{
			})
		}, 30 );
	},

	editGoal: function() {
		console.log("logged this!")
	}
});
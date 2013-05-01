ST.Views.GoalDetailView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.model, "change", this.render);
	},

	events: {
		"click .finished" : "switchFinish",
		"dblclick .goal-detail" : "editRender",
    "dblclick .goal-name" : "editRender",
    "click #delete-button" : "deleteGoal",
    "click #archive-button" : "archiveGoal"
	},

	render: function() {
		var renderedContent = JST["goals/detail"]({
			goal: this.model,
			finished: this.model.escape("finished"),
      timeFrames: ST.Store.timeFrames,
      currentPath: this.currentPath()
		})
		this.$el.html(renderedContent);

		return this;
	},

  viewFade: function(){
    this.$el.slideUp();
  },

  new_bool: function(current_bool) {
		if (current_bool == "true") {
			return false;
		} else {
			return true;
		}
	},

  currentPath: function() {
    var url = window.location.href;
    var pathString = url.split('/')[3];
    return pathString;
  },

  checkIfURL: function(url) {
    if (this.currentPath() == url) {
      return true;
    };
    return false;
  },

  switchFinish: function() {
		var that = this;
    if ((!that.checkIfURL('#')) && (!that.checkIfURL('#archived'))) {
      that.viewFade();
    };
		var current_finish = that.model.escape("finished")
		that.model.set({
			finished: that.new_bool(current_finish)
		});
		that.model.save();
  },

	editRender: function() {
		var renderedContent = JST["goals/editDetailGoal"]({
			goal: this.model,
			finished: this.model.escape("finished"),
      timeFrames: ST.Store.timeFrames,
      todayString: this.model.escape("finish_date").slice(0,10)
		});

    var goalIdString = '#goal_'+this.model.escape("id")+'_detail';

    $(goalIdString).prepend(renderedContent);
    $(goalIdString).slideDown();

		return this;
	},

  deleteGoal: function() {
    this.viewFade();
    this.model.destroy();
  },

  archiveGoal: function() {
		var that = this;
    that.viewFade();
		var current_archive = that.model.escape("archived")
		that.model.set({
			archived: that.new_bool(current_archive)
		});
		that.model.save();
  }
});
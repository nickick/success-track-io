ST.Views.GoalDetailView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.model, "change", this.render);
	},

	events: {
		"click .finished"                         : "switchFinish",
    "click #delete-button"                    : "deleteGoal",
    "click #archive-button"                   : "archiveGoal",
	  "dblclick .goal-time-frame-clickable"     : "chooseTimeFrame",
    "dblclick .name-container"                : "editName",
    "dblclick .goal-description-clickable"    : "descriptionEdit",
    "dblclick .goal-finish-date-clickable"    : "finishDateEdit",
    "keypress"                                : "filterOnEnter",
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

	chooseTimeFrame: function() {
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
  },

  descriptionEdit: function() {
    var goalString = '.goal-'+this.model.escape('id')+'-description';
    var inputString = "<input type='text' class='detail-input' id='goal_description_edit'>";
    $(goalString).html(inputString);
    $('#goal_description_edit').val(this.model.escape("description")).focus();
  },

  finishDateEdit: function() {
    var goalString = '.goal-'+this.model.escape('id')+'-finish-date';
    var inputString = "<input type='text' class='detail-input' id='goal_finish_date_edit'>";
    $(goalString).html(inputString);
    $('#goal_finish_date_edit').val(this.model.escape("finish_date").slice(0,10)).focus();
  },

  editName: function() {
    var goalStringId = '#goal-'+this.model.escape('id')+'-name';
    var inputString = "<input type='text' id='goal_name_edit'>";
    $(goalStringId).html(inputString);
    $('#goal_name_edit').val(this.model.get("name")).focus();
  },

  findCheckedFrameId: function($timeFrames) {
    var finValue = null;
    _.each($timeFrames, function(timeFrame){
      if(timeFrame.checked == true) {
        finValue = timeFrame.value;
      };
    });
    return finValue;
  },

  finishDate: function() {
    if ($('#goal_finish_date_edit').val()) {
      return new Date($('#goal_finish_date_edit').val());
    } else {
      return this.model.escape('finish_date');
    };
  },

  updateGoal: function() {
    var that = this;
    var $timeFrames = $('[name="time_frame_'+this.model.escape('id')+'"]');
    var timeFrameChecked = this.findCheckedFrameId($timeFrames);
    this.model.set({
      name: $('#goal_name_edit').val() || this.model.escape('name'),
      description: $('#goal_description_edit').val() || this.model.escape('description'),
      finish_date: that.finishDate(),
      time_frame: timeFrameChecked
    });
    this.model.save();
  },

	filterOnEnter: function(e) {
		if (e.keyCode != 13) { return };
		this.updateGoal();
	},
});
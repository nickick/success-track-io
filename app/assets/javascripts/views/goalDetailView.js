ST.Views.GoalDetailView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model, "request", this.render);
    this.editBooleans = {
      timeFrameEdit: false,
      finishDateEdit: false,
      statusEdit: false,
      nameEdit: false,
      descriptionEdit:false
    }
	},

	events: {
		"click .finished"                         : "switchFinish",
    "click #delete-button"                    : "deleteGoal",
    "click #archive-button"                   : "archiveGoal",
	  "dblclick .goal-time-frame-clickable"     : "chooseTimeFrame",
    "dblclick .name-container"                : "editName",
    "dblclick .goal-description-clickable"    : "descriptionEdit",
    "dblclick .goal-finish-date-clickable"    : "finishDateEdit",
    "dblclick .edit-radio-label"              : "updateGoal",
    "keypress"                                : "filterOnEnter",
    "mouseover .goal-status-clickable"        : "installClickStatusHandler"
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

  installClickStatusHandler: function() {
    var that = this;
    $('#finish-click-'+that.model.get('id')).dblclick(function(){
      $('#finish-click-'+that.model.get('id')).removeAttr('id')
      $('#finish-switch-'+that.model.get('id')).click();
    });
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
    if (!this.editBooleans['timeFrameEdit']){
      this.editBooleans['timeFrameEdit'] = true;
  		var renderedContent = JST["goals/editDetailGoal"]({
  			goal: this.model,
  			finished: this.model.escape("finished"),
        timeFrames: ST.Store.timeFrames,
        todayString: this.model.escape("finish_date").slice(0,10)
  		});

      var goalIdString = '#goal_'+this.model.escape("id")+'_detail';
      var timeFrameEditString = '.time-frame-edit-'+this.model.escape("id");
      $(goalIdString).prepend(renderedContent);
      $(timeFrameEditString).slideDown();
    }

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
    if (!this.editBooleans['descriptionEdit']){
      this.editBooleans['descriptionEdit'] = true;
      var goalString = '.goal-'+this.model.escape('id')+'-description';
      var inputString = "<input type='text' class='detail-input' id='goal_description_edit'>";
      $(goalString).html(inputString);
      $('#goal_description_edit').val(this.model.escape("description")).focus();
    };
  },

  finishDateEdit: function() {
    if (!this.editBooleans['finishDateEdit']){
      this.editBooleans['finishDateEdit'] = true;
      var goalString = '.goal-'+this.model.escape('id')+'-finish-date';
      var inputString = "<input type='text' class='detail-input' id='goal_finish_date_edit'>";
      $(goalString).html(inputString);
      $('#goal_finish_date_edit').val(this.model.escape("finish_date").slice(0,10)).focus();
    };
  },

  editName: function() {
    if (!this.editBooleans['nameEdit']){
      this.editBooleans['nameEdit'] = true;
      var goalStringId = '#goal-'+this.model.escape('id')+'-name';
      var inputString = "<input type='text' id='goal_name_edit'>";
      $(goalStringId).html(inputString);
      $('#goal_name_edit').val(this.model.get("name")).focus();
    };
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

  timeFrameSlideUp: function() {
    var timeFrameEditString = '.time-frame-edit-'+this.model.escape("id");
    $(timeFrameEditString).slideUp(100).addClass('hidden');
  },

  updateGoal: function() {
    var that = this;
    var $timeFrames = $("[name='time_frame_"+that.model.get('id')+"']");
    var timeFrameChecked = that.findCheckedFrameId($timeFrames);
    that.timeFrameSlideUp();
    setTimeout(function() {
      that.model.set({
        name: $('#goal_name_edit').val() || that.model.get('name'),
        description: $('#goal_description_edit').val() || that.model.get('description'),
        finish_date: that.finishDate(),
        time_frame_id: timeFrameChecked || that.model.get('time_frame_id')
      });
      that.model.save({},{
        errors: function() {
          $('.goal'+that.model.escape("id")+'errors').html('<div class="errors">'+xhr.responseText+'</div><br>');
          $('.error-container').slideDown();
        }
      });
      that.editBooleans = {
        timeFrameEdit: false,
        finishDateEdit: false,
        statusEdit: false,
        nameEdit: false,
        descriptionEdit:false
      };
    }, 100);
  },

	filterOnEnter: function(e) {
		if (e.keyCode == 13) { this.updateGoal() };
	},
});
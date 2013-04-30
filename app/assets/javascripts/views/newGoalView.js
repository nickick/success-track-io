ST.Views.NewGoalView = Backbone.View.extend({

	initialize: function() {
		this.nameGoalOnly = true;
		this.listenTo(ST.Store.indexGoals, "add", this.render);
	},

	events: {
		'click #goal-detail-button': 'appendDetail',
		'keypress #new-goal-name': 'filterOnEnter'
	},

	render: function() {
		var renderedContent = JST['goals/new']({
			goal: this.model
		});

		this.$el.html(renderedContent);

		return this;
	},

  todayDate: function() {
    var now = new Date();
    var year =  now.getFullYear();
    var month = (now.getMonth() > 10) ? now.getMonth() : "0" + now.getMonth();
    var date =   (now.getDate() > 10) ? now.getDate() : "0" + now.getDate();
    return year + "-" + month + "-" + date;
  },

	addDetail: function($detailEl) {
		var renderedDetailContent = JST['goals/newDetails']({
			goal: this.model,
			timeFrames: ST.Store.timeFrames,
      todayString: this.todayDate()
		});

		$detailEl.addClass("row");

		$detailEl.append(renderedDetailContent);

		return $detailEl;
	},

	filterOnEnter: function(e) {

		if (e.keyCode != 13) { return };
		if (this.nameGoalOnly) {
			this.appendDetail();
		} else {
			this.saveNewGoal();
		}
	},

	appendDetail: function() {
		$detailEl = $('#new_goal_detail');
		this.nameGoalOnly = false;
		this.addDetail($detailEl);
		this.applyFadeIn($detailEl);
	},

	applyFadeIn: function($detailEl) {
		$detailEl.slideDown();
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

	saveNewGoal: function() {
		this.nameGoalOnly = true;
    var $timeFrames = $('[name="time_frame"]');
    var timeFrameChecked = this.findCheckedFrameId($timeFrames);
    console.log(timeFrameChecked);
		var that = this;
		that.model.set({
			name: $('#new-goal-name').val(),
			finished: "false",
      time_frame_id: timeFrameChecked,
      finish_date: $('#finish_date').val(),
      description: $('#goal_description').val(),

		});
		that.model.save({},{
			success: function() {
				ST.Store.indexGoals.add(that.model);
			},
			error: function() {

			}
		});
	}
});
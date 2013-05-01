ST.Views.NewGoalView = Backbone.View.extend({

	initialize: function() {
		this.nameGoalOnly = true;
    this.detailFormOut = false;
		this.listenTo(ST.Store.indexGoals, "add", this.render);
	},

	events: {
		'click #goal-detail-button': 'appendDetail',
    'click #save-button': 'saveNewGoal',
		'keypress #new-goal-name': 'filterOnEnter',
    'keypress #finish_date': 'filterOnEnter',
    'keypress #save-button' : 'saveNewGoal'
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

	filterOnEnter: function(e) {

		if (e.keyCode != 13) { return };
		if (this.nameGoalOnly && !this.detailFormOut) {
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
    this.detailFormOut = true;
	},

	applyFadeIn: function($detailEl) {
		$detailEl.slideDown();
	},

	addDetail: function($detailEl) {
		var renderedDetailContent = JST['goals/newDetails']({
			goal: this.model,
			timeFrames: ST.Store.timeFrames,
      todayString: this.todayDate()
		});

    $('#new-goal-name').removeClass("bottom-bordered");

		$detailEl.addClass("row");

		$detailEl.append(renderedDetailContent);

    this.changeEditButton();

		return $detailEl;
	},

  changeEditButton: function(){
    var buttonString =
      "<button id='save-button' tabindex=5>Add Goal</button>"
    $('#goal-detail-button').remove();
    $('#new-goal-input').append(buttonString);
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
		var that = this;
		that.model.set({
			name: $('#new-goal-name').val(),
			finished: "false",
      archived: "false",
      time_frame_id: timeFrameChecked,
      finish_date: $('#finish_date').val(),
      description: $('#goal_description').val(),

		});
		that.model.save({},{
			success: function() {
				ST.Store.indexGoals.add(that.model);
			},
      error: function(model, xhr) {
        $('.error-container').html('<div class="errors">'+xhr.responseText+'</div><br>');
        $('.error-container').slideDown();
        var nameError = "Name can't be blank"
        if (xhr.responseText.indexOf(nameError) != -1) {
          $('#new-goal-name').focus();
        }
      }
		});
	}
});
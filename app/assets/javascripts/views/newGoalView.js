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
	
	addDetail: function($detailEl) {		
		var renderedDetailContent = JST['goals/newDetails']({
			goal: this.model,
			timeFrames: ST.Store.timeFrames
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
	
	
	saveNewGoal: function() {
		this.nameGoalOnly = true;
		var that = this;
		that.model.set({
			name: $('#new-goal-name').val(),
			finished: "false",
			
		});
		console.log("got here");
		that.model.save({},{
			success: function() {
				ST.Store.indexGoals.add(that.model);
			},
			error: function() {
				
			}
		});
	}
});
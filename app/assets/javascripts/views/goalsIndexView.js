ST.Views.IndexGoalView = Backbone.View.extend({
	
	initialize: function() {
		this.listenTo(ST.Store.indexGoals, "add", this.render);
		this.listenTo(ST.Store.indexGoals, "change", this.render);
		this.listenTo(ST.Store.indexGoals, "destroy", this.render);		
		this.listenTo(ST.Store.indexGoals, "remove", this.render);				
	},
	
	events: {
		"click .button": "show",
		"click .finished-clickable": "switchFinished"
	},
	
	render: function() {
		var that = this;
		
		var renderedTopContent = JST["goals/index"]({
			goals: that.collection
		});
		
		that.$el.html(renderedTopContent);
		
		that.collection.each(function(goal) {
			var goalDetailView = new ST.Views.GoalDetailView({
				model: goal
			})
			
			that.$el.append(goalDetailView.render().$el);
		})

		return that;
	},
	
	show: function(){
		$('#new-goal').fadeIn(200);
	},
	
	switchFinished: function(e) {
		
	}
})
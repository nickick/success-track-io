ST.Routers.GoalsRouter = Backbone.Router.extend({
	
	initialize: function($contentDiv, $newGoalDiv){
		this.$contentDiv = $contentDiv;
		this.$newGoalDiv = $newGoalDiv;
		this.index();
	},
	
	index: function(){
		var indexGoalView = new ST.Views.IndexGoalView({
			collection: ST.Store.indexGoals
		});
		
		var newGoal = new ST.Models.GoalModel();
		
		var newGoalView = new ST.Views.NewGoalView({
			model: newGoal
		});
		
		this.$contentDiv.html(indexGoalView.render().$el);
		this.$newGoalDiv.html(newGoalView.render().$el);
	},
});
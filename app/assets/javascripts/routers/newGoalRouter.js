ST.Routers.NewGoalRouter = Backbone.Router.extend({
	events: {
		"#new_goal" : "display"
	},
	
	initialize: function($el) {
		this.$el = $el;
	},
	
	display: function() {
		var newGoalView = new ST.Views.NewGoalView({
			model: ST.Models.GoalModel
		});
		this.$el.html(newGoalView.render().$el);
		this.$el.addClass("pulldown");
	}
});
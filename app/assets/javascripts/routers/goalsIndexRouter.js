ST.Routers.GoalsRouter = Backbone.Router.extend({

  routes: {
    ""          : "index",
    "completed" : "completedIndex",
    "active"    : "activeIndex"
  },

	initialize: function($contentDiv, $newGoalDiv){
		this.$contentDiv = $contentDiv;
		this.$newGoalDiv = $newGoalDiv;
		this.index();
	},

  newGoalBox: function() {
    var newGoal = new ST.Models.GoalModel();

    var newGoalView = new ST.Views.NewGoalView({
			model: newGoal
		});

    this.$newGoalDiv.html(newGoalView.render().$el);
  },

	index: function(){
    this.$contentDiv.fadeOut(200);
		var indexGoalView = new ST.Views.IndexGoalView({
			collection: ST.Store.indexGoals
		});

    this.newGoalBox();
		this.$contentDiv.html(indexGoalView.render().$el);
    this.$contentDiv.fadeIn(200);
	},

  completedIndex: function() {
    this.$contentDiv.fadeOut(200);
    var completedGoals = ST.Store.indexGoals.filterStatus(true)
    var completedIndexGoalView = new ST.Views.IndexGoalView({
      collection: completedGoals
    });

    this.newGoalBox();
    this.$contentDiv.html(completedIndexGoalView.render().$el);
    this.$contentDiv.fadeIn(200);
  },

  activeIndex: function() {
    this.$contentDiv.fadeOut(200);
    var activeGoals = ST.Store.indexGoals.filterStatus(false)
    var activeIndexGoalView = new ST.Views.IndexGoalView({
      collection: activeGoals
    });

    this.newGoalBox();
    this.$contentDiv.html(activeIndexGoalView.render().$el);
    this.$contentDiv.fadeIn(200);
  }
});
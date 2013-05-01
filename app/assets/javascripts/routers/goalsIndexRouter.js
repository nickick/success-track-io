ST.Routers.GoalsRouter = Backbone.Router.extend({

  routes: {
    ""          : "index",
    "completed" : "index",
    "active"    : "index",
    "archived"  : "index"
  },

	initialize: function($contentDiv, $newGoalDiv){
		this.$contentDiv = $contentDiv;
		this.$newGoalDiv = $newGoalDiv;
		this.index();

    this.listenTo(ST.Store.indexGoals, "add", this.index);
	},

  selectNavLi: function() {
    $('.active').removeClass('active');
    var url = window.location.href;
    var pathString = 'a[href="/' + url.split('/')[3] + '"]';
    $(pathString).parent().addClass('active');
  },

  newGoalBox: function() {
    var newGoal = new ST.Models.GoalModel();

    var newGoalView = new ST.Views.NewGoalView({
			model: newGoal
		});

    this.$newGoalDiv.html(newGoalView.render().$el);
  },

	index: function(){
    this.selectNavLi();
		var indexGoalView = new ST.Views.IndexGoalView({
			collection: ST.Store.indexGoals
		});

    this.newGoalBox();
		this.$contentDiv.html(indexGoalView.render().$el);
	},
});
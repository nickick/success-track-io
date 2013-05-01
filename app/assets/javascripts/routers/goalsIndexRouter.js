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
		var indexGoalView = new ST.Views.IndexGoalView({
			collection: ST.Store.indexGoals
		});

    this.newGoalBox();
		this.$contentDiv.html(indexGoalView.render().$el);
    this.selectNavLi();
	},

  // completedIndex: function() {
//     ST.Store.completedGoals = ST.Store.indexGoals.filterStatus(true);
//     var completedIndexGoalView = new ST.Views.IndexGoalView({
//       collection: ST.Store.completedGoals
//     });
//
//     this.newGoalBox();
//     this.$contentDiv.html(completedIndexGoalView.render().$el);
//     this.selectNavLi();
//   },
//
//   activeIndex: function() {
//     ST.Store.activeGoals = ST.Store.indexGoals.filterStatus(false);
//     var activeIndexGoalView = new ST.Views.IndexGoalView({
//       collection: ST.Store.activeGoals
//     });
//
//     this.newGoalBox();
//     this.$contentDiv.html(activeIndexGoalView.render().$el);
//     this.selectNavLi();
//   }
});
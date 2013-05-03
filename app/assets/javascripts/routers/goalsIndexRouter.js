ST.Routers.GoalsRouter = Backbone.Router.extend({

  routes: {
    ""          : "renderPage",
    "completed" : "renderPage",
    "active"    : "renderPage",
    "archived"  : "renderPage"
  },

	initialize: function($navBar, $contentDiv, $newGoalDiv){
		this.$navBar = $navBar;
    this.$contentDiv = $contentDiv;
		this.$newGoalDiv = $newGoalDiv;
    this.attachNavBar();
		this.index();
    this.listenTo(ST.Store.indexGoals, "add", this.index);
    this.listenTo(ST.Store.searchString, "change", this.index);
	},

  renderPage: function() {
    this.index();
    this.attachNavBar();
  },

  newGoalBox: function() {
    var newGoal = new ST.Models.GoalModel();

    var newGoalView = new ST.Views.NewGoalView({
			model: newGoal
		});

    this.$newGoalDiv.html(newGoalView.render().$el);
  },

  attachNavBar: function() {
    var navBarView = new ST.Views.NavBarView();
    this.$navBar.html(navBarView.render().$el);
  },

	index: function(){
		var indexGoalView = new ST.Views.IndexGoalView({
			collection: ST.Store.indexGoals,
      search: ST.Store.searchString.get('string') || 'none'
		});

    this.$contentDiv.html(indexGoalView.render().$el);
    this.newGoalBox();
	},
});
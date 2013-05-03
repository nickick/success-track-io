window.ST = {
	Models: {},
	Collections: {},
	Routers: {},
	Views: {},
	Store: {},

	initialize: function($navBar, $indexDiv, $newGoalDiv, indexGoalData, timeFrames) {
		ST.Store.indexGoals = new ST.Collections.GoalCollection(indexGoalData['goals']);
    ST.Store.indexTags = new ST.Collections.TagCollection(indexGoalData['tags']);
		ST.Store.timeFrames = new ST.Collections.TimeFrameCollection(timeFrames);
    ST.Store.searchString = new ST.Models.SearchModel();

		new ST.Routers.GoalsRouter($navBar, $indexDiv, $newGoalDiv);
		Backbone.history.start();
	},
};
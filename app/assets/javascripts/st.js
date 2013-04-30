window.ST = {
	Models: {},
	Collections: {},
	Routers: {},
	Views: {},
	Store: {},
	
	initialize: function($indexDiv, $newGoalDiv, indexGoalData, timeFrames) {		
		ST.Store.indexGoals = new ST.Collections.GoalCollection(indexGoalData);
		ST.Store.timeFrames = new ST.Collections.TimeFrameCollection(timeFrames);
		
		new ST.Routers.GoalsRouter($indexDiv, $newGoalDiv);
		Backbone.history.start();
	},
};
ST.Collections.GoalCollection = Backbone.Collection.extend({
	model: ST.Models.GoalModel,

	comparator: function(goal0, goal1) {
				if (goal1.get("created_at") > goal0.get("created_at")) return 1;
				if (goal0.get("created_at") > goal1.get("created_at")) return -1;
				return 0;
			},

	url: "/goals",

  filterStatus: function(finished_boolean) {
    filtered = this.filter(function(goal) {
      return goal.get("finished") === finished_boolean;
    });
    return new ST.Collections.GoalCollection(filtered);
  }
});
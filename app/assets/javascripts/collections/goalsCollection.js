ST.Collections.GoalCollection = Backbone.Collection.extend({
	model: ST.Models.GoalModel,

	comparator: function(goal0, goal1) {
		return (goal1.get("created_at") > goal0.get("created_at")) ? 1 : -1
	},

	url: "/goals",

  filterStatus: function(status) {
    var filtered;
    if (status == 'all') {
      filtered = this.filter(function(goal){
        return true;
      }
    )} else if (status == 'archived') {
      filtered = this.filter(function(goal){
        return goal.get("archived") === true;
      })
    } else {
      filtered = this.filter(function(goal) {
        return ((goal.get("finished") === status)
          && (goal.get("archived") != true));
      });
    };
    return new ST.Collections.GoalCollection(filtered);
  }
});
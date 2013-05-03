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
        return goal.get("archived") != true;
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
  },

  filterNameSearch: function(string) {
    var regExp = new RegExp(string.toLowerCase(),"g");
    var that = this;
    var filtered = this.filter(function(goal) {
      if (string=="none") {
        return true;
      } else {
        return (regExp.test(goal.get('name').toLowerCase()));
      };
    })
    return new ST.Collections.GoalCollection(filtered);
  },

  filterTagSearch: function(string) {
    var returnCollection = new ST.Collections.GoalCollection();
    var regExp = new RegExp(string.toLowerCase(),"g");
    var filteredTags = ST.Store.indexTags.filter(function(tag){
      return regExp.test(tag.escape('title').toLowerCase());
    })
    _.each(filteredTags, (function(tag) {
      returnCollection.add(
        tag.get('goal')
      );
    }));
    return returnCollection;
  },

  filterDescriptionSearch: function(string) {
    var regExp = new RegExp(string.toLowerCase(),"g");
    var that = this;
    var filtered = this.filter(function(goal) {
      if (string=="none") {
        return true;
      } else {
        return (regExp.test(goal.get('description').toLowerCase()));
      };
    })
    return new ST.Collections.GoalCollection(filtered);
  },

  filterSearch: function(string) {
    var returnCollection = new ST.Collections.GoalCollection();
    (this.filterNameSearch(string)).each(function(goal){
      returnCollection.add(goal);
    });
    (this.filterTagSearch(string)).each(function(goal){
      returnCollection.add(goal);
    });
    (this.filterDescriptionSearch(string)).each(function(goal){
      returnCollection.add(goal);
    });
    return returnCollection;
  }
});
ST.Collections.GoalTagCollection = Backbone.Collection.extend({
  model: ST.Models.GoalTagModel,

  url: '/goal_tags',
})
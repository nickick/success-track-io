ST.Models.GoalModel = Backbone.RelationalModel.extend({
	urlRoot: "/goals/",

  relations: [{
    type: 'HasMany',
    key: 'tags',
    relatedModel: 'ST.Models.TagModel',
    keySource: 'tags_attributes',
    collectionOptions: function(goal) {
      return { goal: goal };
    },
    reverseRelation: {
      key: 'goal',
      keySource: 'goal_id',
      includeInJSON: true,
    },
  }],

  tags: function() {
    var returnCollection = new ST.Collections.TagCollection();
    var that = this;
    ST.Store.indexTags.each(function(tag){
      if (tag.get('goal') == that){
        returnCollection.add(tag);
      };
    });
    return returnCollection;
  }
});
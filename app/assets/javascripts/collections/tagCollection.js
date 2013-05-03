ST.Collections.TagCollection = Backbone.Collection.extend({
  model: ST.Models.TagModel,

  url: '/tags',

  filterTag: function(title) {
    var filtered = this.filter(function(tag) {
        return (tag.get("title") === title)
      });
    return new ST.Collections.TagCollection(filtered);
  },
})
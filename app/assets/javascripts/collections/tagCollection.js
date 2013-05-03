ST.Collections.TagCollection = Backbone.Collection.extend({
  model: ST.Models.TagModel,

  url: '/tags',

  filterByTitle: function(string) {
    var regExp = new RegExp(string.toLowerCase(),"g");
    var filtered = this.filter(function(tag) {
      return regExp.test(tag.escape('title').toLowerCase());
    });
    return new ST.Collections.TagCollection(filtered);
  },
})
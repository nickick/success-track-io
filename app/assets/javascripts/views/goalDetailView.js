ST.Views.GoalDetailView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model, "request", this.render);
    this.listenTo(ST.Store.indexTags, "remove", this.render);
    this.listenTo(ST.Store.indexTags, "add", this.render);
    this.editBooleans = {
      timeFrameEdit: false,
      finishDateEdit: false,
      statusEdit: false,
      nameEdit: false,
      descriptionEdit:false,
      tagEdit: false,
    }
	},

	events: {
		"click .finished"                         : "switchFinish",
    "click #delete-button"                    : "deleteGoal",
    "click #archive-button"                   : "archiveGoal",
	  "dblclick .goal-time-frame-clickable"     : "chooseTimeFrame",
    "dblclick .name-container"                : "editName",
    "dblclick .goal-description-clickable"    : "descriptionEdit",
    "dblclick .goal-finish-date-clickable"    : "finishDateEdit",
    "dblclick .edit-radio-label"              : "updateGoal",
    "keypress"                                : "filterOnEnter",
    "mouseover .goal-status-clickable"        : "installClickStatusHandler",
    "dblclick .goal-tag"                      : "editTag",
    "dblclick .edit-tag"                      : "deleteTag",
    "dblclick .goal-tag-label"                : "addNewTagInput",
    "keypress .tag-input"                     : "saveNewTag",
    "blur .tag-input"                         : "render"
	},

	render: function() {
		var renderedContent = JST["goals/detail"]({
			goal: this.model,
			finished: this.model.escape("finished"),
      timeFrames: ST.Store.timeFrames,
      currentPath: this.currentPath(),
		})

		this.$el.html(renderedContent);
    this.insertTags();

		return this;
	},

  insertTags: function() {
    var tags = this.filterTagsforGoal();
    var topOffset = 70;
    var rightOffset = parseInt($('.name-container').width()) + 20;
    var that = this;
  	setTimeout(function(){
      if (tags.length > 0) {
        $('#goal-'+that.model.get('id')+'-tags').append(
          "<div class='goal-tag-label'> <span>Tagged as</span> </div>"
        );
      } else {
        $('#goal-'+that.model.get('id')+'-tags').append(
          "<div class='goal-tag-label'> <span>Add tags!</span> </div>"
        );
      };
      tags.each(function(tag) {
        var styleString = 'top: '+topOffset+'px;';
        var title = tag.escape('title');
        var tagDiv = "<div class='goal-tag' id= '"+ tag.get('id') +
        "'style='"+styleString+
        "'><span>"+title+"</span></div>";
        $('#goal-'+that.model.get('id')+'-tags').append(tagDiv);
        topOffset += 40;
      });
    }, 200);
  },

  filterTagsforGoal: function() {
    return this.model.tags();
  },

  installClickStatusHandler: function() {
    var that = this;
    $('#finish-click-'+that.model.get('id')).dblclick(function(){
      $('#finish-click-'+that.model.get('id')).removeAttr('id')
      $('#finish-switch-'+that.model.get('id')).click();
    });
  },

  currentPath: function() {
    var url = window.location.href;
    var pathString = url.split('/')[3];
    return pathString;
  },

  checkIfURL: function(url) {
    if (this.currentPath() == url) {
      return true;
    };
    return false;
  },

  // ARCHIVE & DELETE METHODS //

  new_bool: function(current_bool) {
		if (current_bool == "true") {
			return false;
		} else {
			return true;
		}
	},

  viewFade: function(){
    this.$el.slideUp();
  },

  deleteGoal: function() {
    this.viewFade();
    ST.Store.indexGoals.remove(this.model);
    this.model.destroy();
  },

  archiveGoal: function() {
		var that = this;
    that.viewFade();
		var current_archive = that.model.escape("archived")
		that.model.set({
			archived: that.new_bool(current_archive)
		});
		that.model.save();
  },

  // UPDATE METHODS //

  switchFinish: function() {
		var that = this;
    if ((!that.checkIfURL('#')) && (!that.checkIfURL('#archived'))) {
      that.viewFade();
    };
		var current_finish = that.model.escape("finished")
		that.model.set({
			finished: that.new_bool(current_finish)
		});
		that.model.save();
  },

	chooseTimeFrame: function() {
    if (!this.editBooleans['timeFrameEdit']){
      this.editBooleans['timeFrameEdit'] = true;
  		var renderedContent = JST["goals/editTimeFrame"]({
  			goal: this.model,
  			finished: this.model.escape("finished"),
        timeFrames: ST.Store.timeFrames,
        todayString: this.model.escape("finish_date").slice(0,10)
  		});

      var goalIdString = '#goal_'+this.model.escape("id")+'_detail';
      var timeFrameEditString = '.time-frame-edit-'+this.model.escape("id");
      $(goalIdString).prepend(renderedContent);
      $(timeFrameEditString).slideDown();
    }

		return this;
	},

  descriptionEdit: function() {
    if (!this.editBooleans['descriptionEdit']){
      this.editBooleans['descriptionEdit'] = true;
      var goalString = '.goal-'+this.model.escape('id')+'-description';
      var inputString = "<input type='text' class='detail-input' id='goal_description_edit'>";
      $(goalString).html(inputString);
      $('#goal_description_edit').val(this.model.escape("description")).focus();
    };
  },

  finishDateEdit: function() {
    if (!this.editBooleans['finishDateEdit']){
      this.editBooleans['finishDateEdit'] = true;
      var goalString = '.goal-'+this.model.escape('id')+'-finish-date';
      var inputString = "<input type='text' class='detail-input' id='goal_finish_date_edit'>";
      $(goalString).html(inputString);
      $('#goal_finish_date_edit').val(this.model.escape("finish_date").slice(0,10)).focus();
    };
  },

  editName: function() {
    if (!this.editBooleans['nameEdit']){
      this.editBooleans['nameEdit'] = true;
      var goalStringId = '#goal-'+this.model.escape('id')+'-name';
      var inputString = "<input type='text' id='goal_name_edit'>";
      $(goalStringId).html(inputString);
      $('#goal_name_edit').val(this.model.get("name")).focus();
    };
  },

  findCheckedFrameId: function($timeFrames) {
    var finValue = null;
    _.each($timeFrames, function(timeFrame){
      if(timeFrame.checked == true) {
        finValue = timeFrame.value;
      };
    });
    return finValue;
  },

  finishDate: function() {
    if ($('#goal_finish_date_edit').val()) {
      return new Date($('#goal_finish_date_edit').val());
    } else {
      return this.model.escape('finish_date');
    };
  },

  timeFrameSlideUp: function() {
    var timeFrameEditString = '.time-frame-edit-'+this.model.escape("id");
    $(timeFrameEditString).slideUp(100).addClass('hidden');
  },

  editTag: function(e) {
    if (!this.editBooleans['tagEdit']){
      this.editBooleans['tagEdit'] = true;
      $($(e.target).closest('div')).addClass('edit-tag');
    };
  },

  deleteTag: function(e) {
    var tag = $($(e.target).closest('div'));
    var tag_id = parseInt($(tag).attr('id'));
    console.log(tag_id);
    var tag_model = ST.Store.indexTags.findWhere({id: tag_id});
    ST.Store.indexTags.remove(tag_model);
    tag_model.destroy();
    tag.empty();
    this.editBooleans['tagEdit'] = true;
  },

  addNewTagInput: function(e) {
    var inputString = "<input type='text' class='tag-input'>";
    $(e.target).closest('span').empty();
    $(e.target).closest('span').html(inputString);
    $('.tag-input').focus();
  },

  savingTag: false,

  saveNewTag: function(e) {
    if (e.keyCode == 13) {
      if (!this.savingTag) {
        this.savingTag = true;
        var newTag = new ST.Models.TagModel({title: $(e.target).val()});
        var tagCollection = this.model.get('tags') || new ST.Collections.TagCollection();
        tagCollection.add(newTag);
        this.model.set({
          tags: tagCollection
        });
        var that = this
        that.model.save({},{
          success: function(model) {
            newTag.set({
              //id: model.get('id')
            })
            ST.Store.indexTags.add(newTag)
            that.savingTag = false
          }
        });
      };
    };
  },

  updateGoal: function() {
    var that = this;
    var $timeFrames = $("[name='time_frame_"+that.model.get('id')+"']");
    var timeFrameChecked = that.findCheckedFrameId($timeFrames);
    that.timeFrameSlideUp();
    setTimeout(function() {
      that.model.set({
        name: $('#goal_name_edit').val() || that.model.get('name'),
        description: $('#goal_description_edit').val() || that.model.get('description'),
        finish_date: that.finishDate(),
        time_frame_id: timeFrameChecked || that.model.get('time_frame_id')
      });
      that.model.save({},{
        errors: function() {
          $('.goal'+that.model.escape("id")+'errors').html('<div class="errors">'+xhr.responseText+'</div><br>');
          $('.error-container').slideDown();
        }
      });
      that.editBooleans = {
        timeFrameEdit: false,
        finishDateEdit: false,
        statusEdit: false,
        nameEdit: false,
        descriptionEdit:false,
        tagEdit: false
      };
    }, 100);
  },

	filterOnEnter: function(e) {
		if (e.keyCode == 13) { this.updateGoal() };
	},
});
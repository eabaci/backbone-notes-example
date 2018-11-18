var Backbone = require('backbone');
var $ = require('jquery');
var app = require('../namespace');

var NotesItemView = require('./notes-item');
var NotesFilterView = require('./notes-filter');
var NotesAddView = require('./notes-add');

var NotesList = Backbone.View.extend({
  el: '#notes',

  initialize: function(ops) {
    this.collection = ops.collection || app.collection;
    this.router = ops.router || app.router;
    this.render();
    this.collection.on('add', this.addNotes, this);
    this.notesFilter.on('change', this.updateNotesList, this);
    this.router.on('updateNoteView', this.updateNoteView, this);
    this.router.on('updateHomeView', this.updateHomeView, this);
  },

  updateHomeView: function() {
    this.$el.show();
  },

  updateNoteView: function(data) {
    this.$el.hide();
  },

  addNotes: function(notesItem) {
    var notesItemView = new NotesItemView({
      model: notesItem,
      router: this.router
    });
    this.$el.append(notesItemView.$el);
  },

  render: function() {
    this.notesFilter = new NotesFilterView({ collection: this.collection });
    this.$el.html(this.notesFilter.$el);

    var notesAdd = new NotesAddView({ collection: this.collection });
    this.$el.append(notesAdd.$el);

    var models = this.collection.models;
    models.forEach(model => {
      var notesItem = NotesItemView({
        model: model,
        router: this.router
      });
      this.$el.append(notesItem.$el);
    });
    return this;
  },
  updateNotesList: function() {
    this.$el.find('.notes-item').remove();
    var models = this.notesFilter.notesFilterList;
    models.forEach(model => {
      var notesItem = new NotesItemView({
        model: model,
        router: this.router
      });
      this.$el.append(notesItem.$el);
    });
  }
});

module.exports = NotesList;

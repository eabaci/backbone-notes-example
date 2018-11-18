var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var app = require('../namespace');

var NotesNavView = require('./note-nav');
var NoteView = require('./note-view');
var NoteEdit = require('./note-edit');

var Note = Backbone.View.extend({
  el: '#note',
  initialize: function(ops) {
    this.id = ops.id || 0;
    this.model = ops.model || {};
    this.action = ops.action || 'view';
    this.router = ops.router || app.router;
    this.collection = ops.collection || app.collection;

    this.listenTo(this.collection, 'add', this.render);
    this.router.on('updateNoteView', this.updateNoteView, this);
    this.router.on('updateHomeView', this.updateHomeView, this);
  },

  updateHomeView: function() {
    this.$el.hide();
  },

  updateNoteView: function(data) {
    this.id = data.id;
    this.render();
    this.update(data.action);
    this.$el.show();
  },

  render: function() {
    this.model = this.collection.get(this.id);
    this.notesNavView = new NotesNavView({ model: this.model });
    this.$el.html(this.notesNavView.$el);
    this.noteView = new NoteView({ model: this.model });
    this.noteEditView = new NoteEdit({ model: this.model });
    this.$el.append(this.noteView.$el);
    this.$el.append(this.noteEditView.$el);
    return this;
  },

  update: function(action) {
    if (action === 'view') {
      this.noteView.$el.show();
      this.noteEditView.$el.hide();
    } else {
      this.noteEditView.$el.show();
      this.noteView.$el.hide();
    }
  }
});

module.exports = Note;

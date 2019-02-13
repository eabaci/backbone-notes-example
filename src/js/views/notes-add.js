var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var app = require('../namespace');
var notesAddViewTemplate = require('../templates/notes-add-view-template.html');

var NotesAddView = Backbone.View.extend({
  className: 'notes-add',
  tagName: 'div',
  events: {
    'click .addNote': 'addNewNote'
  },

  counter: 0,

  template: _.template(notesAddViewTemplate),

  initialize: function(ops) {
    this.collection = ops.collection || app.collection;
    this.render();
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  addNewNote: function(event) {
    event.preventDefault();
    var title = this.$el.find('.noteTitle')[0].value;
    this.collection.add({
      title: title,
      id: this.counter++
    });
  }
});

module.exports = NotesAddView;

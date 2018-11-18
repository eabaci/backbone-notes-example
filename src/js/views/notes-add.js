var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var app = require('../namespace');

var NotesAddView = Backbone.View.extend({
  className: 'notes-add',
  tagName: 'div',
  events: {
    'click .addNote': 'addNewNote'
  },

  counter: 0,

  template: _.template(
    '<div class="container"><div class="row"><input class="form-control noteTitle" value="placeholder"/><a href="#" class="btn btn-primary addNote">Add Note</a></div></div>'
  ),

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

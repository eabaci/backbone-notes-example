var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var app = require('../namespace');
var notesItemViewTemplate = require('../templates/notes-item-view-template.html');

var NotesItemView = Backbone.View.extend({
  className: 'notes-item',
  tagName: 'div',
  events: {
    'click  .view': 'viewNote',
    'click  .edit': 'editNote',
    'click  .delete': 'delteNote'
  },

  template: _.template(notesItemViewTemplate),

  initialize: function(ops) {
    this.router = ops.router || app.router;
    this.render();
    this.model.on('change', this.render, this);
    this.model.on('remove', this.removeItem, this);
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

  viewNote: function(event) {
    event.preventDefault();

    var loc = ['note', this.model.id, 'view'].join('/');
    this.router.navigate(loc, { trigger: true });
  },

  editNote: function(event) {
    event.preventDefault();

    var loc = ['note', this.model.id, 'edit'].join('/');
    this.router.navigate(loc, { trigger: true });
  },

  delteNote: function(event) {
    event.preventDefault();
    // Destroying model triggers view cleanup.
    this.model.destroy();
  },

  removeItem: function() {
    this.$el.remove();
  }
});

module.exports = NotesItemView;

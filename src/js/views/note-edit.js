var Backbone = require('backbone');
var _ = require('underscore');
var noteEditViewTemplate = require('../templates/note-edit-view-template.html');

var NoteEdit = Backbone.View.extend({
  className: 'note-edit',
  tagName: 'div',
  events: {
    'change input': 'saveInput',
    'change textarea': 'saveInput'
  },

  template: _.template(noteEditViewTemplate),

  initialize: function(ops) {
    this.model = ops.model || {};
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    if (this.model.attributes) this.render();
  },

  render: function() {
    this.$el.html(
      this.template({
        title: this.model.get('title'),
        author: this.model.get('author'),
        description: this.model.get('description')
      })
    );
    return this;
  },

  saveInput: function(event) {
    var value = event.target.value;
    var name = event.target.name;
    this.model.set(name, value);
  }
});

module.exports = NoteEdit;

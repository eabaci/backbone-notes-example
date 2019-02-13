var Backbone = require('backbone');
var _ = require('underscore');
var noteViewTemplate = require('../templates/note-view-template.html');

var NoteView = Backbone.View.extend({
  className: 'note-view',
  tagName: 'div',

  template: _.template(noteViewTemplate),

  initialize: function(ops) {
    this.model = ops.model || {};
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    if (this.model.attributes) this.render();
  },

  render: function() {
    this.$el.html(
      this.template({
        title: this.model.get('title') || '',
        author: this.model.get('author') || '',
        description: this.model.get('description') || ''
      })
    );
    return this;
  }
});

module.exports = NoteView;

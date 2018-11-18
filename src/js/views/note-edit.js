var Backbone = require('backbone');
var _ = require('underscore');

NoteEdit = Backbone.View.extend({
  className: 'note-edit',
  tagName: 'div',
  events: {
    'change input': 'saveTitle',
    'change textarea': 'saveDescription'
  },

  template: _.template(
    '<div class="container"><div class="row"><div class="col"><input class="form-control" value="<%- title %>" /></div></div><div class="row"><div class="col"><textarea class="form-control"><%- description %></textarea></div></div></div>'
  ),

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

  saveTitle: function(event) {
    var title = event.target.value;
    this.model.set({ title: title });
  },

  saveDescription: function(event) {
    var description = event.target.value;
    this.model.set({ description: description });
  }
});

module.exports = NoteEdit;

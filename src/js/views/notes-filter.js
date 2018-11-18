var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var app = require('../namespace');

var NotesFilterView = Backbone.View.extend({
  className: 'notes-filter',
  tagName: 'div',
  notesFilterList: [],
  events: {
    'change  .filter': 'updateFilter',
    'keyup  .filter': 'updateFilter'
  },

  template: _.template(
    '<div class="container"><div class="row"><div class="col"><h3> Notes </h3></div><div class="col"><input class="filter"/></div></div></div>'
  ),

  initialize: function(ops) {
    this.collection = ops.collection || app.collection;
    this.render();
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  updateFilter: function(event) {
    var value = event.target.value;
    var regExp = new RegExp(value, 'gi');

    this.notesFilterList = this.collection.models.filter(function(model) {
      return model.attributes.title.match(regExp);
    });
    this.trigger('change', { notesFilterList: this.notesFilterList });
  }
});

module.exports = NotesFilterView;

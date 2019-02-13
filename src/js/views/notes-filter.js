var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var app = require('../namespace');
var notesFilterViewTemplate = require('../templates/notes-filter-view-template.html');

var NotesFilterView = Backbone.View.extend({
  className: 'notes-filter',
  tagName: 'div',
  notesFilterList: [],
  events: {
    'change  .filter': 'updateFilter',
    'keyup  .filter': 'updateFilter'
  },

  template: _.template(notesFilterViewTemplate),

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
      let title = model.attributes.title;
      let author = model.attributes.author;
      return title.match(regExp) || author.match(regExp);
    });
    this.trigger('change', { notesFilterList: this.notesFilterList });
  }
});

module.exports = NotesFilterView;

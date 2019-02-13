var Backbone = require('backbone');
var _ = require('underscore');
var app = require('../namespace');

var NotesNavView = Backbone.View.extend({
  className: 'note-nav',
  tagName: 'div',
  events: {
    'click  .back': 'backToHome',
    'click  .view': 'viewNote',
    'click  .edit': 'editNote',
    'click  .delete': 'deleteNote'
  },

  template: _.template(
    '<div class="container"><div class="row"><div class="col back"><h3> Notes </h3></div><div class="col"><ul class="nav nav-tabs"><li class="nav-item view"><a class="nav-link active" href="#">View</a></li><li class="nav-item edit"><a class="nav-link" href="#">Edit</a></li><li class="nav-item delete"><a class="nav-link" href="#">Delete</a></li></ul></div></div></div>'
  ),

  initialize: function(ops) {
    this.router = ops.router || app.router;
    this.model = ops.model || {};
    this.render();
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  update: function(action) {
    this.$el.find('.nav-item a').removeClass('active');
    this.$el.find('.' + action + ' a').addClass('active');
  },

  backToHome: function(event) {
    event.preventDefault();
    var loc = [''].join('/');
    this.router.navigate(loc, { trigger: true });
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

  deleteNote: function(event) {
    event.preventDefault();
    this.model.destroy();
    var loc = [''].join('/');
    this.router.navigate(loc, { trigger: true });
  }
});

module.exports = NotesNavView;

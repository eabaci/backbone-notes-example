var Backbone = require('backbone');
var app = require('../namespace');

var Router = Backbone.Router.extend({
  routes: {
    'note/:id/:action': 'updateNoteView',
    '': 'home'
  },

  initialize: function() {},

  home: function() {
    this.trigger('updateHomeView');
  },

  updateNoteView: function(id, action) {
    this.trigger('updateNoteView', { id: id, action: action });
  }
});

module.exports = Router;

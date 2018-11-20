var Backbone = require('backbone');

var NoteModels = Backbone.Model.extend({
  defaults: function() {
    return {
      title: '',
      description: '',
      author: '',
      id: 0
    };
  },
  url: 'http://unit-test.app/'
});

module.exports = NoteModels;

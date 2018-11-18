var Backbone = require('backbone');

var NoteModels = Backbone.Model.extend({
  defaults: function() {
    return {
      title: 'Backbone Test',
      description: 'Das ist eine Backbone Test Description',
      author: 'Ersin Abaci',
      id: 0
    };
  }
});

module.exports = NoteModels;

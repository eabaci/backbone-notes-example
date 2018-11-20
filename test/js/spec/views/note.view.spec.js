var $ = require('jquery');
var NoteModels = require('../../../../src/js/models/note');
var NoteView = require('../../../../src/js/views/note-view');

describe('app views note view', function() {
  before(function() {
    this.$fixture = $("<div id='note-view-fixture'></div>");
  });

  beforeEach(function() {
    this.$fixture.empty().appendTo($('#fixtures'));
    this.view = new NoteView({
      el: this.$fixture,
      model: new NoteModels()
    });
  });

  afterEach(function() {
    this.view.model.destroy();
  });

  after(function() {
    $('#fixtures').empty();
  });

  it('can render an empty note', function() {
    var $title = this.$fixture.find('.title');
    var $author = this.$fixture.find('.author');
    var $description = this.$fixture.find('.description');

    expect($title.text()).to.equal('');
    expect($author.text()).to.equal('');
    expect($description.text()).to.equal('');
  });

  it('can render more complicated markdown', function() {
    this.view = new NoteView({
      el: this.$fixture,
      model: new NoteModels({
        title: 'Unit Testing',
        description: 'How to learn Unit Test',
        author: 'Narisa',
        id: 22
      })
    });

    var $title = this.$fixture.find('.title');
    var $author = this.$fixture.find('.author');
    var $description = this.$fixture.find('.description');

    expect($title.text()).to.equal('Unit Testing');
    expect($author.text()).to.equal('Narisa');
    expect($description.text()).to.equal('How to learn Unit Test');
  });

  it('calls the render function after the model changed', function(done) {
    var $title = this.$fixture.find('.title');
    var $author = this.$fixture.find('.author');
    var $description = this.$fixture.find('.description');

    expect($title.text()).to.equal('');
    expect($author.text()).to.equal('');
    expect($description.text()).to.equal('');

    var self = this;
    this.view.model.on('change', function() {
      var $titleChanged = self.$fixture.find('.title');
      var $authorChanged = self.$fixture.find('.author');
      var $descriptionChanged = self.$fixture.find('.description');

      expect($titleChanged.text()).to.equal('How to write clean code');
      expect($authorChanged.text()).to.equal('Ersin Abaci');
      expect($descriptionChanged.text()).to.equal(
        'Quick description to clean code'
      );

      done();
    });

    this.view.model.set({
      title: 'How to write clean code',
      description: 'Quick description to clean code',
      author: 'Ersin Abaci'
    });
  });

  it('calls the remove function after the model has destroyed', function(done) {
    this.view = new NoteView({
      el: this.$fixture,
      model: new NoteModels({
        title: 'Unit Testing',
        description: 'How to learn Unit Test',
        author: 'Narisa',
        id: 0
      })
    });

    var $title = this.$fixture.find('.title');
    var $author = this.$fixture.find('.author');
    var $description = this.$fixture.find('.description');

    expect(this.view).to.be.ok;
    expect($title.text()).to.equal('Unit Testing');
    expect($author.text()).to.equal('Narisa');
    expect($description.text()).to.equal('How to learn Unit Test');

    this.view.model.once('destroy', function() {
      expect(this.view).to.be.undefined;

      done();
    });

    this.view.model.destroy();
  });
});

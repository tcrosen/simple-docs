var expect = require('chai').expect;
var simpleDocs = require('../index');
var path = require('path');
var utils = require('./utils');

var outDir = __dirname + '/out';
var fixtures = __dirname + '/fixtures';

/* jshint -W030 */

describe('Simple Docs - all comment features', function() {

  var fixture = path.join(fixtures, 'all.js');

  beforeEach(function(done) {
    utils.cleanDir(outDir, function(err) {
      utils.mkdir(outDir, function(err) {
        done();
      });
    });
  });

  afterEach(function(done) {
    done();
  });

  it('should have a description and tags', function(done) {
    simpleDocs.parseFile(fixture, outDir, function(err, docs) {
      expect(docs[0].tags.length).to.equal(4);
      expect(docs[0].description).to.equal('This function uses all available comment features');
      done();
    });
  });

  it('should parse a full tag with name, type and description', function(done) {
    simpleDocs.parseFile(fixture, outDir, function(err, docs) {
      expect(docs[0].tags[0].name).to.equal('all');
      expect(docs[0].tags[0].type).to.equal('string');
      expect(docs[0].tags[0].description).to.equal('Function name');
      done();
    });
  });
});

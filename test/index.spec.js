var expect = require('chai').expect;
var simpleDocs = require('../index');
var path = require('path');
var fs = require('fs');

var outDir = __dirname + '/out';
var fixtures = __dirname + '/fixtures';

/* jshint -W030 */

describe('Simple Docs', function() {

  beforeEach(function(done) {
    // clean output dir
    fs.rmdir(outDir, function(err) {
      fs.mkdir(outDir, function(err) {
        done();
      });
    });
  });

  afterEach(function(done) {
    fs.rmdir(outDir, function(err) {
      done();
    });
  });

  it('should parse a file', function(done) {
    simpleDocs.parseFile(fixtures + '/basic.js', outDir, function(err, docs) {
      expect(err).to.be.null;
      expect(docs.length).to.equal(1);
      done();
    });
  });

  it('should output JSON', function(done) {
    simpleDocs.parseFile(fixtures + '/basic.js', outDir, function(err) {
      fs.readFile(path.join(outDir, 'docs.json'), function(err, contents) {
        expect(contents).not.to.be.null;
        done();
      });
    });
  });

  describe('basic', function() {
    it('should only have a description', function(done) {
      simpleDocs.parseFile(fixtures + '/basic.js', outDir, function(err, docs) {
        expect(docs[0].tags.length).to.equal(0);
        expect(docs[0].description).to.equal('This should only generate a description');
        done();
      });
    });
  });

  describe('all', function() {
    it('should have a description and tags', function(done) {
      simpleDocs.parseFile(fixtures + '/all.js', outDir, function(err, docs) {
        console.log(docs);
        expect(docs[0].tags.length).to.equal(3);
        expect(docs[0].description).to.equal('This function uses all available comment features');
        done();
      });
    });
  });
});

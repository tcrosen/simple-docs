var expect = require('chai').expect;
var simpleDocs = require('../index');
var path = require('path');
var utils = require('./utils');
var fs = require('fs-extra');

var outDir = __dirname + '/out';
var fixtures = __dirname + '/fixtures';

/* jshint -W030 */

describe('Simple Docs', function() {
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

  it('should parse a single file', function(done) {
    simpleDocs.generate('./test/fixtures/basic.js', { outputDir: outDir }, function(err, docs) {
      expect(docs.length).to.equal(1);
      done();
    });
  });

  it('should parse multiple files', function(done) {
    simpleDocs.generate('./test/fixtures/*.js', { outputDir: outDir }, function(err, docs) {
      expect(docs.length).to.equal(2);
      done();
    });
  });

  it('should parse multiple files in nested directories', function(done) {
    simpleDocs.generate('./test/fixtures/**/*.js', { outputDir: outDir }, function(err, docs) {
      expect(docs.length).to.equal(4);
      done();
    });
  });

  it('should save single file results to the given output directory', function(done) {
    simpleDocs.generate('./test/fixtures/basic.js', { outputDir: outDir }, function(err, docs) {
      fs.stat(path.join(outDir, 'all.json'), function(err, stats) {
        expect(stats.isFile()).to.be.true;
        done();
      });
    });
  });

  it('should save multiple file results to the given output directory', function(done) {
    simpleDocs.generate('./test/fixtures/**/*.js', { outputDir: outDir }, function(err, docs) {
      fs.stat(path.join(outDir, 'all.json'), function(err, stats) {
        expect(stats.isFile()).to.be.true;
        done();
      });
    });
  });

  describe('basic comments', function() {
    var fixture = path.join(fixtures, 'basic.js');

    it('should only have a description', function(done) {
      simpleDocs.generate(fixture, { outputDir: outDir }, function(err, docs) {
        expect(docs[0][0].tags.length).to.equal(0);
        expect(docs[0][0].description).to.equal('This should only generate a description');
        done();
      });
    });
  });

  describe('full featured comments', function() {
    var fixture = path.join(fixtures, 'all.js');

    it('should contain a description with tags', function(done) {
      simpleDocs.generate(fixture, { outputDir: outDir }, function(err, docs) {
        expect(docs[0][0].tags.length).to.equal(4);
        expect(docs[0][0].description).to.equal('This function uses all available comment features');
        done();
      });
    });

    it('should contain a tag with name, type and description', function(done) {
      simpleDocs.generate(fixture, { outputDir: outDir }, function(err, docs) {
        expect(docs[0][0].tags[0].name).to.equal('all');
        expect(docs[0][0].tags[0].type).to.equal('string');
        expect(docs[0][0].tags[0].description).to.equal('Function name');
        done();
      });
    });
  });
});

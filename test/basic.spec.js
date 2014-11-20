var expect = require('chai').expect;
var simpleDocs = require('../index');
var path = require('path');
var utils = require('./utils');
var fs = require('fs-extra');

var outDir = __dirname + '/out';
var fixtures = __dirname + '/fixtures';

/* jshint -W030 */

describe('Simple Docs - Basic comments', function() {
  var fixture = path.join(fixtures, 'basic.js');

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

  it('should only have a description', function(done) {
    simpleDocs.generate(fixture, { outputDir: outDir }, function(err, docs) {
      expect(docs[0][0].tags.length).to.equal(0);
      expect(docs[0][0].description).to.equal('This should only generate a description');
      done();
    });
  });
});

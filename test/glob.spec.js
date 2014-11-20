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
  var out = path.join(outDir, 'docs.json');

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

  it('should parse a directory', function(done) {
    simpleDocs.parseDir(fixtures, outDir, function(err, docs) {
      console.log(docs);
      expect(docs.length).to.equal(4);
      done();
    });
  });
});

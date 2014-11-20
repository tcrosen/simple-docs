var expect = require('chai').expect;
var simpleDocs = require('../index');
var path = require('path');

var outDir = __dirname + '/out';
var fixtures = __dirname + '/fixtures';

/* jshint -W030 */

describe('Simple Docs', function() {

  beforeEach(function(done) {
    // clean output dir

  });

  it('should parse a file', function(done) {
    simpleDocs.parseFile(fixtures + '/basic.js', outDir, function(err) {
      expect(err).to.be.null;
      done();
    });
  });

  it('should output JSON', function(done) {
    simpleDocs.parseFile(fixtures + '/basic.js', outDir, function(err) {
      fs.readFile(path.join(outDir, 'docs.json'), function(err, contents) {
        expect('')
        done();
      });
    });
  });
});

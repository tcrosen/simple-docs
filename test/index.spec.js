var expect = require('chai').expect;
var simpleDocs = require('../index');
var outDir = __dirname + '/out';
var fixtures = __dirname + '/fixtures';

/* jshint -W030 */

describe('Simple Docs', function() {

  it('should parse a file', function(done) {
    simpleDocs.parseFile(fixtures + '/basic.js', outDir, function(err) {
      expect(err).to.be.null;
      done();
    });
  });

});

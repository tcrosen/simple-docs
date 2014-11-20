'use strict';

var parse = require('comment-parser');
var fs = require('fs-extra');
var path = require('path');

function parseFile(file, out, done) {
  var outputFile = path.join(out, 'docs.json');

  parse.file(file, function(err, parsed) {
    if (err) {
      done(err);
    }

    fs.outputJson(outputFile, parsed, function(err) {
      if (err) {
        done(err);
      }

      done(null, parsed);
    });
  });
}

module.exports = {
  parseFile: parseFile
};

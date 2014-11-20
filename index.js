'use strict';

var parse = require('comment-parser');
var fs = require('fs');
var path = require('path');

function parseFile(file, out, done) {
  parse.file(file, function(err, parsed) {
    if (err) {
      console.log(err);
    }

    fs.writeFile(path.join(out, 'docs.json'), JSON.stringify(parsed, null, 2), function(err) {
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

'use strict';

var async = require('async');
var parse = require('comment-parser');
var fs = require('fs-extra');
var path = require('path');
var glob = require('glob');

function writeJson(file, json, done) {
  fs.outputJson(file, json, function(err) {
    if (err) {
      done(err);
    }

    done(null, json);
  });
}

/**
* Generate docs from a single file
*/
function parseFile(file, out, done) {
  var outputFile = path.join(out, 'docs.json');

  parse.file(file, function(err, parsed) {
    if (err) {
      done(err);
    }

    writeJson(outputFile, parsed, function(err) {
      if (err) {
        done(err);
      }

      done(null, parsed);
    });
  });
}

/**
* Recursively generate docs for a directory
*/
function parseDir(dir, out, done) {
  var docs = [];

  glob(path.join(dir, '**/*.js'), function(err, files) {
    if (err) {
      done(err);
    }

    async.each(files, function(file, cb) {
      parse.file(file, function(err, contents) {
        if (err) {
          done(err);
        }

        docs.push(contents);
        cb();
      });
    }, function(err) {
      if (err) {
        done(err);
      }

      done(null, docs);
    });
  });
}

module.exports = {
  parseFile: parseFile,
  parseDir: parseDir
};

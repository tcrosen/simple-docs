'use strict';

var async = require('async');
var parse = require('comment-parser');
var fs = require('fs-extra');
var path = require('path');
var glob = require('glob');
var _ = require('lodash');


function _writeJson(file, json, done) {
  fs.outputJson(file, json, function(err) {
    if (err) {
      done(err);
    }

    done(null, json);
  });
}

/**
* Recursively generate docs for a directory
*/
function parseGlob(pattern, opts, done) {
  var docs = [];

  glob(pattern, opts, function(err, files) {
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

function generate(pattern, opts, done) {
  var options;

  if (typeof opts === 'function') {
    done = opts;
  } else {
    options = _.clone(opts);
  }

  var settings = _.merge({
    outputDir: './out',
    outputFile: 'docs.json'
  }, options);

  console.log('Generating simple docs with settings: ', settings);

  parseGlob(pattern, settings, function(err, docs) {
    _writeJson(path.join(settings.outputDir, settings.outputFile), docs, function(err) {
      if (err) {
        done(err);
      }

      done(null, docs);
    });
  });
}

module.exports = {
  generate: generate
};

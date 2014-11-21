'use strict';

var async = require('async');
var parse = require('comment-parser');
var fs = require('fs-extra');
var path = require('path');
var glob = require('globule');
var _ = require('lodash');

/**
* Write JSON docs to file
*
* @private
*/
function _writeJson(file, json, done) {
  fs.outputJson(file, json, function(err) {
    if (err) {
      done(err);
    }

    done(null, json);
  });
}

/**
* Parse a list of files
*
* @private
*/
function _parseFiles(files, done) {
  var docs = [];

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
}

/**
* Generates documentation from files.
*
* @prop {string} pattern A glob pattern.
* @prop {Object} opts Various settings for generating docs
* @prop {string} opts.outputDir Where to output generated docs (./docs/generated)
* @prop {Function} done Callback on completion with standard Node arguments:
*   done(err, docs)
*   err: Error or null if successful
*   docs: JSON array of parsed documentation
*
* @example
*
* // Parse a single file with default options
* generate('myFile.js');
*
* @example
*
* // Parse a directory and specify output location
* generate('src/*.js', { outputDir: './docs/generated' });
*/
function generate(patterns, opts, done) {
  var defaults = {
    outputDir: './docs/generated',
    outputFile: 'all.json'
  };

  var settings = _.merge(defaults, opts);

  // console.log('---------------------------------');
  // console.log('|    Simple Docs                |');
  // console.log('---------------------------------');
  // console.log('Patterns - ', patterns);
  // console.log('Options  - ', settings);

  var files = glob.find(patterns);

  // console.log('Files    - ', files);

  _parseFiles(files, function(err, docs) {
    _writeJson(path.join(settings.outputDir, settings.outputFile), docs, function(err) {
      if (err) {
        if (done) {
          done(err);
        } else {
          throw err;
        }
      }

      if (done) {
        done(null, docs);
      }
    });
  });
}

module.exports = {
  generate: generate
};

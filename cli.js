#!/usr/bin/env node

/**
* Module dependencies.
*/

var program = require('commander');
var meta = require('./package.json');
var simpleDocs = require('./index');

function err(msg) {
  console.error(msg);
  process.exit(1);
}

program
  .version(meta.version)
  .usage('[options] <pattern1, pattern2, ...> [\'*.js\']')
  .option('-o, --out [path]', 'Output directory [path]', './docs/generated')
  .parse(process.argv);

simpleDocs.generate(program.args, {
  outputDir: program.out
}, function(err, docs) {
  if (err) {
    err(err);
  }

  console.log('Documentation generated successfully!');
});

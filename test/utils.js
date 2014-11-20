var fs = require('fs-extra');

module.exports = {
  cleanDir: function(dir, done) {
    fs.remove(dir, function(err) {
      if (err) {
        console.log('test utils error cleaning dir: ', err);
        done(err);
      }

      done();
    });
  },

  mkdir: function(dir, done) {
    fs.mkdirs(dir, function(err) {
      if (err) {
        console.log('test utils error making dir: ', err);
        done(err);
      }

      done();
    });
  }
};

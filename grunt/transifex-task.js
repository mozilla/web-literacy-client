var download = require('webmaker-download-locales');

module.exports = function(grunt, appName, dir) {
  return function() {
    var done = this.async();

    download(appName, dir, function(err, data) {
      done();
    });
  };
};
